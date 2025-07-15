---
displayed_sidebar: reactNativeSidebar
---

import Card2 from "../../src/components/Card2"
import CardLayout from "../../src/layouts/CardLayout"

# React Native

[**React Native**](https://reactnative.dev/docs/getting-started) is a popular development framework for creating mobile apps using React and Javascript.

This section of the site provides a developer guide for building React Native Android apps for Solana Mobile.

## Getting Started

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/react-native/quickstart"
        header={{
            label: "Create a project",
            translateId: "create",
        }}
        body={{
            label: "Create a React Native project for Solana Mobile development.",
            translateId: "create-body",
        }}
        iconPath="img/rocket-icon2.png"
    />
    <Card2
        to="/react-native/setup"
        header={{
            label: "Environment Setup",
            translateId: "env-setup-body",
        }}
        body={{
            label: "Setup your development environment for React Native.",
            translateId: "env-setup",
        }}
        iconPath="img/react-native-32.svg"
    />
</CardLayout>

## Cookbook

Read these guides for a collection of code snippets and examples for common use cases in Solana React Native dApps.

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/react-native/using_mobile_wallet_adapter"
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
    <Card2
        to="/react-native/making_rpc_requests"
        header={{
            label: "JSON RPC Requests",
            translateId: "rpc-requests",
        }}
        body={{
            label: "Use the web3.js library class to create and send Solana RPC Requests.",
            translateId: "rpc-requests-body",
        }}
        emoji={"🌐"}
    />
    <Card2
        to="/react-native/building_transactions"
        header={{
            label: "Transaction building",
            translateId: "transaction-building",
        }}
        body={{
            label: "Use the web3.js library to construct Solana transactions.",
            translateId: "transaction-building-body",
        }}
        emoji={"🔧"}
    />
</CardLayout>

## Why React Native?

[**React Native**](https://reactnative.dev/docs/getting-started) is a popular development framework for creating mobile apps using React and Javascript. This section goes over the benefits of React Native and why you might choose it to build your mobile app.

### Code Reusability

Solana developers can continue using popular, well-supported Solana web libraries like `@solana/web3.js` and leverage their existing code in a React Native project. Developers familiar with Solana Web development will find this their quickest option to start building.

### Familiarity

Developers familiar with React development will be able to leverage their existing knowledge and translate it to building mobile apps. Just like React development on web, React Native supports live and hot reloading, which significantly speeds up the development process.

## Expo?

[**Expo**](https://docs.expo.dev/) is a popular platform that simplifies the development and deployment process for React Native projects, with the tradeoff of stricter customization of native code.

To use Expo with the MWA libraries, you'll need to follow an alternate Expo development flow, called a [custom Expo Development build](https://docs.expo.dev/develop/development-builds/create-a-build/).

