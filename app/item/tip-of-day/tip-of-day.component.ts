import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '~/services/firebase.service';
import { WebView, LoadEventData } from 'ui/web-view';
import { isAndroid, isIOS } from 'ui/page';
import { DatePipe } from '@angular/common';
import { RouterExtensions } from 'nativescript-angular/router';

declare var android: any;
declare var UIColor: any;

@Component({
	selector: 'tip-of-day',
	moduleId: module.id,
	templateUrl: './tip-of-day.component.html',
	styleUrls: ['./tip-of-day.component.css']
})

export class TipOfDayComponent implements AfterViewInit {

	remoteFullPath: string = "13-Sep.html";
	url: string;
	isLoading: boolean = true;

	@ViewChild('myWebView') webView: ElementRef;
	constructor(
		private firebaseService: FirebaseService,
		private router: RouterExtensions,
		private datePipe: DatePipe
	) { }

	ngAfterViewInit() {

		this.firebaseService.showBanner();

		let webView: WebView = this.webView.nativeElement;
		const today: Date = new Date();
		this.remoteFullPath = this.datePipe.transform(today, 'dd-MMM') + '.html';
		console.log(this.datePipe.transform(today, 'dd-MMM') + '.html');
		setTimeout(() => {
			this.firebaseService.getDownloadUrl(this.remoteFullPath)
				.then((url) => {
					console.log("Remote URL: " + url);
					this.url = <string>url;
					this.isLoading = false;
				})
				.catch((error) => {
					console.log("Error: " + error);
				});
		}, 500);

		
		webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
			
			if(isAndroid){
				webView.android.setBackgroundColor(android.graphics.Color.TRANSPARENT);//
				webView.android.setLayerType(0x00000001, null);
				webView.android.getSettings().setBuiltInZoomControls(false);
			}
			if(isIOS){
				webView.ios.backgroundColor = UIColor.clearColor();
				webView.ios.opaque=false;
			}			
		});
	}

	goBackHome(){
		this.router.navigate(['items']);
	}
}