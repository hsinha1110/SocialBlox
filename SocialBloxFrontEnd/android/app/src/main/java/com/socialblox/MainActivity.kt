package com.socialblox

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "SocialBlox"
    // 🔥 Make sure this name matches AppRegistry.registerComponent() in JS

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)   // This is the correct override
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(
            this,
            mainComponentName,
            true,   // Fabric
            true    // Concurrent Root
        )
    }
}
