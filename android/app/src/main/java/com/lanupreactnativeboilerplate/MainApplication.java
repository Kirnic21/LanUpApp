package com.lanupreactnativeboilerplate;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.geolocation.GeolocationPackage;

import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.lanupreactnativeboilerplate.service.LocationService;
import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final LocationListener listener = new LocationListener() {
    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    @Override
    public void onLocationChanged(Location location) {
      Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
      getApplicationContext().startService(myIntent);
      HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
    }
  };

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // LocationManager locationManager = (LocationManager)
    // getSystemService(Context.LOCATION_SERVICE);
    // Start requesting for location
    // locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1,
    // listener);

    SoLoader.init(this, /* native exopackage */ false);
  }
}
