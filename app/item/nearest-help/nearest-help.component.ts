import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GpsLocationService } from '~/services/gpsLocation.service';
import { NearestHelpService } from '~/item/nearest-help/nearest-help.service';
import { FirebaseService } from '~/services/firebase.service';
import { PlaceList } from '~/item/nearest-help/model/place';
import { registerElement } from "nativescript-angular/element-registry";
import { SelectedIndexChangedEventData, ValueList, DropDown } from "nativescript-drop-down";
import { Marker, MapView, Position } from 'nativescript-google-maps-sdk';
import { PlaceDetails } from '~/item/nearest-help/model/placeDetails';
import { ActivatedRoute } from '@angular/router';
import { Item } from '~/item/item';
import { ItemService } from '~/item/item.service';

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
		
	latitude =  0;
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
	itemSource = new ValueList<string>();

	constructor(
		private firebaseService: FirebaseService,
		private gpsLocationService: GpsLocationService,
		private nearesthelpService: NearestHelpService,
		private itemService: ItemService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		const id = +this.route.snapshot.params["id"];
		const subitemId = +this.route.snapshot.params["subitemid"];

		this.item = this.itemService.getItem(id);
		this.subItem = this.item.subitems.filter(item => item.id === subitemId)[0];	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.firebaseService.showBanner();
		}, 3000);
	}

	//Map events
	onMapReady = (event) => {
		console.log("Map Ready");
		this.gpsLocationService.getGpsLocation()
			.then((location) => {
				
				let map: MapView = this.mapView.nativeElement;

				this.latitude = location[0];
				this.longitude = location[1];
				var marker = new Marker();
				marker.position = Position.positionFromLatLng(this.latitude,this.longitude);
				marker.title = "You are here !!";
				map.addMarker(marker);

				this.nearesthelpService.getNearByPlaces(this.latitude,this.longitude, 5000, 'hospital')
					.subscribe((res) => {
						this.places = (<any>res).results;
						this.places.forEach((place) => {

							this.nearesthelpService.getNearByPlaceDetails(place.reference).subscribe((details: PlaceDetails)=>{
								this.placeDetails.push(details);
								details.result.international_phone_number
								this.itemSource.push({ value: details.result.id, display: details.result.name });

								var markerPlace = new Marker();
								markerPlace.position = Position.positionFromLatLng(place.geometry.location.lat,place.geometry.location.lng);
								markerPlace.title = details.result.name;
								markerPlace.color = "#00FF00";
								markerPlace.userData = details;
								markerPlace.infoWindowTemplate = "testWindow";
								map.addMarker(markerPlace);
							});

							let dropDown: DropDown = this.dd.nativeElement;
							dropDown.selectedIndex = 1 ;
						});
					})
			},
				(reason) => {
					console.log(reason);
				}
			);
	};

	incrementIndex() {
		this.selectedIndex++;
	}

	decrementIndex() {
		this.selectedIndex--;
	}

	public onchange(args: SelectedIndexChangedEventData) {
		console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
		this.selectedIndex = args.newIndex;

		let place = this.placeDetails.filter(place => place.result.id === this.itemSource.getValue(args.newIndex))
		this.latitude =  +place[0].result.geometry.location.lat;
        this.longitude = +place[0].result.geometry.location.lng;
	}

	onMarkerWindowTapped(args){
		let placeDetail: PlaceDetails = args.marker.userData;

		this.selectedIndex = this.itemSource.getIndex(placeDetail.result.id)
	}

	onMarkerSelect(){
		console.log("onMarkerSelect");
	}
}