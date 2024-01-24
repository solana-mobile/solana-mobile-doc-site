import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Kotlin Android Development

Kotlin is an [officially supported](https://developer.android.com/kotlin) programming language for Android development and is used to build native Android apps.

This section of the site provides a developer guide for building Kotlin Android apps for Solana.

## Quickstart guides

Read these guides for a collection of code snippets and examples for basic use cases commonly used in Solana Kotlin dApps.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/overview"
        header={{
            label: "JSON RPC Requests",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn the `rpc-core` library to create and send Solana RPC Requests.",
            translateId: "learn-programs",
        }}
        emoji={"🌐"}
    />
    <Card
        to="/android-native/overview"
        header={{
            label: "Transaction building",
            translateId: "development-setup",
        }}
        body={{
            label: "Use the web3-core library to construct Solana transactions and Program instructions.",
            translateId: "development-setup-body",
        }}
        emoji={"🔧"}
    />
    <Card
        to="/react-native/setup#solana-mobile-dapp-scaffold"
        header={{
            label: "Mobile Wallet Adapter",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn how to connect to mobile wallets and request signing services.",
            translateId: "learn-programs",
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
