# Android SDK

## Why Android Native?
The Solana Mobile Stack at its core, is a native Android SDK written in Kotlin and Java. This section goes over the benefits of building a mobile dApp with native Android.

### Direct access to Android OS features
Developing on Android enables convenient and full access to the Android platform's capabilities. Developers can access OS-specific functionalities like Camera SDK, ARKit, Touch ID, hardware sensors, etc.

### Optimized performance

Native Android apps, as a result of full utilization of the system capabilities, generally have better performance and efficiency. Native apps provide the highest attainable frame rates, computing power, graphics support, etc.

## Library overview

[**`mobile-wallet-adapter-clientlib-ktx`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib-ktx)
- An implementation of the [Mobile Wallet Adapter](../getting-started/overview#mobile-wallet-adapter) protocol in kotlin. It provides a library of classes and methods to start a session between your dApp and a wallet app, enabling MWA-compatible wallet apps to connect and provide transaction signing services for the app. This is our recommended SDK for developing native Android apps.

[**`mobile-wallet-adapter-clientlib`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib-ktx)
- A Java implementation of MWA that is equivalent to the Kotlin library. We recommend using the Kotlin library for the most modern development experience.
