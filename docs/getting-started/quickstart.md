import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Quickstart

This guide will demonstrate how to install necessary tools and set up your development environment, getting you ready to 
build a mobile app on Solana. 

## Choose a development framework

Currently, the Solana Mobile SDK is primarily supported for Android apps built in React Native and Android Native. 
In particular,  **Mobile Wallet Adapter** has a React Native and an Android library maintained by the Solana Mobile team.

<CardLayout>
    <Card
        to="/react-native/quickstart"
        header={{
            label: "React Native Quickstart",
            translateId: "developer-programs",
        }}
        body={{
            label: "Quickly set up a React Native project and start building on Solana Mobile with our Javascript SDKs.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="/android-native/quickstart"
        header={{
            label: "Android Quickstart",
            translateId: "development-setup",
        }}
        body={{
            label: "Quickly set up an Android project and start building on Solana Mobile with our Android SDK.",
            translateId: "development-setup-body",
        }}
        iconPath="img/android_icon.svg"
    />
</CardLayout>

### Additional SDKs

- **[Solana Mobile Flutter SDK](/additional-sdks/flutter_sdk)** for those interested in developing Flutter mobile dApps.
- **[Solana Unity SDK](/additional-sdks/unity_intro):** for game developers interested in integrating Solana in a mobile game.

## Prerequisite Setup

Regardless of framework choice, ensure you follow this prerequisite setup guide to fully test integration of your app.

### Android Device/Emulator

:::note
You don't need a Saga device or physical device to build on Solana Mobile! The Mobile Wallet Adapter SDK is compatible with any Android device.
:::

To start building with the Solana Mobile SDK, you will need an android device or emulator. You can follow the official [Android Emulator developer documentation](https://developer.android.com/studio/run/emulator)
for this step.

You will most likely want to download [Android Studio](https://developer.android.com/studio) to build apps and manage your device.

### Install a wallet app

The [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter) (MWA) library allows your dApp to connect and interface with Wallet Apps that implement the MWA protocol. For testing, you want to have an MWA-compatible wallet on the same device or emulator as your dApp.

#### fakewallet

The [fakewallet](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet) app is a test implementation of a Solana wallet app compatible with 
the Mobile Wallet Adapter SDK. It does not store persistent keypairs, and the wallet is "reset" each time the app is exited.

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

#### Production

fakewallet was created for implementation reference and quick testing purposes. For production testing, test your dApp with popular MWA-compatible wallet apps like [Phantom](https://play.google.com/store/apps/details?id=app.phantom) and [Solflare](https://play.google.com/store/apps/details?id=com.solflare.mobile).

