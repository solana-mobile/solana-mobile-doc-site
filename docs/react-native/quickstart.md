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

<Tabs>
<TabItem value="Expo dApp Template" label="Expo dApp Template">

<ExpoSnippet />

</TabItem>
<TabItem value="React Native dApp Scaffold" label="React Native dApp Scaffold">

<ReactNativeSnippet />

</TabItem>
</Tabs>
