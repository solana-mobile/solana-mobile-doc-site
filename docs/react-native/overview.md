import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

# React Native

[**React Native**](https://reactnative.dev/docs/getting-started) is a popular development framework for creating mobile apps using React and Javascript.

This section of the site provides a developer guide for building React Native Android apps for Solana.

## Quickstart

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/setup"
        header={{
            label: "Project Setup",
            translateId: "setup",
        }}
        body={{
            label: "Setup your React Native project with the mobile SDKs for Solana development.",
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
            label: "Build off the React Native Scaffold app to quickly start developing.",
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
            label: "For a simplified React Native development process, build a Solana dApp with the Expo platform.",
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
            label: "Quickly start an Expo project by initializing with the Solana Expo dApp Template.",
            translateId: "compose-scaffold",
        }}
        iconPath="img/expo-snack-icon.svg"
    />
</CardLayout>

## Core React Native SDKs

Read these guides for a collection of code snippets and examples for common use cases in Solana React Native dApps.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/making_rpc_requests"
        header={{
            label: "JSON RPC Requests",
            translateId: "rpc-requests",
        }}
        body={{
            label: "Use web3.js `Connection` class to create and send Solana RPC Requests.",
            translateId: "rpc-requests-body",
        }}
        emoji={"🌐"}
    />
    <Card
        to="/react-native/building_transactions"
        header={{
            label: "Transaction building",
            translateId: "transaction-building",
        }}
        body={{
            label: "Use the web3.js library to construct Solana transactions and Program instructions.",
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
            label: "Learn how to connect to mobile wallets and request signing services.",
            translateId: "mobile-wallet-adapter-body",
        }}
        emoji={"📱"}
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

Follow this [guide](/react-native/expo) to set up your Expo project.
