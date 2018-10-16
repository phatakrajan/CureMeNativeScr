
import { Injectable } from '@angular/core';
import { getCurrentLocation } from "nativescript-geolocation";

@Injectable()
export class GpsLocationService {
    constructor() { }

    getGpsLocation() {
        return getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
            then(function (loc) {
                if (loc) {
                    console.log("Current location is: " + loc.latitude +','+ loc.longitude);
                    let coordinates = [loc.latitude, loc.longitude];
                    return coordinates;
                }
            }, function (e) {
                console.log("Error: " + e.message);
                let coordinates = [0, 0];
                return coordinates;
            });
    }
}