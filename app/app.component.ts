import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { on as applicationOn, launchEvent, LaunchEventData } from "application";
import { Environment } from "./main";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent { 

    constructor(
        private router: Router,
    ){
        applicationOn(launchEvent, (args: LaunchEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android.content.Intent class.
                console.log("Launched Android application with the following intent: " + args.android + ".");
                if (args.android.getExtras().getString('foo')){
                    Environment.notificationsReceived = true;
                    this.router.navigate(['tip-of-day']);
            }
            } else if (args.ios !== undefined) {
                // For iOS applications, args.ios is NSDictionary (launchOptions).
                console.log("Launched iOS application with options: " + args.ios);
            }
        });
    }
}
