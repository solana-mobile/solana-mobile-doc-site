--- 
title: Overview
---

## What's in the Solana Mobile Stack?

The **Solana Mobile Stack (SMS)** is an open source collection of libraries that provide key technologies for building Mobile dApps that can interact with the Solana network. 
The SDK allows developers to create rich mobile experiences and seamless UX for mobile Solana users. 

Read on to learn more about each SDK in the stack, or watch this [SMS presentation video](https://www.youtube.com/watch?v=QldXwIczBAE) from the Vancouver Hacker House.

:::note
You don't need a Saga device or physical device to build on Solana Mobile. The stack is compatible with any Android device. See [**prerequisite setup**](quickstart#prerequisite-setup) to set up your development environment and start building!
:::

### Mobile Wallet Adapter

[**Mobile Wallet Adapter (MWA)**](https://github.com/solana-mobile/mobile-wallet-adapter) is the core enabling SDK and first step in building a Solana Mobile dApp. For dApp developers, **MWA allows your app to connect to any compatible wallet app** (like Phantom and Solflare) and then perform actions like signing and sending transactions to the Solana network.

Why this is important -- dApp developers no longer need to build in support for each individual wallet, instead **just integrate the MWA SDK once to be compatible with every compliant Solana wallet!**

### Integrate MWA into your dApp

Mobile Wallet Adapter SDK is available for developers using **React Native**, **Android (Kotlin/Java)**, and **Flutter**. The resources below can get you started on using MWA in your mobile dApp.

#### Scaffold Mobile dApp

The quickest path to using MWA is starting with our [React Native Scaffold Mobile dApp](/react-native/quickstart#clone-solana-mobile-dapp-scaffold) that comes with prebuilt components. This is a great option for developers already familiar with React, web development, or the Solana web stack.

**Resources**
- **Installation/Setup:** [React Native](/react-native/setup) - [Android](/android-native/quickstart) - [Flutter](/additional-sdks/flutter_sdk)
- **Quickstart Guides:** [React Native](/react-native/quickstart) - [Android (Kotlin)](/android-native/mwa_integration)
- **Tutorials:** [React Native Hello World dApp](react-native/hello_world_tutorial)
- [Sample App Collection](/sample-apps/sample_app_overview)

#### Deep dive learning

Fundamentally, MWA is a generic protocol specification for connecting apps to Wallets on mobile devices. If interested, you can deep dive into the protocol [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

#### Wallet Apps

If you're developing a MWA-compatible wallet app, we have the [`walletlib`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib) Android SDK that implements the wallet side of the MWA protocol. This is a smaller usecase so the resources for wallets are only documented on [Github](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/android/docs/integration_guide.md) but if you have more questions, get in touch with the team directly for support on [Discord](https://discord.com/invite/solanamobile).

### Supported platforms
#### Android

The [Mobile Wallet Adapter](#mobile-wallet-adapter) protocol is fully supported and implemented for Android devices, allowing for cross communication between Android dApps and Android Wallet apps. It even works with Mobile Browser to Android Wallet, as explained more below.


#### Web

Solana Web dApps are already integrated with Mobile Wallet Adapter, as long as they are already using the `@solana/wallet-adapter-react` library. This library automatically uses the Mobile Wallet Adapter plugin and enables it, when running in a compatible mobile environment. 

#### iOS

Currently, Mobile Wallet Adapter protocol has no implementation for iOS devices. The MWA protocol was designed and envisioned to support multi-platform, so iOS support is a work in progress and in future direction, there are plans to add iOS-specific protocol details to the Mobile Wallet Adapter Specification.

## Other SDKs

### Solana Pay for Android

The [**Solana Pay protocol**](https://docs.solanapay.com/) was developed independently of the Solana Mobile Stack, but combining payments with a mobile device is a natural fit for Solana Pay. 

To assist developers in integrating Solana Pay, we’ve developed a [**reference implementation**](https://github.com/solana-mobile/solana-pay-android-sample) demonstrating how Wallet apps can use the system features of Android devices to capture Solana Pay URLs via QR codes, NFC taps, messages, and web browser interactions to launch Solana Pay requests.

### Seed Vault

:::note
 The Seed Vault SDK is designed for usage by *wallet* apps. If you are building a regular dApp that interacts with the Solana network, you should just use Mobile Wallet Adapter for your usecase.
:::

The [**Seed Vault**](https://github.com/solana-mobile/seed-vault-sdk) is a system service providing secure key custody to Wallet apps. By integrating with secure execution environments available on mobile devices (such as secure operating modes of the processor and/or secure auxiliary coprocessors), Seed Vault helps to keep your secrets safe, by moving them to the highest privileged environment available on the device. Your keys, seeds, and secrets never leave the secure execution environment, while UI components built into Android handle interaction with the user to provide a secure transaction signing experience to users.

For Wallet apps, this SDK provides an API contract and support library for accessing the Seed Vault. It also includes a Seed Vault simulator, which can be installed on devices running Android 12. 

## Solana dApp Store

The [**Solana dApp Store**](https://github.com/solana-mobile/dapp-publishing#welcome-publishers) is an alternate app distribution system, well suited to distributing apps developed by the Solana ecosystem. It will provide a distribution channel for apps that want to establish direct relationships with their customers, without other app stores’ rules restricting the relationship or seeking a large revenue share. The goal of the Solana dApp Store is to empower the Solana community to eventually play a key role in managing the contents of this app store.

If you are interested in submitting your app to the Solana dApp Store, follow our [publishing guide](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md#welcome-publishers) to learn about our publishing process.


## Development community

#### Discord
Currently, most technical discussion around the Solana Mobile Stack happens in our offical [Solana Mobile Discord](https://discord.gg/solanamobile).
If you have any questions, are interested in contributing, or want to get in touch with the development community, come join and send a message!

#### Twitter

On Twitter, you can follow [@SolanaMobile](https://twitter.com/solanamobile).
