import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from '@angular/common/http';
import * as GlobalSettings from "~/settings/globalSettings"

@Injectable()
export class NearestHelpService {

    private PLACES_SEARCH_URL: string = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    private PLACES_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json?";    
    
    constructor(
        private http: HttpClient
    ){

    }

    getNearByPlaces(latitude: number, longitude: number, radius: number, types: string){

        const params: HttpParams = new HttpParams()
            .set('location',latitude.toString() + ',' + longitude.toString())
            .set('radius',radius.toString())
            .set('sensor', 'false')
            .set('types',types)
            .set('key',GlobalSettings.GOOGLE_PLACES_KEY);

        return this.http.get(this.PLACES_SEARCH_URL,{params: params});
    }

    getNearByPlaceDetails(reference: string){
        const params: HttpParams = new HttpParams()
            .set('sensor', 'false')
            .set('reference',reference)
            .set('key',GlobalSettings.GOOGLE_PLACES_KEY);

        return this.http.get(this.PLACES_DETAILS_URL,{params: params});
    }

}