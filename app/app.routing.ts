import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "~/item/items.component";
import { SubItemComponent } from "~/item/subitem/subitem.component";
import { NearestHelpComponent } from "~/item/nearest-help/nearest-help.component";
import { SubitemDetailsComponent } from "~/item/subitem/subitem-details/subitem-details.component";
import { TipOfDayComponent } from "~/item/tip-of-day/tip-of-day.component";
import { ContactUsComponent } from "~/item/contact-us/contact-us.component"
import { ItemsGuard } from "~/item/items.guard";

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent, canActivate: [ItemsGuard] },
    { path: "item/:id", component: SubItemComponent },
    { path: "itemdetails/:id/:subitemid", component: SubitemDetailsComponent },
    { path: "nearesthelp/:id/:subitemid", component: NearestHelpComponent },
    { path: "tip-of-day", component: TipOfDayComponent},
    { path: "contact-us/:id/:subitemid", component: ContactUsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }