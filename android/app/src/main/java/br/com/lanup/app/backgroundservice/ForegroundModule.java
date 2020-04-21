package br.com.lanup.app.backgroundservice;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class ForegroundModule extends ReactContextBaseJavaModule {

    private Context mContext;
    private Intent mForegroundServiceIntent;
    private BroadcastReceiver mEventReceiver;


    ForegroundModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mForegroundServiceIntent = new Intent(mContext, LocationForegroundService.class);
        createEventReceiver();
        registerEventReceiver();
    }


    @ReactMethod
    public void startForegroundService() {
        ContextCompat.startForegroundService(mContext, mForegroundServiceIntent);
    }

    public void createEventReceiver() {
        mEventReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                WritableMap eventData = Arguments.createMap();
                eventData.putString("data", "dd");
                sendEventToJS(getReactApplicationContext(), "onDD", eventData);

            }
        };
    }

    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction("JS_DD_EVENT_NAME");
        mContext.registerReceiver(mEventReceiver, eventFilter);
    }


    public void sendEventToJS(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    @NonNull
    @Override
    public String getName() {
        return "ForegroundModule";
    }
}