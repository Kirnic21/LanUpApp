package br.com.lanup.app

import android.content.Intent
import android.location.Location
import android.location.LocationListener
import android.os.Bundle
import androidx.multidex.MultiDexApplication
import br.com.lanup.app.backgroundservice.ForegroundPackage
import br.com.lanup.app.service.LocationService
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage
import android.app.Application
import com.facebook.react.ReactHost
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping


class MainApplication : MultiDexApplication(), ReactApplication {
  private val listener: LocationListener = object : LocationListener {
    override fun onStatusChanged(provider: String, status: Int, extras: Bundle) {
    }

    override fun onProviderEnabled(provider: String) {
    }

    override fun onProviderDisabled(provider: String) {
    }

    override fun onLocationChanged(location: Location) {
      val myIntent = Intent(
        applicationContext,
        LocationService::class.java
      )
      applicationContext.startService(myIntent)
      HeadlessJsTaskService.acquireWakeLockNow(applicationContext)
    }
  }

  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())

        }
      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED


    }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)


  fun getPackages(): List<ReactPackage> {
    val packages: MutableList<ReactPackage> = PackageList(this).packages
    packages.add(RNBackgroundFetchPackage())
    packages.add(ForegroundPackage())
    packages.add(InAppUpdatePackage())

    // Packages that cannot be autolinked yet can be added manually here, for
    // example:
    // packages.add(new MyReactNativePackage());
    return packages
  }

  fun getJSMainModuleName(): String {
    return "index"
  }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}


