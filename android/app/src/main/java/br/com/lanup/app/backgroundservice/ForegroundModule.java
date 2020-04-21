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
import com.google.gson.Gson;

import javax.annotation.Nonnull;

import static br.com.lanup.app.backgroundservice.LocationForegroundService.LOCATION_EVENT_DATA_NAME;

public class ForegroundModule extends ReactContextBaseJavaModule {

    private Gson mGson;
    private Context mContext;
    private Intent mForegroundServiceIntent;
    private BroadcastReceiver mEventReceiver;


    ForegroundModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mGson = new Gson();
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
                String result = intent.getStringExtra(LOCATION_EVENT_DATA_NAME);
                LocationCoordinates locationCoordinates = mGson.fromJson(result, LocationCoordinates.class);
                WritableMap eventData = Arguments.createMap();
                eventData.putDouble(
                        EventConstant.JS_LOCATION_LAT_KEY,
                        locationCoordinates.getLatitude());
                eventData.putDouble(
                        EventConstant.JS_LOCATION_LON_KEY,
                        locationCoordinates.getLongitude());
                eventData.putDouble(
                        EventConstant.JS_LOCATION_TIME_KEY,
                        locationCoordinates.getTimestamp());
                // if you actually want to send events to JS side, it needs to be in the "Module"
                sendEventToJS(getReactApplicationContext(),
                        LocationForegroundService.JS_LOCATION_EVENT_NAME, eventData);
            }
        };
    }


    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction(LocationForegroundService.LOCATION_EVENT_NAME);
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