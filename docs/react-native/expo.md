# Expo dApp Setup

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Expo?

[Expo](https://expo.dev/) is a popular open-source platform that simplifies the development, building, and deployment process for React Native applications. Expo apps have their own managed development flow with Expo Go, and utilizes the Expo SDK.

## Expo Development for Solana Mobile

The React Native resources, guides, and tutorials for Solana Mobile development **are all applicable for Expo as well**! After the initial setup, the development of an Expo app and a React Native app are very similar.

### Custom Development Build

The traditional [Expo Go](https://github.com/expo/fyi/blob/main/whats-in-the-sdk.md) development flow is only limited to certain hand-picked modules and does not support further customized native code, which Solana Mobile SDKs need.

Instead, we'll need to use a [custom development build](https://docs.expo.dev/develop/development-builds/create-a-build) which makes Solana Mobile React Native libraries (i.e Mobile Wallet Adapter) fully compatible with Expo.

## Expo dApp Template

The quickest option to get started with Expo development is using the [Solana Mobile Expo dApp Template](/react-native/expo-dapp-template). Run a single command to download and initialize a Solana Expo dApp with pre-installed libraries and UI components.

Follow the [guide](/react-native/expo-dapp-template) to learn how to initialize and run the template.

## Manual Installation

If you want to create a new Expo project from scratch then follow these steps. If you want to integrate an existing project with the SDK, then skip to [installing the dependencies](#step-2-install-dependencies).

As a prerequisite, follow the [React Native official documentation](https://reactnative.dev/docs/environment-setup) and set up your environment for Android.

#### Step 1: Initialize a new Expo project

```shell
npx create-expo-app
```

Enter your app project name then move into the newly generated folder.

#### Step 2: Install dependencies

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  react-native-get-random-values \
  buffer
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  react-native-get-random-values \
  buffer
```

</TabItem>
</Tabs>

<details>
<summary>A brief overview of each dependency:</summary>

- `@solana-mobile/mobile-wallet-adapter-protocol`: A React Native/Javascript API enabling interaction with MWA-compatible wallets.
- `@solana-mobile/mobile-wallet-adapter-protocol-web3js`: A convenience wrapper to use common primitives from [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) – such as `Transaction` and `Uint8Array`.
- `@solana/web3.js`: Solana Web Library for interacting with Solana network through the [JSON RPC API](https://docs.solana.com/api/http).
- `react-native-get-random-values` Secure random number generator polyfill for `web3.js` underlying Crypto library on React Native.
- `buffer` Buffer polyfill also needed for `web3.js` on React Native.

</details>

#### Step 3: Update App.js with polyfills

To load the polyfills, we open the entrypoint file (`App.js`/`App.tsx`) in the root of the project and add the following two lines to the top of the file:

```javascript
import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;
```

#### Step 4: Run the app on device/emulator

Make sure your device/emulator is set up by following the [official React Native documentation](https://reactnative.dev/docs/running-on-device).

In your project folder run:

```
npx react-native run-android
```

The Metro Bundler terminal UI will pop up then select the Android option. Your app should build and launch on your emulator.
