# Solana Expo dApp Template

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

This template is a ready-to-go Expo dApp that offers:

- Pre-installed standard SDKs like Mobile Wallet Adapter and `@solana/web3.js`
- Required polyfills like `react-native-get-random-values` and `Buffer` installed.
- Simple React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `SignMessageButton`.

<CTAButton label="View on GitHub" to="https://github.com/solana-mobile/solana-mobile-expo-template" />

## Prerequisites

- An [Expo](https://expo.dev/) account.
- React Native and Android Envrionment [setup](https://docs.solanamobile.com/getting-started/development-setup)
  - An Android device/emulator.
  - Install an MWA compliant wallet app on your device/emulator.

## Usage

### Initialization

Initialize the template using Expo's CLI tool:

```
yarn create expo-app --template @solana-mobile/solana-mobile-expo-template
```

:::info
The Expo CLI has issues when using other package managers like `npm`, `npx` or `pnpm`. Until fixed, use `yarn` to initialize
the template app.  
:::

Choose your project name then navigate into the directory.

### Build and run the app

Follow the **["Running the app"](/react-native/expo#running-the-app)** section in the Expo Setup guide to launch the template as a custom development build.

## Troubleshooting

`The package 'solana-mobile-wallet-adapter-protocol' doesn't seem to be linked.`

- Make sure you are building and installing an Expo development build _NOT_ Expo Go. Follow the instructions here to
  build a [custom development build](/react-native/expo#custom-development-build).

`TS2307: Cannot find module @solana-mobile/mobile-wallet-adapter-protocol or its corresponding type declarations.`

- This is a bug/issue when using `npm`. Until it is fixed, to mitigate, please install the project using `yarn install`, not `npm install`.
