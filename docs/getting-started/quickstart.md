import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Development setup

This quickstart guide will demonstrate how to quickly install necessary tools and set up your development environment, getting you ready to start
building a mobile app on Solana. 

### Android Device/Emulator

:::note
You don't need a Saga device or physical device to build on Solana Mobile! The Mobile Wallet Adapter SDK is compatible with any android device.
:::

To start building with the Solana Mobile SDK, you need an android device or emulator. You can follow the official [Android developer documentation](https://developer.android.com/studio/run/emulator)
for this step.

You will also most likely want to download [Android Studio](https://developer.android.com/studio) to manage your device.

### Install a wallet app

The [fakewallet](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet) app is a test implementation of a Solana wallet app compatible with 
the Mobile Wallet Adapter SDK. It was created for implementation reference and testing purposes. While developing your dApp, you can use fakewallet to test integration with the Mobile Wallet Adapter SDK.

<details>
<summary>Installation steps</summary>

1. Clone the Mobile Wallet Adapter repo, containing the fakewallet app from the [github repository](https://github.com/solana-mobile/mobile-wallet-adapter)

```
git clone https://github.com/solana-mobile/mobile-wallet-adapter.git
```

2. In Android Studio, `Open project > Navigate to the cloned directory > Select mobile-wallet-adapter/android/build.gradle`

3. After Android Studio finishes loading the project, select `fakewallet` in the build/run configuration dropdown in the top right

4. Make sure you have your created Android emulator or connected your physical device. If not, you can follow setup instructions from the previous section.

5. You should now be able to see the fakewallet app on your Android device.

6. Now you can use the Mobile Wallet Adapter SDK to connect your dApp to the fakewallet app and test your integration.

</details>

You can also use any Mobile Wallet Adapter compatible wallet for testing, like Phantom or Solflare.

### Choose a development framework

Currently, the Mobile Wallet Adapter SDK can be installed as a dependency for apps built in Kotlin, Java, and React Native. In the future, there will be support for additional frameworks like React Native Expo, Flutter/Dart.

#### Kotlin and Java
The Mobile Wallet Adapter SDK is hosted on [Maven repository](https://mvnrepository.com/artifact/com.solanamobile/mobile-wallet-adapter-clientlib), so you just need to add the appropriate library to your Android project's dependencies:

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```groovy
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib-ktx:1.0.5'
}
```

</TabItem>
<TabItem value="wallets" label="Java">


```groovy
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib:1.0.5'
}
```

</TabItem>
</Tabs>

#### React Native
Although originally written in Kotlin/Java, Mobile Wallet Adapter has a Javascript SDK provided through React Native Modules. Follow the [React Native official documentation](https://reactnative.dev/docs/environment-setup) and setup for Android, then you just need to add these dependencies
to your project's `package.json` or `npm install`.

<Tabs>
<TabItem value="package.json" label="package.json">

```json
  "dependencies": {
    // Javascript SDK for the Mobile Wallet Adapter libraries
    "@solana-mobile/mobile-wallet-adapter-protocol": "^2.0.0",
    "@solana-mobile/mobile-wallet-adapter-protocol-web3js": "^2.0.0",
    
    // React native polyfill needed for crypto
    "react-native-get-random-values": "^1.8.0", 

    // General SDK for Solana Web/React development
    "@solana/wallet-adapter-react": "^0.15.32",
    "@solana/web3.js": "^1.74.0",
  }
```

</TabItem>
<TabItem value="npm" label="npm">


```
npm install -g @solana-mobile/mobile-wallet-adapter-protocol @solana-mobile/mobile-wallet-adapter-protocol-web3js react-native-get-random-values @solana/wallet-adapter-react @solana/web3.js
```

</TabItem>
</Tabs>


