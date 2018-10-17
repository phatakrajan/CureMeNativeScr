import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseService } from "~/services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Environment } from "~/main";

@Injectable()
export class ItemsGuard implements CanActivate {
    constructor(
        private router: RouterExtensions
    ){

    }
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (Environment.notificationsReceived) {
            this.router.navigate(['tip-of-day'])
        } else {
            return true;
        }
    }
}