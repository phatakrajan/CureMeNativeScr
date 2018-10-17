import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '~/item/item.service';
import { Item } from '~/item/item';
import { FirebaseService } from '~/services/firebase.service';
let webViewInterfaceModule = require('nativescript-webview-interface');
import { WebView, LoadEventData } from "ui/web-view";
import { EventData } from 'ui/page';
import * as fs from "file-system";
import { isIOS, isAndroid } from "platform";
import { TabView } from 'ui/tab-view';
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

	@ViewChild('tab') tab: ElementRef;
	@ViewChildren('webView') webViews: QueryList<ElementRef>;
	item: Item;
	subItem: Item;
	private oLangWebViewInterface = [];
	selectedIndex: number;

	constructor(
		private route: ActivatedRoute,
		private routerExtension: RouterExtensions,
		private itemService: ItemService,
		private firebaseService: FirebaseService
	) {
		const id = +this.route.snapshot.params["id"];
		const subitemId = +this.route.snapshot.params["subitemid"];

		this.selectedIndex = subitemId - 1;

		this.item = this.itemService.getItem(id);
		this.subItem = this.item.subitems.filter(item => item.id === subitemId)[0];
	}

	ngOnInit() { }

	ngAfterViewInit(): void {
		this.setupWebInterface();
		this.firebaseService.showBanner();
	}

	setupWebInterface(): any {
		this.webViews.forEach((webViewEle) => {
			let webView: WebView = webViewEle.nativeElement;

			let path = (<any>webView).path
			let iWebView = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');

			webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
				if (isAndroid) {
					webView.android.setBackgroundColor(android.graphics.Color.TRANSPARENT);//
					webView.android.setLayerType(0x00000001, null);
					webView.android.getSettings().setBuiltInZoomControls(false);
				}
				if (isIOS) {
					webView.ios.backgroundColor = UIColor.clearColor();
					webView.ios.opaque = false;
				}
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
	onIndexChanged(args: EventData) {
		let tabView = <TabView>args.object;
		this.subItem = this.item.subitems.filter(item => item.id === (tabView.selectedIndex - 1))[0];
	}

	goBack(){
		this.routerExtension.back();
	}

}