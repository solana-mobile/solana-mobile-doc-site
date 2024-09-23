---
hide_table_of_contents: false
title: Introduction
---

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

Welcome to the **Solana Mobile Documentation** site!

The documentation site serves as a comprehensive knowledge center for developers that want to build with the **Solana Mobile Stack (SMS)**.

Here, you can find an excellent collection of guides, tutorials, and references aimed at assisting developers as they build Web3 mobile dApps.
In addition, there are also resources for developers wanting to publish on the [Solana dApp Store](/dapp-publishing/intro).

These resources are actively maintained by the [Solana Mobile](https://github.com/solana-mobile) team, but welcomes [contributions from the community](https://github.com/solana-mobile/solana-mobile-doc-site)!

:::note
You don't need a Saga device or physical device to start developing. The stack is compatible with any Android device. See [**prerequisite setup**](development-setup) to set up your development environment and start building!
:::

## Quickstart

Learn how to develop Solana Mobile dApps in your preferred programming language.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/overview"
        header={{
            label: "React Native",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn about the React Native SDKs and how to quickly start building on Solana Mobile.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="/android-native/overview"
        header={{
            label: "Kotlin",
            translateId: "development-setup",
        }}
        body={{
            label: "Learn how to build a native Android app using the core Solana Kotlin SDKs.",
            translateId: "development-setup-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/dapp-publishing/publishing-a-pwa"
        header={{
            label: "Progressive Web Apps (PWAs)",
            translateId: "Progressive Web Apps (PWAs)",
        }}
        body={{
            label: "Learn how to convert a PWA to an Android app and publish on the dApp Store.",
            translateId: "Progressive Web Apps (PWAs)",
        }}
        iconPath="img/pwa-icon.png"
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

Learn about the Solana dApp Store or explore the libraries within the Solana Mobile SDK.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/dapp-publishing/intro"
        header={{
            label: "dApp Store",
            translateId: "dapp-store-card-header",
        }}
        body={{
            label: "Learn about the dApp Store and how to publish your app.",
            translateId: "dapp-store-card-body",
        }}
        emoji="📱"
    />
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
</CardLayout>
