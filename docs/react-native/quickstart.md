import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Native Quickstart

This quickstart guide will cover:
- An overview of Solana Mobile's React Native SDK.
- How to clone and run our React Native dApp Scaffold.
- How to install the SDK into a React Native project.

## Overview

The Solana Mobile SDK provides a [React Native package](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) that implements the Mobile Wallet Adapter protocol and [a wrapper package](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js) for easier integration with [@solana/web3.js](https://github.com/solana-labs/solana-web3.js).

Developing with the React Native SDK will be familiar for developers that already have experience building Solana Web dApps. 

You can continue using well supported and useful Solana web libraries like [`@solana/web3.js`](https://github.com/solana-labs/solana-web3.js/) and [`@solana/wallet-adapter-react`](https://github.com/solana-labs/wallet-adapter`).

## React Native Project Setup

### Prerequisites

Follow the [prerequisite setup](../getting-started/prerequisite_setup#install-a-wallet-app) guide to set up your [Android Device/Emulator](../getting-started/prerequisite_setup#android-deviceemulator) and install a MWA-compatible wallet, like [fakewallet](../getting-started/prerequisite_setup#install-a-wallet-app).

### Clone Solana Mobile dApp Scaffold

The fastest way to start building React Native on Solana is cloning our [Solana Mobile React Native dApp Scaffold](https://github.com/solana-mobile/SolanaMobileDAppScaffold):

```shell
git clone https://github.com/solana-mobile/SolanaMobileDAppScaffold.git
```

The scaffold is a ready-to-go React Native dApp that comes with:
- The Mobile Wallet Adapter JS SDK and `@solana/web3.js`.
- Required polyfills like `react-native-get-random-values` and `react-native-url-polyfill` installed.
- Wallet authorization/connecting and airdrop request functionality.
- Premade React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `AccountInfoComponent`.


### Setting up a new React Native project

If you want to create a new React Native project from scratch then follow these steps. If you want to integrate an existing project with the SDK, then skip to [installing the dependencies](#step-2-install-dependencies).

As a prerequisite, follow the [React Native official documentation](https://reactnative.dev/docs/environment-setup) and set up your environment for Android.

#### Step 1: Initialize a new React Native project

```shell
npx react-native@latest init MySolanaMobileDapp
cd MySolanaMobileDapp
```

#### Step 2: Install dependencies

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  @solana/wallet-adapter-react \
  react-native-get-random-values \
  react-native-url-polyfill
```

</TabItem>
<TabItem value="npm" label="npm">


```shell
npm install \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  @solana/wallet-adapter-react \
  react-native-get-random-values \
  react-native-url-polyfill
```

</TabItem>
</Tabs>

<details>
<summary>A brief overview of each dependency:</summary>

- `@solana-mobile/mobile-wallet-adapter-protocol`: A React Native/Javascript API enabling interaction with MWA-compatible wallets.
- `@solana-mobile/mobile-wallet-adapter-protocol-web3js`: A convenience wrapper to use common primitives from [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) – such as `Transaction` and `Uint8Array`.
- `@solana/web3.js`: Solana Web Library for interacting with Solana network through the [JSON RPC API](https://docs.solana.com/api/http).
- `@solana/wallet-adapter-react`: Solana Web Library where we can re-use certain React components/hooks like `ConnectionProvider`.
- `react-native-get-random-values` Secure random number generator polyfil for `web3.js` underlying Crypto library. 
- `react-native-url-polyfill`: Polyfill for React Native's missing `URL` class.

</details>


#### Step 3: Update index.js

To load the polyfills, we open the file index.js in the root of the project and add the following two lines to the top of the file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

#### Step 4: Run the app on device/emulator

Make sure your device/emulator is set up by following the [official React Native documentation](https://reactnative.dev/docs/running-on-device). 

In your project folder run:
```
npx react-native start
```
The Metro Bundler terminal UI will pop up then select the Android option. Your app should build and launch on your emulator. 


## Next Steps

Congrats! At this point, your React Native project is set up and running with all the dependencies to build a Solana Mobile dApp!

You can follow the [React Native Hello World Tutorial](../react-native/hello_world_tutorial.md) to see how to write components that can connect to the Solana network and record a message on the blockchain.


