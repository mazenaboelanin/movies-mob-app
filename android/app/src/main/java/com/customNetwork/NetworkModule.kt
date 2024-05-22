package com.customNetwork

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import okhttp3.*
import java.io.IOException
import com.facebook.react.bridge.Promise


class NetworkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val client = OkHttpClient()

    override fun getName() = "NetworkModule"

    @ReactMethod
    fun fetchData(url: String, promise: Promise) {
        val request = Request.Builder()
            .url(url)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                promise.reject(e)
            }

            @Throws(IOException::class)
            override fun onResponse(call: Call, response: Response) {
                if (!response.isSuccessful) {
                    promise.reject(IOException("Unexpected code $response"))
                } else {
                    promise.resolve(response.body?.string())
                }
            }
        })
    }

    

    @ReactMethod fun checkUrl(baseUrl: String) {
        Log.d("****** NetworkModule URL: ", baseUrl )
    }

}
