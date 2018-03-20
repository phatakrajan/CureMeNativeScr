import { Injectable, OnInit } from "@angular/core";

import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class FirebaseService implements OnInit {

    androidInterstitialId: string;
    androidBannerId: string;
    iosInterstitialId: string;
    testing: boolean;


    constructor() {
        this.testing = true;
        this.androidBannerId = "ca-app-pub-7848962688204458/3817997068";
    }
    ngOnInit(): void {
        firebase.init({

        }).then(
            instance => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

    showBanner(): void {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
            margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
                bottom: 5,
                top: 0
            },
            androidBannerId: this.androidBannerId,
            iosBannerId: this.iosInterstitialId,
            testing: this.testing, // when not running in production set this to true, Google doesn't like it any other way
            iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
            ]
        }).then(
            function () {
                console.log("AdMob banner showing");
            },
            function (errorMessage) {
                console.error({
                    title: "AdMob error",
                    message: errorMessage,
                    okButtonText: "Hmmkay"
                });
            }
        );
    }

    hideBanner(): void {
        firebase.admob.hideBanner().then(
            function () {
                console.log("AdMob banner hidden");
            },
            function (errorMessage) {
                console.error({
                    title: "AdMob error",
                    message: errorMessage,
                    okButtonText: "Hmmkay"
                });
            }
        );
    }

    showInterstitial(): void {
        firebase.admob.showInterstitial({
            iosInterstitialId: this.iosInterstitialId,
            androidInterstitialId: this.androidInterstitialId,
            testing: this.testing, // when not running in production set this to true, Google doesn't like it any other way
            iosTestDeviceIds: [ // Android automatically adds the connected device as test device with testing:true, iOS does not
            ]
        }).then(
            function () {
                console.log("AdMob interstitial showing");
            },
            function (errorMessage) {
                console.error({
                    title: "AdMob error",
                    message: errorMessage,
                    okButtonText: "Hmmkay"
                });
            }
        );
    }
}
