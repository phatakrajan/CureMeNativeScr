import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '~/item/item.service';
import { Item } from '~/item/item';
import { FirebaseService } from '~/services/firebase.service';
let webViewInterfaceModule = require('nativescript-webview-interface');
import { WebView, LoadEventData } from "ui/web-view";
import * as fs from "file-system";
import { isIOS, isAndroid } from "platform";
import { RouterExtensions } from 'nativescript-angular/router';


declare var UIColor: any;
declare var android: any;

@Component({
	selector: 'subitem-details',
	moduleId: module.id,
	templateUrl: './subitem-details.component.html',
	styleUrls: ['./subitem-details.component.css']
})

export class SubitemDetailsComponent implements OnInit, AfterViewInit {

	@ViewChild('carousel') carouselRef: ElementRef;
	@ViewChildren('webView') webViews: QueryList<ElementRef>;
	item: Item;
	subItem: Item;
	private oLangWebViewInterface = [];
	selectedIndex: number;
	title: string;
	
	constructor(
		private route: ActivatedRoute,
		private router: RouterExtensions,
		private itemService: ItemService,
		private firebaseService: FirebaseService
	) {

	}

	ngOnInit() {
		const id = +this.route.snapshot.params["id"];
		const subitemId = +this.route.snapshot.params["subitemid"];

		this.selectedIndex = subitemId - 1;

		this.item = this.itemService.getItem(id);
		this.subItem = this.item.subitems.filter(item => item.id === subitemId)[0];	
		this.title = this.item.subitems[this.selectedIndex].name;
						
	}

	ngAfterViewInit(): void {
		this.setupWebInterface();
		this.firebaseService.showBanner();
	}

	setupWebInterface(): any {
		this.webViews.forEach((webViewEle) => {
			let webView: WebView = webViewEle.nativeElement;

			let path = (<any>webView).path
			let iWebView = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');

			webView.on(WebView.loadStartedEvent, (args: LoadEventData) => {
				if (isAndroid) {
					webView.android.setBackgroundColor(android.graphics.Color.TRANSPARENT);//
					webView.android.setLayerType(0x00000001, null);
					webView.android.getSettings().setBuiltInZoomControls(false);
				}
				if (isIOS) {
					webView.ios.backgroundColor = UIColor.clearColor;
					webView.ios.opaque = false;
				}
			});
			webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
				let appFolder = fs.knownFolders.currentApp();
				let file = appFolder.getFile(path);
				file.readText().then((res) => {
					iWebView.callJSFunction('loadHtml', [res]);
				});
			});
			this.oLangWebViewInterface.push(iWebView);
			this.listenLangWebViewEvents();
		});
	}

	listenLangWebViewEvents() {
		this.oLangWebViewInterface.forEach((iWebInterface) => {
			iWebInterface.on('htmlLoaded', () => {
				console.log('htmlLoaded');
			});
		})
	}

	onPageChanged(args){
		const carousel  = args.object;
		this.title = this.item.subitems[carousel.selectedPage].name;
	}

	goBack(){
		this.router.back();
	}
}