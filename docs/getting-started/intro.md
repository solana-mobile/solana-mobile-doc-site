--- 
hide_table_of_contents: true
slug: /
---

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"


# Introduction

The [**Solana Mobile Stack**](https://github.com/solana-mobile) is an open source collection of libraries that provides key technologies for building high-quality, user friendly Android apps that can interact with the Solana network. The SDK provides libraries for wallets and apps, allowing developers to create rich mobile experiences for the Solana network with integrations for popular frameworks like Android Native and React Native. 

Get started by installing the Mobile Wallet Adapter SDK or following our Hello World Tutorial to learn the core concepts of building a mobile dApp.

:::note
You don't need a Saga device or physical device to build on Solana Mobile. See [**development setup**](getting-started/quickstart) to set up your development environment and start building!
:::

## Quickstart     
<CardLayout>
    <Card
        to="getting-started/quickstart"
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
        to="getting-started/hello_world_tutorial"
        header={{
            label: "Hello World Tutorial",
            translateId: "developer-programs",
        }}
        body={{
            label: "Learn how to write your first Solana Mobile app with our step-by-step tutorial.",
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