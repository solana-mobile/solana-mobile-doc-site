--- 
hide_table_of_contents: false
title: Solana Mobile Documentation
---

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

The **Solana Mobile Stack (SMS)** is an open source collection of libraries that provides key technologies for building Mobile dApps that can interact with the Solana network. This documentation site provides guides, tutorials, and references to help developers get started with building on Solana Mobile.

The SDK is primarily developed and maintained by the [Solana Mobile](https://github.com/solana-mobile) team, but welcomes contributions from the community!

:::note
You don't need a Saga device or physical device to build on Solana Mobile. The stack is compatible with any Android device. See [**prerequisite setup**](development-setup) to set up your development environment and start building!
:::

## Quickstart 
Learn how to develop Solana Mobile dApps in your preferred programming language.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/overview"
        header={{
            label: "React Native SDK",
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
            label: "Android SDK",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn how to build on native Android and build an app with full Android capabilities.",
            translateId: "development-setup-body",
        }}
        iconPath="img/android_icon.svg"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/quickstart#solana-mobile-dapp-scaffold"
        header={{
            label: "React Native Template dApp",
            translateId: "developer-programs",
        }}
        body={{
            label: "Jump into building with our template React Native dApp.",
            translateId: "learn-programs",
        }}
        iconPath="img/rocket-icon2.png"
    />
    <Card
        to="/sample-apps/sample_app_overview"
        header={{
            label: "Sample Apps",
            translateId: "development-setup",
        }}
        body={{
            label: "Reference our collection of sample apps that use the Solana Mobile Stack.",
            translateId: "development-setup-body",
        }}
        iconPath="img/bookshelf-circle-icon.png"
    />
</CardLayout>

## Learn about Solana Mobile

Explore the full Solana Mobile SDK or learn about the Solana blockchain itself.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/getting-started/overview"
        header={{
            label: "SDK Overview",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn about the different libraries and tools provided by the Solana Mobile Stack.",
            translateId: "learn-programs",
        }}
        iconPath="img/solana-mobile-stack-logo.png"
    />
    <Card
        to="https://docs.solana.com/introduction"
        header={{
            label: "Solana Core Documentation",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn about the history and core concepts of the Solana Blockchain.",
            translateId: "development-setup-body",
        }}
        iconPath="img/solanaLogoMark.svg"
    />
</CardLayout>