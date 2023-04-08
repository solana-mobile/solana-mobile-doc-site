---
title: Introduction
---

### Mobile Wallet Adapter
https://github.com/solana-mobile/mobile-wallet-adapter

Mobile Wallet Adapter is a protocol specification for connecting apps to Wallets on mobile devices. It allows Wallet apps to provide transaction signing services for different types of apps on mobile devices: both mobile-friendly web apps running in the browser, as well as native apps, whether built using React Native, or traditional Kotlin or Java apps. The protocol is not limited to Android devices either; it envisions similar support for iOS devices, as well as the capability of Wallet apps to provide signing services to applications running remotely, such as on other mobile devices, and on desktop or laptop computers.

This SDK includes a draft version of the Mobile Wallet Adapter protocol specification, which will be completed in the coming weeks in collaboration with the open-source Solana community. It includes a reference implementation of the protocol for both wallets and apps, for local use cases.

While this protocol is first announced with the [Saga](https://solanamobile.com), it is designed to be implemented on any mobile device. With community support, this is intended to be the mobile analogue of [wallet-adapter](https://github.com/solana-labs/wallet-adapter).