declare var android: any;

@JavaProxy("com.nativescript.cureme.gcm.CureMeIntentService")
export class CureMeIntentService extends android.app.IntentService {
    
    public CureMeIntentService(name: String){

    }

    onHandleIntent(intent: any): void { //android.content.Intent
        var action = intent.getExtras();
    }

}