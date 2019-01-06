import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GpsLocationService } from '~/services/gpsLocation.service';
import { NearestHelpService } from '~/item/nearest-help/nearest-help.service';
import { FirebaseService } from '~/services/firebase.service';
import { PlaceList } from '~/item/nearest-help/model/place';
import { registerElement } from "nativescript-angular/element-registry";
import { Marker, MapView, Position, Polyline } from 'nativescript-google-maps-sdk';
import { PlaceDetails } from '~/item/nearest-help/model/placeDetails';
import { ActivatedRoute } from '@angular/router';
import { Item } from '~/item/item';
import { ItemService } from '~/item/item.service';
import { openUrl } from 'tns-core-modules/utils/utils';
import { RouterExtensions } from 'nativescript-angular/router';
import { Location } from "nativescript-geolocation";
import { Color } from 'tns-core-modules/color/color';
import { MapsService } from '~/services/maps.service';
import { DirectionDetails } from './model/directionDetails';
import * as poly from '@mapbox/polyline';

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
	selector: 'nearest-help',
	moduleId: module.id,
	templateUrl: './nearest-help.component.html',
	styleUrls: ['./nearest-help.component.css'],
	providers: [NearestHelpService]
})

export class NearestHelpComponent implements OnInit, AfterViewInit {

	latitude = 0;
	longitude = 0;
	zoom = 15;
	minZoom = 0;
	maxZoom = 22;
	bearing = 0;
	tilt = 0;
	padding = [40, 40, 40, 40];

	item: Item;
	subItem: Item;

	places: PlaceList[];
	placeDetails: PlaceDetails[] = [];
	public selectedIndex = 0;
	@ViewChild("mapView") mapView: ElementRef;
	@ViewChild("dd") dd: ElementRef;
	// itemSource = new ValueList<string>();
	entityType: string = "hospital";
	selectedPlace: PlaceDetails;
	phoneIcon: string = String.fromCharCode(0xf095) + '  Call';
	directIcon: string = String.fromCharCode(0xf5eb) + ' Directions';
	shareIcon: string = String.fromCharCode(0xf1e0) + ' Share';

	constructor(
		private firebaseService: FirebaseService,
		private gpsLocationService: GpsLocationService,
		private nearesthelpService: NearestHelpService,
		private mapsService: MapsService,
		private itemService: ItemService,
		private router: RouterExtensions,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		const id = +this.route.snapshot.params["id"];
		const subitemId = +this.route.snapshot.params["subitemid"];

		this.item = this.itemService.getItem(id);
		this.subItem = this.item.subitems.filter(item => item.id === subitemId)[0];

		switch (subitemId.toString()) {
			case "1":
				this.entityType = 'pharmacy';
				break;
			case "2":
				this.entityType = 'doctor';
				break;
			case "3":
				this.entityType = 'hospital';
				break;
			default:
				this.entityType = 'hospital';
				break;
		}



	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.firebaseService.showBanner();
		}, 3000);
	}

	//Map events
	onMapReady = (event) => {
		console.log("Map Ready");

		let map: MapView = this.mapView.nativeElement;

		this.gpsLocationService.getGpsLocation()
			.then((location) => {
				this.latitude = location[0];
				this.longitude = location[1];

				var marker = new Marker();
				marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
				marker.title = "You are here !!";
				map.addMarker(marker);

				this.nearesthelpService.getNearByPlaces(this.latitude, this.longitude, 5000, this.entityType)
					.subscribe((res) => {
						this.places = (<any>res).results;
						this.places.forEach((place) => {
							this.nearesthelpService.getNearByPlaceDetails(place.reference).subscribe((details: PlaceDetails) => {
								this.placeDetails.push(details);
								// this.itemSource.push({ value: details.result.id, display: details.result.name });

								var markerPlace = new Marker();
								markerPlace.position = Position.positionFromLatLng(details.result.geometry.location.lat, details.result.geometry.location.lng);
								markerPlace.title = details.result.name;
								markerPlace.color = "#00FF00";
								markerPlace.userData = details;
								markerPlace.infoWindowTemplate = "testWindow";
								map.addMarker(markerPlace);
							});
						});
					})
			},
				(reason) => {
					console.log(reason);
				}
			);
	};

	// public onchange(args: SelectedIndexChangedEventData) {
	// 	console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
	// 	this.selectedIndex = args.newIndex;

	// 	let place = this.placeDetails.filter(place => place.result.id === this.itemSource.getValue(args.newIndex))
	// 	this.latitude = +place[0].result.geometry.location.lat;
	// 	this.longitude = +place[0].result.geometry.location.lng;
	// }

	onMarkerSelect(args) {
		console.log(args.marker.userData);
		this.selectedPlace = <PlaceDetails>args.marker.userData;

		let map: MapView = this.mapView.nativeElement;
		map.removeAllShapes();

		const myLocation = new Location();
		myLocation.latitude = +this.latitude
		myLocation.longitude = +this.longitude;

		const placeLocation = new Location();
		placeLocation.latitude = +this.selectedPlace.result.geometry.location.lat;
		placeLocation.longitude = +this.selectedPlace.result.geometry.location.lng;

		let polyLine = new Polyline();
		polyLine.color = new Color("#0000FF");
		polyLine.width = 10;
		this.mapsService.getDirections(myLocation, placeLocation).subscribe((directionRes: DirectionDetails) => {
			if (directionRes.routes.length > 0) {
				let points: any[] = poly.decode(directionRes.routes[0].overview_polyline.points);
				points.forEach(point => {
					var position = new Position();
					position.latitude = point[0];
					position.longitude = point[1];
					polyLine.addPoint(position)
				})
				map.addPolyline(polyLine);
			}
		})
	}

	onOpenPhone(phone) {
		const number = phone.replace(/\D+/g, '');
		openUrl('tel://' + number);
	}

	goBack() {
		this.router.back();
	}

	getOpenStatus(placeDetails: PlaceDetails): string {
		if(placeDetails.result.opening_hours){
			if (placeDetails.result.opening_hours.open_now) {
				return "Open";
			}
		}		
		return "Closed"
	}

	onCoordinateTapped() {
		this.selectedPlace = null;
	}
}