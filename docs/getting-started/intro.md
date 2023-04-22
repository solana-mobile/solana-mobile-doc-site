--- 
hide_table_of_contents: false
title: Solana Mobile Documentation
---

import CTAButton from "../../src/components/CTAButton"
import Card from "../../src/components/Card"
import SDKCard from "../../src/components/SDKCard"
import CardLayout from "../../src/layouts/CardLayout"

The **Solana Mobile Stack (SMS)** is an open source collection of libraries that provides key technologies for building Mobile dApps that can interact with the Solana network. This documentation site provides guides, tutorials, and references to help developers get started building on Solana.

The SDK is primarily developed and maintained by the [Solana Mobile](https://github.com/solana-mobile) team, but welcomes contributions from the community!

:::note
You don't need a Saga device or physical device to build on Solana Mobile. See [**prerequisite setup**](prerequisite_setup) to set up your development environment and start building!
:::

## Quickstart 
Learn to how to develop Solana Mobile dApps in your preferred programming language.

<CardLayout>
    <SDKCard
        to="/react-native/quickstart"
        header={{
            label: "React Native Quickstart",
            translateId: "developer-programs",
        }}
        body={{
            label: "Quickly set up a React Native project and start building on Solana Mobile with our Javascript SDKs.",
            translateId: "learn-programs",
        }}
        iconPath="img/react-native-96.svg"
    />
    <SDKCard
        to="/android-native/quickstart"
        header={{
            label: "Android Quickstart",
            translateId: "development-setup",
        }}
        body={{
            label: "Quickly set up an Android project and start building on Solana Mobile with our Android SDK.",
            translateId: "development-setup-body",
        }}
        iconPath="img/android_icon.svg"
    />
</CardLayout>
