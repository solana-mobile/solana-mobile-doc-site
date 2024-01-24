import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Development Setup

This guide demonstrates how to set up your development environment for Android mobile development. Regardless of framework choice, ensure you follow these steps to start developing.

## Prerequisites

### 1. Install Android Studio

Install Android Studio to build apps and manage your device/emulator, following the official [Android developer docs](https://developer.android.com/studio/install). If you're planning on developing with React Native, then follow the [React Native Android environment setup guide](https://reactnative.dev/docs/environment-setup).

### 2. Setup Device/Emulator

To test and preview your app as you develop, you can build and deploy your app to an Android device or emulator in Android Studio.
Follow official Android developer documentation to [create an emulator](https://developer.android.com/studio/run/emulator) or deploy your app to a [hardware device](https://developer.android.com/studio/run/device).

### 3. Install a wallet app

The [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter) (MWA) library allows your dApp to connect and interface with Wallet Apps that implement the MWA protocol. For testing, you want to have an MWA-compatible wallet on the same device or emulator as your dApp.

#### 1. Download, build, and install fakewallet

The [fakewallet](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet) app is a 'fake' Mobile Wallet Adapter compliant wallet. Install it on your Android emulator or device. It does not store persistent keypairs, and the wallet is "reset" each time the app is exited.

<details>
<summary>Installation steps</summary>

1. Clone the Mobile Wallet Adapter repo, containing the fakewallet app from the [github repository](https://github.com/solana-mobile/mobile-wallet-adapter)

```
git clone https://github.com/solana-mobile/mobile-wallet-adapter.git
```

2. In Android Studio, `Open project > Navigate to the cloned directory > Select mobile-wallet-adapter/android/build.gradle`

3. After Android Studio finishes loading the project, select `fakewallet` in the build/run configuration dropdown in the top right

![fakewallet build](/img/fakewallet-install.png)

4. After it builds successfully, you should see the app on your Android device or emulator.

</details>

#### 2. Install real wallet apps

fakewallet was created for implementation reference and quick testing purposes. You should also test your dApp with popular MWA-compatible wallet apps like [Phantom](https://play.google.com/store/apps/details?id=app.phantom), [Solflare](https://play.google.com/store/apps/details?id=com.solflare.mobile), and [Ultimate](https://ultimate.app/).

You can install these onto an emulator by using an emulator with Google Play Store support. From there, you can login to your Google account and search for Phantom or Solflare to install it onto the emulator.

## Choose a development framework

Although, the Solana Mobile Stack is primarily written in native Android, we also have support for popular mobile
development frameworks.

These are our official SDKs that are maintained by the Solana Mobile team.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/quickstart"
        header={{
            label: "React Native",
            translateId: "react-native",
        }}
        body={{
            label: "Quickly start building your mobile dApp with React Native, with access to a selection of familiar web libraries.",
            translateId: "react-native-body",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="/android-native/overview"
        header={{
            label: "Kotlin",
            translateId: "android-native",
        }}
        body={{
            label: "Develop a Kotlin Android app to utilize the full capabilities of the Android OS and build a performant native experience.",
            translateId: "android-native-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

### Community SDKs

These SDKs are actively maintained, supported, and used by members and developers of our community. Click to learn more about
the capabilities supported by each, the state of development, and how to get started.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/flutter/overview"
        header={{
            label: "Flutter",
            translateId: "flutter-headr",
        }}
        body={{
            label: "An actively maintained SDK for building Solana mobile dApps with Flutter.",
            translateId: "learn-programs",
        }}
        iconPath="img/flutter-icon.svg"
    />
    <Card
        to="/unity/unity_sdk"
        header={{
            label: "Unity",
            translateId: "unity-header",
        }}
        body={{
            label: "Integrate the Solana Mobile stack into your Unity mobile game.",
            translateId: "unity-setup-body",
        }}
        iconPath="img/unity-logo.png"
    />
    <Card
        to="/unreal/unreal_sdk"
        header={{
            label: "Unreal Engine",
            translateId: "unreal-header",
        }}
        body={{
            label: "An early stage SDK for integrating Solana Mobile into an Unreal Engine mobile game.",
            translateId: "unreal-header-body",
        }}
        iconPath="img/unreal-logo.png"
    />
</CardLayout>
