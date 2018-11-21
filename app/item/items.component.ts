import { Component, OnInit, AfterViewInit } from "@angular/core";

import { Item } from "~/item/item";
import { ItemService } from "~/item/item.service";
import { FirebaseService } from "~/services/firebase.service";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit, AfterViewInit {

    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(
        private itemService: ItemService,
        private firebaseService: FirebaseService
        ) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    ngAfterViewInit(){
        setTimeout(()=> {
            this.firebaseService.showBanner();
        },1000); 
    }
}