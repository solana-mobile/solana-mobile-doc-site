---
title: Solana Mobile Stack Overview
displayed_sidebar: documentationSidebar
---

## What's in the Solana Mobile Stack?

The **Solana Mobile Stack (SMS)** is a collection of key technologies for building mobile applications that can interact with the Solana blockchain.

Read on to learn about the core technologies of the stack and how each fit into the web3 mobile landscape.

## Mobile Wallet Adapter

[**Mobile Wallet Adapter (MWA)**](https://github.com/solana-mobile/mobile-wallet-adapter) is a protocol specification for connecting mobile dApps to mobile Wallet Apps,
enabling communication for Solana transaction and message signing.

dApps that implement MWA are able to connect to [any compatible MWA Wallet App](https://solanamobile.com/wallets) and request authorization, signing, and sending for transactions/messges.

**Why this is important**: Developers no longer need to build in support for each individual wallet, and instead can just integrate once and use a single unified API to be compatible with every compliant Solana wallet!

### Supported Platforms

| Mobile Platform                            | Is MWA Supported? | Notes                                                                 |
| ------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Android                                    | ✅                | Full support for dApps and Wallet apps.                               |
| Mobile Web - Chrome (Android)              | ✅                | Automatic integration if using `@solana/wallet-adapter-react`.        |
| iOS                                        | ❌                | MWA is not currently available for any iOS platform (app or browser). |
| Mobile Web - Safari, Firefox, Opera, Brave | ❌                | These browsers currently do not support MWA on Android (or iOS).      |

### Using the SDK

Solana Mobile maintains an official [Mobile Wallet Adapter SDK](https://github.com/solana-mobile/mobile-wallet-adapter) that implements the protocol, originally written as a Android Kotlin/Java library.

The SDK is also ported other frameworks and is available for:

- React Native
- Flutter
- Unity
- Unreal Engine

Explore the _Development_ section of the site to learn how to integrate the MWA SDK into the framework of your choice.

### Deep dive learning

Fundamentally, MWA is a generic protocol specification for connecting dApps to Wallets. The protocol is not limited to Android devices either; it envisions similar support for iOS devices, as well as the capability of Wallet apps to provide signing services to applications running remotely, such as on other mobile devices, and on desktop or laptop computers.

If interested, you can deep dive into the protocol [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

### Wallet Apps

If you're developing a MWA-compatible wallet app, see the [`walletlib`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib) Android Library that implements the wallet side of the MWA protocol. Most of the resources on this website are geared towards dApp developers, rather than Wallet developers, so if you have more questions, get in touch with the team directly for support on [Discord](https://discord.com/invite/solanamobile).

### Migrating to MWA 2.0

Check out the [2.0 migration guide](../mwa/migration/overview.md) to migrate from 1.x vresion of Mobile Wallet Adapter to the latest version. 

## Seed Vault

The [**Seed Vault**](https://github.com/solana-mobile/seed-vault-sdk) is a system service providing secure key custody to _Wallet apps_. By integrating with secure execution environments available on mobile devices (such as secure operating modes of the processor and/or secure auxiliary coprocessors), Seed Vault helps to keep your secrets safe, by moving them to the highest privileged environment available on the device. Your keys, seeds, and secrets never leave the secure execution environment, while UI components built into Android handle interaction with the user to provide a secure transaction signing experience to users.

### Using the SDK

#### For dApps

The Seed Vault SDK is designed for usage by _wallet_ apps. If you are building a mobile dApp, you should just use Mobile Wallet Adapter for your usecase.

#### For Wallet Apps

To integrate and provide Seed Vault custody in a wallet app, follow this [integration guide](https://github.com/solana-mobile/seed-vault-sdk/blob/main/docs/integration_guide.md) for a deep dive into the SDK. The repo includes a Seed vault simulator, which can be used to simulate and test for Saga Seed Vault integration on emulators.

## Solana dApp Store

The [**Solana dApp Store**](https://github.com/solana-mobile/dapp-publishing#welcome-publishers) is an alternate app distribution system, well suited to distributing apps developed by the Solana ecosystem.

It will provide a distribution channel for apps that want to establish direct relationships with their customers, without other app stores’ rules restricting the relationship or seeking a large revenue share. The goal of the Solana dApp Store is to empower the Solana community to eventually play a key role in managing the contents of this app store.

If you are interested in submitting your app to the Solana dApp Store, follow our [publishing guide](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md#welcome-publishers) to learn about our publishing process.

## Other SDKs

### Solana Pay for Android

The [**Solana Pay protocol**](https://docs.solanapay.com/) was developed independently of the Solana Mobile Stack, but combining payments with a mobile device is a natural fit for Solana Pay.

To assist developers in integrating Solana Pay, we’ve developed a [**reference implementation**](https://github.com/solana-mobile/solana-pay-android-sample) demonstrating how Wallet apps can use the system features of Android devices to capture Solana Pay URLs via QR codes, NFC taps, messages, and web browser interactions to launch Solana Pay requests.

## Development community

#### Discord

Currently, most technical discussion around the Solana Mobile Stack happens in our offical [Solana Mobile Discord](https://discord.gg/solanamobile).
If you have any questions, are interested in contributing, or want to get in touch with the development community, come join and send a message!

#### Twitter

On Twitter, you can follow [@SolanaMobile](https://twitter.com/solanamobile).
