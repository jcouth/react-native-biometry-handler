package com.biometryhandler

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

enum class BiometryType {
  STRONG, WEAK, DEVICE_CREDENTIAL, NONE
}

@ReactModule(name = BiometryHandlerModule.NAME)
class BiometryHandlerModule(reactContext: ReactApplicationContext) :
  NativeBiometryHandlerSpec(reactContext) {

  private fun buildResult(success: Boolean, code: Int?, reason: String?): WritableMap = Arguments.createMap().apply {
    putBoolean("isSuccess", success)
    if (code != null) putInt("code", code) else putNull("code")
    if (reason != null) putString("reason", reason) else putNull("reason")
  }

  override fun getName(): String {
    return NAME;
  }

  override fun isAvailable(): String {
    val biometricManager = BiometricManager.from(reactApplicationContext);

    return when {
      biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG) == BiometricManager.BIOMETRIC_SUCCESS -> BiometryType.STRONG.name
      biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK) == BiometricManager.BIOMETRIC_SUCCESS -> BiometryType.WEAK.name
      biometricManager.canAuthenticate(BiometricManager.Authenticators.DEVICE_CREDENTIAL) == BiometricManager.BIOMETRIC_SUCCESS -> BiometryType.DEVICE_CREDENTIAL.name
      else -> BiometryType.NONE.name
    }
  }

  override fun authenticate(promise: Promise) {
    var done = false
    val activity = currentActivity
    if (activity == null || activity !is FragmentActivity) {
      promise.resolve(buildResult(false, null, "NO_ACTIVITY"))
      return
    }
    
    val executor = ContextCompat.getMainExecutor(activity)

    val biometricPrompt = BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
      override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
        if (done) return
        done = true
  
        super.onAuthenticationError(errorCode, errString)
        promise.resolve(buildResult(false, errorCode, errString.toString()))
      }

      override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
        if (done) return
        done = true
  
        super.onAuthenticationSucceeded(result)
        promise.resolve(buildResult(true, null, null))
      }

      override fun onAuthenticationFailed() {
      }
    })

    val promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric Handler Example App")
        .setSubtitle("")
        .setDescription("Desbloqueie seu celular")
        .setAllowedAuthenticators(
          BiometricManager.Authenticators.BIOMETRIC_STRONG or
          BiometricManager.Authenticators.BIOMETRIC_WEAK or
          BiometricManager.Authenticators.DEVICE_CREDENTIAL
        )
        .build()

    activity.runOnUiThread {
      biometricPrompt.authenticate(promptInfo)
    }
  }

  companion object {
    const val NAME = "BiometryHandler"
  }
}
