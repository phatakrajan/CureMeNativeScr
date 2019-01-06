import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ItemService, ItemName } from '~/item/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '~/item/item';
import { RouterExtensions } from 'nativescript-angular/router';
import { FirebaseService } from '~/services/firebase.service';
import { isAndroid, isIOS } from 'tns-core-modules/ui/page/page';


@Component({
    selector: "ng-sub-item",
    moduleId: module.id,
    templateUrl: "./subitem.component.html",
})
export class SubItemComponent implements OnInit, AfterViewInit {
    grpItem: Item;
    isAndroid : boolean = isAndroid;
    isIOS: boolean = isIOS;

    constructor(private itemService: ItemService,
                private route: ActivatedRoute,
                private router: RouterExtensions,
                private firebaseService: FirebaseService 
            ){
        
    }

    ngOnInit(){
        const id = +this.route.snapshot.params["id"];
        this.grpItem = this.itemService.getItem(id);
    }

    ngAfterViewInit(): void {
        this.firebaseService.showBanner();
    }

    onNavigate(itemId: number, subItemId: number){
        if(itemId === ItemName.SELF_CURE || itemId === ItemName.FIRST_AID || 
            itemId === ItemName.SEASONAL_PROBLEM || itemId === ItemName.GRANNY_TIPS){
                this.router.navigate(['itemdetails',itemId, subItemId]);
        } else if (itemId === ItemName.NEAREST_HELP){
            this.router.navigate(['nearesthelp',itemId, subItemId]);
        } else if (itemId === ItemName.CONTACT_DOCTOR) {
            this.router.navigate(['contact-us',itemId, subItemId]);
        }
        
    }

	goBack(){
		this.router.back();
	}
}