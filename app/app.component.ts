import { Component, OnInit, NgZone } from "@angular/core";
import { FirebaseService } from "~/services/firebase.service";
import * as appversion from "nativescript-appversion";
import * as localStorage from 'application-settings';
import * as firebase from "nativescript-plugin-firebase";
import { Message } from "nativescript-plugin-firebase";
import { Router } from "@angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent { 
}
