import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Kotlin Android Development

Kotlin is an [officially supported](https://developer.android.com/kotlin) programming language for Android development and is used to build native Android apps.

This section of the site provides a developer guide for building Kotlin Android apps for Solana.

## Quickstart

<CardLayout autoFitEnabled={true}>
    <Card
        to="/android-native/setup"
        header={{
            label: "Project Setup",
            translateId: "setup",
        }}
        body={{
            label: "Setup your Android project with the core Kotlin SDKs for Solana development.",
            translateId: "setup-body",
        }}
        iconPath="img/android_icon.svg"
    />
    <Card
        to="/android-native/quickstart"
        header={{
            label: "Jetpack Compose Starter App",
            translateId: "compose-scaffold-body",
        }}
        body={{
            label: "Clone the Jetpack Compose Scaffold app to quickly start developing.",
            translateId: "compose-scaffold",
        }}
        iconPath="img/jetpack-compose-icon.png"
    />
</CardLayout>

## Core Kotlin SDKs

Read these guides for a collection of code snippets and examples for basic use cases commonly used in Solana Kotlin dApps.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/android-native/making_rpc_requests"
        header={{
            label: "JSON RPC Requests",
            translateId: "rpc-requests",
        }}
        body={{
            label: "Learn the rpc-core library to create and send Solana RPC Requests.",
            translateId: "rpc-requests-body",
        }}
        emoji={"🌐"}
    />
    <Card
        to="/android-native/building_transactions"
        header={{
            label: "Transaction building",
            translateId: "transaction-building",
        }}
        body={{
            label: "Use the web3-core library to construct Solana transactions and Program instructions.",
            translateId: "transaction-building-body",
        }}
        emoji={"🔧"}
    />
    <Card
        to="/android-native/using_mobile_wallet_adapter"
        header={{
            label: "Mobile Wallet Adapter",
            translateId: "mobile-wallet-adapter",
        }}
        body={{
            label: "Learn how to connect to mobile wallets and request signing services.",
            translateId: "mobile-wallet-adapter-body",
        }}
        emoji={"📱"}
    />
</CardLayout>

## Benefits of native Android development

### Direct access to Android OS features

Developing on Android enables convenient and full access to the Android platform's capabilities. Developers can access OS-specific functionalities like Camera SDK, ARKit, Touch ID, hardware sensors, etc without needing any bridging.

### Optimized performance

Native Android apps, as a result of full utilization of the system capabilities, generally have better performance and efficiency. Native apps provide the highest attainable frame rates, computing power, graphics support, etc.

### Jetpack Compose

Kotlin enables the building of Android apps using [Jetpack Compose](https://developer.android.com/jetpack/compose/why-adopt), a modern toolkit for creating native Android UIs. The Kotlin sample apps
on this documentation site are all built with Jetpack Compose.
