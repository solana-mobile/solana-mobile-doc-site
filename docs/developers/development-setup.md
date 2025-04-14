import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Development Setup

This section covers the steps to:
- Set up your local environment for Android development.
- Configure a device or emulator for building apps for the dApp Store.
- Install an MWA-compliant wallet app for development purposes.


## Set up Android development environment

To build apps for the dApp Store, you need to setup your environment for Android development.

:::info Supported Frameworks

<Tabs>
<TabItem value="Expo / React Native" label="Expo / React Native">

For both Expo or React Native Android development:
- View the Expo [**setup documentation**](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local) (Choose custom development build instead of Expo Go).


</TabItem>
<TabItem value="Kotlin (Native)" label="Kotlin (Native)">

For Kotlin Android development:
- Install [Android Studio](https://developer.android.com/studio/install).

</TabItem>
<TabItem value="Flutter" label="Flutter">

For Flutter Android development:
- View the official Flutter [**setup documentation**](https://docs.flutter.dev/get-started/install/macos/mobile-android#configure-android-development).

</TabItem>
</Tabs>

:::

## Setup Device/Emulator

You can test your app during development on any Android device or emulator. A Solana Mobile device is **not** required for dApp Store development—testing on a standard Android device is typically sufficient.

For detailed device setup instructions, refer to Android's official documentation:

- [Setting up a physical device](https://developer.android.com/studio/run/device)
- [Configuring the Android Emulator](https://developer.android.com/studio/run/emulator)

## Install a development wallet app 

The [Mobile Wallet Adapter](/mobile-wallet-adapter/overview) (MWA) library allows your app to connect and interact with compatible wallet apps on your device. 

Install an MWA-compatible wallet app to test your app's Mobile Wallet Adapter integration.

### Fake Wallet

Solana Mobile provides a 'fake' development wallet for you to test your app with and get a feel of what Seed Vault Wallet interactions on the Seeker will look like.

The fake wallet features:
- Mobile Wallet Adapter support
- Simulate connection or signing errors
- QR Code Scanning for MWA Remote Connections

It is intended for development purposes only, so it does not store a persistent keypair and the wallet is reset each time the app is exited.

<details>
<summary>Installation steps</summary>

1. Clone the Mobile Wallet Adapter repo, containing the `fakewallet` app from the [github repository](https://github.com/solana-mobile/mobile-wallet-adapter)

```
git clone https://github.com/solana-mobile/mobile-wallet-adapter.git
```

2. In Android Studio, `Open project > Navigate to the cloned directory > Select mobile-wallet-adapter/android/build.gradle`

3. After Android Studio finishes loading the project, select `fakewallet` in the build/run configuration dropdown in the top right

![fakewallet build](/img/fakewallet-install.png)

4. After it builds successfully, you should see the app on your connected Android device or emulator.

</details>

### Other MWA-compliant wallet apps

You can also install and test with these popular MWA-compatible wallet apps:
- [Phantom](https://phantom.com/)
- [Solflare](https://www.solflare.com/)

## Next steps

You have a development environment and testing device, and are now ready to start developing. 

Check out these links to quickly get an app running:
- [Quickstart](/react-native/quickstart)
- [Sample Apps](/sample-apps/sample_app_overview)




