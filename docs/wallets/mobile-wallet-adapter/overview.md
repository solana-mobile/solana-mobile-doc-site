# Mobile Wallet Adapter 

import Card from "@site/src/components/Card"
import CardLayout from "@site/src/layouts/CardLayout"

## Wallet Library 

This library provides an implementation for the [*Wallet* endpoint](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#terminology) of the Mobile Wallet Adapter (MWA) protocol. This library is intended for wallet developers to consume.

### Features

- Configures your wallet app to handle dApp connection requests.
- Enables session establishment from both mobile dApps and web dApps on the mobile browser.
- Provides a framework for handling wallet operations like transaction signing and account access.

:::tip
If you are building an application that needs to connect to wallets, you should instead refer to the [Mobile Wallet Adapter Client Library](/developers/mobile-wallet-adapter#using-the-sdk).
:::

## Integration guide

View the integration guide for a comprehensive tutorial on how to support the Mobile Wallet Adapter protocol in
your wallet app.


<CardLayout autoFitEnabled={true}>
    <Card
        to="/wallets/mobile-wallet-adapter/integration"
        header={{
            label: "Kotlin SDK",
            translateId: "seed-vault",
        }}
        body={{
            label: "Integrate Mobile Wallet Adapter with the Kotlin SDK.",
            translateId: "seed-vault-body",
        }}
        iconPath="img/jetpack-compose-icon.png"
    />
    <Card
        to="/wallets/mobile-wallet-adapter/integration"
        header={{
            label: "React Native SDK",
            translateId: "seed-vault",
        }}
        body={{
            label: "Integrate Mobile Wallet Adapter with the React Native SDK.",
            translateId: "seed-vault-body",
        }}
        iconPath="img/jetpack-compose-icon.png"
    />
</CardLayout>

## Mobile Wallet Adapter 2.0

Mobile Wallet Adapter 2.0 is an updated [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html) of the protocol that supports new features and capabilities and also addresses feedback from dApps and wallets using the protocol. 

The spec, along with the SDK, aims to be backwards compatible with Mobile Wallet Adapter 1.0 (legacy).

### New Features

- A dedicated Sign-in-with-Solana (SIWS) API for both native dApps and mobile web dApps.
- An extensible Feature Extensions API that enables customized wallet requests and features.
- Support for multi-account authorization, chain agnostic identifiers, and QOL changes.

If your wallet is using a legacy version of Mobile Wallet Adapter protocol, view the guide below to update to a version that supports the Mobile Wallet Adapter 2.0 specification.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/wallets/mobile-wallet-adapter/integration"
        header={{
            label: "Upgrade to Mobile Wallet Adapter 2.0",
            translateId: "seed-vault",
        }}
        body={{
            label: "Upgrade your wallet app's Mobile Wallet Adapter SDK to a version supporting the MWA 2.0 spec",
            translateId: "seed-vault-body",
        }}
        iconPath="img/jetpack-compose-icon.png"
    />
</CardLayout>