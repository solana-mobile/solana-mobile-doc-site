--- 
title: Your first React Native dApp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial, you'll learn how to build a React Native dApp that sends a message to the Solana network.

## What you will learn
- How to use [**Mobile Wallet Adapter**](/getting-started/overview#mobile-wallet-adapter) to connect to an installed wallet app.
- How to connect to devnet, check your wallet balance, and request an airdrop of SOL.
- How to use the memo program to write your message to the network
- View your message on the [Solana Explorer](https://explorer.solana.com/)!

## Prerequisites
Read the [prerequisite setup](../getting-started/quickstart) guide before starting the tutorial. 
You'll need:
- a running Android emulator or device to build and launch your app.
- an MWA-compatible wallet installed on the same device.
- an IDE/Editor of your choice.


This tutorial will be using the [fakewallet](../getting-started/quickstart#install-test-wallet-app) app to test your app's integration with Mobile Wallet Adapter.


## Clone the React Native dApp Scaffold

This dApp will build off the **[React Native Scaffold dApp](/react-native/setup#clone-solana-mobile-dapp-scaffold)** which already has a simple user interface that allows you to connect to a mobile wallet, request an airdrop, and sign transactions. 

#### Step 1. In your terminal, clone the repo.

```shell
git clone https://github.com/solana-mobile/SolanaMobileDAppScaffold.git
```

#### Step 2. Enter the directory and install the project dependencies.

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
cd SolanaMobileDAppScaffold && yarn install 
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
cd SolanaMobileDAppScaffold && npm install 
```

</TabItem>
</Tabs>

#### Step 3. Make sure your emulator/device is running, then build and launch the app.

```shell
npx react-native run-android
```

### First run

At this point, your app should build, install into your device, and launch automatically. 
You should also see the Metro Bundler console window pop up. This is where you can read the logs and access the debug menu.

With React Native's *fast refresh* feature, you can edit the React components, save your changes, and immediately see your app UI update!

## Scaffold dApp Components

Now lets quickly go over the features of the dApp Scaffold.

### Connect Button
Clicking on the *Connect Wallet* button will 'connect' you to a locally installed MWA-compatible wallet. It uses the Mobile Wallet Adapter 
SDK to request [`authorization`](/react-native/quickstart#authorizing-a-wallet) from the wallet and receives your wallet account's info, like the public key.

### Account Info

### Airdrop Button


