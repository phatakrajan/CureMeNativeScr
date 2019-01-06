import { SubItemComponent } from '~/item/subitem/subitem.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "~/app.routing";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { AppComponent } from "~/app.component";

import { ItemService } from "~/item/item.service";
import { ItemsComponent } from "~/item/items.component";
import { FirebaseService } from '~/services/firebase.service';
import { GpsLocationService } from '~/services/gpsLocation.service';
import { NearestHelpComponent } from '~/item/nearest-help/nearest-help.component';
import { SubitemDetailsComponent } from '~/item/subitem/subitem-details/subitem-details.component';
import { ContactUsComponent } from "~/item/contact-us/contact-us.component";
import { TipOfDayComponent } from '~/item/tip-of-day/tip-of-day.component';
import * as platform from "platform";
import * as GlobalSettings from "~/settings/globalSettings"

declare var GMSServices: any;

declare var android: any;

import { registerElement } from 'nativescript-angular/element-registry';
// Register Custom Elements for Angular

registerElement("Carousel", () => require("nativescript-carousel").Carousel);
registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ItemsGuard } from '~/item/items.guard';
import { DatePipe } from '@angular/common';
import { MapsService } from './services/maps.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css',
            'fa': 'font-awesome.css'
        })    
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        SubItemComponent,
        SubitemDetailsComponent,
        NearestHelpComponent,
        TipOfDayComponent,
        ContactUsComponent
    ],
    providers: [
        ItemService,
        FirebaseService,
        GpsLocationService,
        MapsService,
        ItemsGuard,
        DatePipe
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
    constructor(
        private firebaseService: FirebaseService
    ){
        this.firebaseService.init();
        if (platform.isIOS) { 
            GMSServices.provideAPIKey(GlobalSettings.GOOGLE_MAPS_KEY);
        }
    }
 }
