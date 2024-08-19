import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# React Native

[**React Native**](https://reactnative.dev/docs/getting-started) is a widely-used framework for building mobile applications with React and JavaScript.

This section provides a comprehensive guide for developers creating React Native Android apps on the Solana platform.

## Quickstart

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/setup"
        header={{
            label: "Project Setup",
            translateId: "setup",
        }}
        body={{
            label: "Get your React Native project up and running with Solana's mobile SDKs.",
            translateId: "setup-body",
        }}
        iconPath="img/react-native-32.svg"
    />
    <Card
        to="https://github.com/solana-mobile/solana-mobile-dapp-scaffold"
        header={{
            label: "React Native Scaffold App",
            translateId: "compose-scaffold-body",
        }}
        body={{
            label: "Start developing quickly by using the React Native Scaffold app.",
            translateId: "compose-scaffold",
        }}
        iconPath="img/rocket-icon2.png"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/expo"
        header={{
            label: "Expo Development",
            translateId: "setup",
        }}
        body={{
            label: "Simplify your development process by building a Solana dApp with the Expo platform.",
            translateId: "setup-body",
        }}
        iconPath="img/expo-sdk-icon.svg"
    />
    <Card
        to="/react-native/quickstart"
        header={{
            label: "Expo dApp Template",
            translateId: "compose-scaffold-body",
        }}
        body={{
            label: "Quickly start an Expo project using the Solana Expo dApp Template.",
            translateId: "compose-scaffold",
        }}
        iconPath="img/expo-snack-icon.svg"
    />
</CardLayout>

## Core React Native SDKs

Explore these guides for code snippets and examples tailored to common use cases in Solana React Native dApps.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/making_rpc_requests"
        header={{
            label: "JSON RPC Requests",
            translateId: "rpc-requests",
        }}
        body={{
            label: "Learn how to use the web3.js `Connection` class to create and send Solana RPC requests.",
            translateId: "rpc-requests-body",
        }}
        emoji={"🌐"}
    />
    <Card
        to="/react-native/building_transactions"
        header={{
            label: "Transaction Building",
            translateId: "transaction-building",
        }}
        body={{
            label: "Construct Solana transactions and program instructions using the web3.js library.",
            translateId: "transaction-building-body",
        }}
        emoji={"🔧"}
    />
    <Card
        to="/react-native/using_mobile_wallet_adapter"
        header={{
            label: "Mobile Wallet Adapter",
            translateId: "mobile-wallet-adapter",
        }}
        body={{
            label: "Connect to mobile wallets and request signing services with the Mobile Wallet Adapter.",
            translateId: "mobile-wallet-adapter-body",
        }}
        emoji={"📱"}
    />
</CardLayout>

## Why Choose React Native?

[**React Native**](https://reactnative.dev/docs/getting-started) is an ideal framework for building mobile apps with React and JavaScript. This section highlights the advantages of using React Native for your mobile app development.

### Code Reusability

Solana developers can leverage existing web libraries like `@solana/web3.js` and reuse code in React Native projects. If you're familiar with Solana Web development, React Native offers the fastest path to building your mobile app.

### Familiarity

React developers can easily apply their existing skills to mobile app development. React Native supports live and hot reloading, which speeds up the development process just like it does in web development.

## What About Expo?

[**Expo**](https://docs.expo.dev/) is a popular platform that streamlines the development and deployment of React Native projects, though it offers less flexibility in customizing native code. To use Expo with Mobile Wallet Adapter (MWA) libraries, you'll need to follow a [custom Expo Development build](https://docs.expo.dev/develop/development-builds/create-a-build/).

Refer to this [guide](/react-native/expo) to set up your Expo project.
