import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# Kotlin Quickstart

A directory of code snippets, guides, and examples for basic use cases commonly used in Solana Kotlin dApps.

## Learn the core SDKs

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
