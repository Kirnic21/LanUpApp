package br.com.lanup.app.backgroundservice;

import android.app.IntentService;
import android.content.Intent;
import android.os.Handler;


import androidx.annotation.Nullable;

public class BackgroundIntentService extends IntentService {

    BackgroundIntentService() {
        super(LocationForegroundService.class.getName());
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        broadcastLocationReceived("dd2");
        new Handler();
    }

    private void broadcastLocationReceived(String data) {
        Intent eventIntent = new Intent("JS_DD_EVENT_NAME");
        eventIntent.putExtra("JS_DD_EVENT_NAME", data);
        getApplicationContext().sendBroadcast(eventIntent);
    }

}
