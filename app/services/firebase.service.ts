import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Message } from "nativescript-plugin-firebase";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as localStorage from 'application-settings';
import * as appversion from "nativescript-appversion";
import { RouterExtensions } from "nativescript-angular/router";

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
        private zone: NgZone,
        private route: RouterExtensions
    ) {
        this.testing = true;
        this.androidBannerId = "ca-app-pub-7848962688204458/3817997068";
    }

    init() {
        setTimeout(
            firebase.init({
                storageBucket: "gs://cureme-native.appspot.com",
                // Optionally pass in properties for database, authentication and cloud messaging,
                // see their respective docs.
                onMessageReceivedCallback: (message: Message) => {
                    console.log(`Title: ${message.title}`);
                    console.log(`Body: ${message.body}`);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log(`Value of 'foo': ${message.data.foo}`);

                    console.log(`Value of 'foreground': ${message.foreground}`);

                    console.dir(message);

                    this.notificationReceived = true;

                    if (message.foreground === false) {
                        this.route.navigate(['/tip-of-day'])
                    }

                    // LocalNotifications.schedule([{
                    //     id: 1,
                    //     title: 'The title',
                    //     body: 'Recurs every minute until cancelled',
                    //     ticker: 'The ticker',
                    //     badge: 1,
                    //     groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                    //     groupSummary:"Summary of the grouped messages above", //android only
                    //     ongoing: false, // makes the notification ongoing (Android only)
                    //     smallIcon: 'res://icon',
                    //     interval: 'minute',
                    //     channel: 'My Channel', // default: 'Channel'
                    //     sound: "customsound-ios.wav", // falls back to the default sound on Android
                    //     at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
                    //   }]).then(
                    //       function() {
                    //         console.log("Notification scheduled");
                    //       },
                    //       function(error) {
                    //         console.log("scheduling error: " + error);
                    //       }
                    //   )
                },

                onPushTokenReceivedCallback: (token) => {
                    console.log("Firebase push token: " + token);
                    firebase.subscribeToTopic("tipofday").then(() => {
                        console.log("Subscribed to topic TipOfDay");
                    }, (error) => {
                        console.log(error);
                    });
                    // appversion.getVersionCode().then((v: string) => {
                    //     if (localStorage.hasKey(v.toString()) === false){
                    //         localStorage.setString(v.toString(), token);
                    //         this.zone.run(() => {
                    //             this.registerToken(token).subscribe((res) => {
                    //                 console.log(res);
                    //             });
                    //         });   
                    //     }
                    // });                            
                }
            }).then(
                instance => {
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
