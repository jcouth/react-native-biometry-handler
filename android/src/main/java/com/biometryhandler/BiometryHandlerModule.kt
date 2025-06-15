package com.biometryhandler

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import androidx.biometric.BiometricManager;

@ReactModule(name = BiometryHandlerModule.NAME)
class BiometryHandlerModule(reactContext: ReactApplicationContext) :
  NativeBiometryHandlerSpec(reactContext) {

  override fun getName(): String {
    return NAME;
  }

  override fun isAvailable(): String {
    val biometricManager = BiometricManager.from(reactApplicationContext);

    return when {
      biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG) == BiometricManager.BIOMETRIC_SUCCESS -> "STRONG"
      biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK) == BiometricManager.BIOMETRIC_SUCCESS -> "WEAK"
      biometricManager.canAuthenticate(BiometricManager.Authenticators.DEVICE_CREDENTIAL) == BiometricManager.BIOMETRIC_SUCCESS -> "DEVICE_CREDENTIAL"
      else -> "NONE"
    }
  }

  override fun authenticate(promise: Promise) {
    return promise.resolve(true);
  }

  companion object {
    const val NAME = "BiometryHandler"
  }
}
