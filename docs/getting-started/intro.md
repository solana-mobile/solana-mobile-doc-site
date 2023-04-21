--- 
hide_table_of_contents: true
---

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"


# Introduction

The [**Solana Mobile Stack**](https://github.com/solana-mobile) is an open source collection of libraries that provides key technologies for building high-quality, user friendly Android apps that can interact with the Solana network. The SDK provides libraries for wallets and apps, allowing developers to create rich mobile experiences for the Solana network with integrations for popular frameworks like Android Native and React Native. 

Get started by setting up your development environment and following the Hello World Tutorial to learn the core concepts of building a Solana Mobile dApp.

:::note
You don't need a Saga device or physical device to build on Solana Mobile. See [**development setup**](getting-started/development_setup) to set up your development environment and start building!
:::

## Quickstart     
<CardLayout>
    <Card
        to="development_setup"
        header={{
            label: "Setup Development",
            translateId: "development-setup",
        }}
        body={{
            label: "Quickly set up your Android device and integrate your app with Mobile Wallet Adapter.",
            translateId: "development-setup-body",
        }}
    />
    <Card
        to="hello_world_tutorial"
        header={{
            label: "Hello World React Native Tutorial",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn how to write your first Solana Mobile React Native app with a step-by-step tutorial.",
            translateId: "learn-programs",
        }}
    />
    <Card
        to="../sample-apps/sample_app_overview"
        header={{
            label: "Learn Through Example Apps",
            translateId: "sample-app-collection",
        }}
        body={{
            label: "Browse through and learn from our collection of sample apps.",
            translateId: "sample-app-collection-body",
        }}
    />

</CardLayout>
