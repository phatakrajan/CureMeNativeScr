import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Message } from "nativescript-plugin-firebase";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Environment } from "~/main";
import { confirm } from "ui/dialogs";

@Injectable()
export class FirebaseService {

    androidInterstitialId: string;
    androidBannerId: string;
    iosInterstitialId: string;
    testing: boolean;

    private url: string = "https://us-central1-cureme-native.cloudfunctions.net/apis/"

    notificationReceived: boolean = false;

    constructor(
        private http: HttpClient,
        private route: Router
    ) {
        this.testing = true;
        this.androidBannerId = "ca-app-pub-7848962688204458/3817997068";
        this.iosInterstitialId = "ca-app-pub-7848962688204458/4919824112";
    }

    init() {
        setTimeout(() =>
            firebase.init({
                iOSEmulatorFlush: true,
                showNotificationsWhenInForeground: true,
                // Optionally pass in properties for database, authentication and cloud messaging,
                // see their respective docs.
                onMessageReceivedCallback: (message: Message) => {
                    console.log(`Title: ${message.title}`);
                    console.log(`Body: ${message.body}`);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log(`Value of 'foo': ${message.data.foo}`);

                    console.log(`Value of 'foreground': ${message.foreground}`);

                    console.dir(message);

                    Environment.notificationsReceived = true;

                    if (message.foreground === false) {
                        this.route.navigate(['tip-of-day'])
                    } else {
                        let options = {
                            title: "Notification Received",
                            message: "Navigating to the Notification. Do you want to continue?",
                            okButtonText: "View",
                            cancelButtonText: "Cancel"
                        };
                        confirm(options).then((result: boolean) => {
                            if (result) {
                                this.route.navigate(['tip-of-day'])
                            }
                        });
                    }
                },

                onPushTokenReceivedCallback: (token) => {
                    console.log("Firebase push token: " + token);
                    firebase.subscribeToTopic("tipofday").then(() => {
                        console.log("Subscribed to topic TipOfDay");
                    }, (error) => {
                        console.log(error);
                    });
                }
            }).then(
                () => {
                    console.log("firebase.init done");
                    setTimeout(() => {
                        firebase.subscribeToTopic("tipofday").then(() => {
                            console.log("Subscribed to topic TipOfDay");
                        }, (error) => {
                            console.log("Subscription error - " + error);
                        });
                    }, 300);
                },
                error => {
                    console.log(`firebase.init error: ${error}`);
                }
            ), 3000);
    }

    showBanner(): void {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
            margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
                bottom: 5,
                //top: 0
            },
            androidBannerId: this.androidBannerId,
            iosBannerId: this.iosInterstitialId,
            testing: this.testing, // when not running in production set this to true, Google doesn't like it any other way
            iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
                "0E73873B-1354-4DF9-B786-FBB5C03F8174"
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

    registerToken(token): Observable<any> {
        return this.http.post(this.url + 'register/' + token, null);
    }

    getDownloadUrl(remoteFullPath) {
        return firebase.storage.getDownloadUrl({
            bucket: 'gs://cureme-native.appspot.com',
            remoteFullPath: remoteFullPath
        }).then((url) => {
            return url;
        }).catch((error) => {
            console.log(error);
        });
    }
}
