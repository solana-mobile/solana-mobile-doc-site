import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"
import ImageRow from "../../src/components/ImageRow"

import BuildRunImage from "../../static/kotlin_images/compose-build-run.png";

# Kotlin Quickstart

The quickest way to start building Solana Kotlin dApps is to build off the [Solana Jetpack Compose Scaffold](https://github.com/solana-mobile/solana-kotlin-compose-scaffold).

The scaffold app serves as both a starting implementation and an example reference of how to use the core Kotlin SDKs, like `web3-core`, `rpc-core`,
and Mobile Wallet Adapter.

<ImageRow>
    <img src="/kotlin_images/scaffoldScreenshot1.png" alt="Scaffold dApp Screenshot 1" width="300" />
    <img src="/kotlin_images/scaffoldScreenshot2.png" alt="Scaffold dApp Screenshot 2" width="300" />
    <img src="/kotlin_images/scaffoldScreenshot3.png" alt="Scaffold dApp Screenshot 3" width="300" />
</ImageRow>

## Prerequisites

Follow the [prerequisite setup](../getting-started/development-setup#prerequisite-setup) guide to set up Android Studio, your [Android Device/Emulator](../getting-started/development-setup#2-setup-deviceemulator) and install a MWA-compatible wallet, like [fakewallet](../getting-started/development-setup#3-install-a-wallet-app).

## Install the Jetpack Compose Scaffold

**Clone the repo**

The scaffold app is open source and can be fetched from [Github](https://github.com/solana-mobile/solana-kotlin-compose-scaffold).

```shell
git clone https://github.com/solana-mobile/solana-kotlin-compose-scaffold.git
```

**Open the project in Android Studio**

In Android Studio, open the project with `File > Open > SolanaKotlinComposeScaffold/build.gradle.kts`

**Build and run**

Ensure you have connected an Android emulator or device and it is detected by Android Studio. If not, follow
this [guide](../getting-started/development-setup#2-setup-deviceemulator) to setup your emulator/device.

In the top bar of Android Studio, select `"app"` as the configuration and your emulator/device, then click run.

<img
src={BuildRunImage}
alt="Build and run the app"
/>

If successful, the scaffold app will launch on your emulator/device!

## Further learning

To learn how to use the core Solana Kotlin SDKs, check out these developer guides.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/overview"
        header={{
            label: "RPC Requests",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn about the React Native SDK and how to quickly start building on Solana Mobile.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="/android-native/overview"
        header={{
            label: "Transaction building",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn how to build on native Android and build an app with full Android capabilities.",
            translateId: "development-setup-body",
        }}
        iconPath="img/android_icon.svg"
    />
    <Card
        to="/react-native/setup#solana-mobile-dapp-scaffold"
        header={{
            label: "Mobile Wallet Adapter",
            translateId: "developer-programs",
        }}
        body={{
            label: "Jump into building with our template React Native dApp.",
            translateId: "learn-programs",
        }}
        iconPath="img/rocket-icon2.png"
    />
</CardLayout>
