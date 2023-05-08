--- 
title: Overview
---

## What's in the Solana Mobile Stack?

The **Solana Mobile Stack (SMS)** is an open source collection of libraries that provide key technologies for building Mobile dApps that can interact with the Solana network. 
The SDK allows developers to create rich mobile experiences and seamless UX for Solana users. 

Read on to learn more about supported platforms and a explanation of each component in the Solana Mobile Stack.

:::note
You don't need a Saga device or physical device to build on Solana Mobile. See [**prerequisite setup**](quickstart#prerequisite-setup) to set up your development environment and start building!
:::

### Mobile Wallet Adapter

[**Mobile Wallet Adapter (MWA)**](https://github.com/solana-mobile/mobile-wallet-adapter) is the core enabling technology and first step in building a Solana Mobile dApp. For those familiar with Solana Web libraries, MWA is intended to be a mobile analogue of [wallet-adapter](https://github.com/solana-labs/wallet-adapter).

MWA is a protocol specification for connecting apps to Wallets on mobile devices. For dApp developers, MWA allows your app to connect to MWA-compatible wallet apps, like Phantom and Solflare and receive transaction signing services on mobile devices. 

If interested, you can deep-dive into the MWA protocol [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

Solana Mobile has created MWA libraries for developers interested in using [React Native](/react-native/quickstart) or traditional [Android](/android-native/quickstart) development with Kotlin or Java. There is also an MWA [Flutter SDK](additional-sdks/flutter_sdk) maintained by the Espresso Cash team.

### Supported platforms
#### Android

The [Mobile Wallet Adapter](#mobile-wallet-adapter) protocol is fully supported and implemented for Android devices, allowing for cross communication between Android dApps and Android Wallet apps. To build on Android, MWA has a React Native SDK and a native Android SDK.


#### Web

Solana Web dApps are already integrated with Mobile Wallet Adapter, as long as they are already using the `@solana/wallet-adapter-react` library. This library automatically uses the Mobile Wallet Adapter plugin and enables it, when running in a compatible mobile environment. 

#### iOS

Currently, Mobile Wallet Adapter protocol has no implementation for iOS devices. The MWA protocol was designed and envisioned to support multi-platform, including iOS, so iOS support is a work in progress and in future direction, there are plans to add iOS-specific protocol details to the Mobile Wallet Adapter Specification.

## Other SDKs

### Solana Pay for Android

The [**Solana Pay protocol**](https://docs.solanapay.com/) was developed independently of the Solana Mobile Stack, but combining payments with a mobile device is a natural fit for Solana Pay. 

To assist developers in integrating Solana Pay, we’ve developed a [**reference implementation**](https://github.com/solana-mobile/solana-pay-android-sample) demonstrating how Wallet apps can use the system features of Android devices to capture Solana Pay URLs via QR codes, NFC taps, messages, and web browser interactions to launch Solana Pay requests.

### Seed Vault

:::note
 The Seed Vault SDK is designed for usage by *wallet* apps. If you are building a regular dApp that interacts with the Solana network, you should just use Mobile Wallet Adapter.
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
