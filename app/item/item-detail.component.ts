import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "./item";
import { ItemService } from "./item.service";
import * as firebase from "nativescript-plugin-firebase";
import { FirebaseService } from "../app.firebase.service";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums"; // used to describe at what accuracy the location should be get

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Item;
    latitude =  0;
    longitude = 0;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private firebaseser: FirebaseService
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
        this.firebaseser.showBanner();

        // Get current location with high accuracy
        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, 
                                            maximumAge: 5000, 
                                            timeout: 20000 }).then(
            (value: geolocation.Location) => {
                this.mapView.latitude =  value.latitude;
                this.mapView.longitude = value.longitude;
            },
            (reason: any) => {
            }
        )
    }

    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(-33.86, 151.20);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
}
