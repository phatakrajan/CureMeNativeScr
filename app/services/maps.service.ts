import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "nativescript-geolocation";
import { map } from "rxjs/operators";
import { DirectionDetails } from "~/item/nearest-help/model/directionDetails";
import * as GlobalSettings from "~/settings/globalSettings"

@Injectable()
export class MapsService {

    // https://maps.googleapis.com/maps/api/directions/json?origin=40.6655101,-73.89188969999998&destination=40.6905615%2C-73.9976592&mode=driving&key=AIzaSyBjWBKt1Nzgv937MqvxDKET5V2gDpwIuZ0
    private DIRECTION_BASE_URL: string = "https://maps.googleapis.com/maps/api/directions/json?";

    constructor(
        private http: HttpClient,
    ) {}

    getDirections(source: Location, destination: Location){
        let url = this.DIRECTION_BASE_URL + "origin=" + source.latitude + "," + source.longitude + "&destination=" + destination.latitude + "," + destination.longitude + "&mode=driving&key=" + GlobalSettings.DIRECTIONS_KEY;
        // Set content headers
        // login post request
        return this.http.get(url)
            .pipe(map((res: DirectionDetails) => {
                console.log("Google Directions api: ", res)
                return res;
            }));
    }
}