import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { RouterExtensions } from 'nativescript-angular/router';
import { openUrl } from 'tns-core-modules/utils/utils';

@Component({
	moduleId: module.id,
	selector: 'contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
    grpItem: Item;

	constructor(
		private route: ActivatedRoute,
		private itemService: ItemService,
		private router: RouterExtensions,
	) {
        const id = +this.route.snapshot.params["id"];
        this.grpItem = this.itemService.getItem(id);
	}

	ngOnInit() { }

	goBack() {
		this.router.back();
	}

	onContactUs(){
		openUrl('mailto:' + 'cure.me@live.com');
	}
}