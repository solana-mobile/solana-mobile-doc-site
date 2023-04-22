--- 
title: Overview
---

## Building for the Solana Mobile Stack
Building for the Solana Mobile Stack is, at its core, building for Android. The SDK provides enabling libraries for wallets and apps, allowing developers to create rich mobile experiences for the Solana network. Whether you are developing a mobile-friendly web app, a React Native Android app, or a native mobile wallet app, these libraries, samples, and reference implementations will help you to use the Solana network on Android devices.

## What’s in the Solana Mobile Stack?

### Mobile Wallet Adapter

[**Mobile Wallet Adapter**](https://github.com/solana-mobile/mobile-wallet-adapter) is a protocol specification for connecting apps to Wallets on mobile devices. 

It allows Wallet apps to provide transaction signing services for different types of apps on mobile devices: both mobile-friendly web apps running in the browser, as well as native apps, whether built using React Native, or traditional Kotlin or Java apps. The protocol is not limited to Android devices either; it envisions similar support for iOS devices, as well as the capability of Wallet apps to provide signing services to applications running remotely, such as on other mobile devices, and on desktop or laptop computers.

While this protocol is first announced with the [**Saga**](https://solanamobile.com), it is designed to be implemented on any mobile device. With community support, this is intended to be the mobile analogue of [**wallet-adapter**](https://github.com/solana-labs/wallet-adapter).

The SDK includes the initial version of the Mobile Wallet Adapter protocol specification. It includes a reference implementation of the protocol for both wallets and apps, for local use cases.

### Solana dApp Store

The [**Solana dApp Store**](https://github.com/solana-mobile/dapp-publishing#welcome-publishers) is an alternate app distribution system, well suited to distributing apps developed by the Solana ecosystem. It will provide a distribution channel for apps that want to establish direct relationships with their customers, without other app stores’ rules restricting the relationship or seeking a large revenue share. The goal of the Solana dApp Store is to empower the Solana community to eventually play a key role in managing the contents of this app store.

If you are interested in submitting your app to the Solana dApp Store, follow our [**publishing guide**](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md#welcome-publishers) to learn about our publishing process.

### Solana Pay for Android

The [**Solana Pay protocol**](https://docs.solanapay.com/) was developed independently of the Solana Mobile Stack, but combining payments with a mobile device is a natural fit for Solana Pay. 

To assist developers in integrating Solana Pay, we’ve developed a [**reference implementation**](https://github.com/solana-mobile/solana-pay-android-sample) demonstrating how Wallet apps can use the system features of Android devices to capture Solana Pay URLs via QR codes, NFC taps, messages, and web browser interactions to launch Solana Pay requests.

### Seed Vault

The [**Seed Vault**](https://github.com/solana-mobile/seed-vault-sdk) is a system service providing secure key custody to Wallet apps. By integrating with secure execution environments available on mobile devices (such as secure operating modes of the processor and/or secure auxiliary coprocessors), Seed Vault helps to keep your secrets safe, by moving them to the highest privileged environment available on the device. Your keys, seeds, and secrets never leave the secure execution environment, while UI components built into Android handle interaction with the user to provide a secure transaction signing experience to users.

For Wallet apps, this SDK provides an API contract and support library for accessing the Seed Vault. It also includes a Seed Vault simulator, which can be installed on devices running Android 12. 

**Important note: this Seed Vault simulator does not provide secure transaction signing, and should not be used for any purposes other than development and testing of Wallet apps.**
