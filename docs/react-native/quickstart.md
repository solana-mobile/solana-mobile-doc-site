import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"
import ImageRow from "../../src/components/ImageRow"
import BuildRunImage from "../../static/kotlin_images/compose-build-run.png";

import ExpoSnippet from './\_snippets/expo-dapp-template-snippet.mdx';
import ReactNativeSnippet from './\_snippets/react-native-scaffold-snippet.mdx';

# React Native Quickstart

The quickest way to start building Solana React Native dApps is to build off a starter template.

There are two starter templates for React Native:

- Expo dApp Template
- React Native dApp Scaffold

:::tip
Expo is a development platform that simplifies the development, building, and deployment process for React Native. Read about
the advantages of developing with Expo [here](react-native/expo).
:::

## Quickstart Scaffolds

<Tabs>
<TabItem value="Expo dApp Template" label="Expo dApp Template">

<ExpoSnippet />

</TabItem>
<TabItem value="React Native dApp Scaffold" label="React Native dApp Scaffold">

<ReactNativeSnippet />

</TabItem>
</Tabs>

## Further learning

To learn how to better use the core Solana React Native SDKs, check out these developer guides.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/making_rpc_requests"
        header={{
            label: "JSON RPC Requests",
            translateId: "rpc-requests",
        }}
        body={{
            label: "Learn to connect to an RPC endpoint and send JSON RPC Requests to the network.",
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
            label: "Use the Solana `web3.js` Javascript library to construct Solana transactions and instructions.",
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
