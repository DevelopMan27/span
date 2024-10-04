package com.span.app;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MyNativeModule extends ReactContextBaseJavaModule {

    private static final String TAG = "MyNativeModule";

    static {
        System.loadLibrary("MyNativeModule");
    }

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    public native String processQRCode(String qrData);

    @ReactMethod
    public void processQRCode(String qrData, Promise promise) {
        try {
            Log.d(TAG, "Starting processQRCode with data: " + qrData);
            String result = processQRCode(qrData);
            Log.d(TAG, "Finished processQRCode with result: " + result);
            promise.resolve(result);
        } catch (Exception e) {
            Log.e(TAG, "Error processing QR code", e);
            promise.reject("Error processing QR code", e);
        }
    }
}
