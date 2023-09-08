# Solana Expo dApp Template

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

This template is a ready-to-go Expo dApp that offers:

- Pre-installed standard SDKs like Mobile Wallet Adapter and `@solana/web3.js`
- Required polyfills like `react-native-get-random-values` and `Buffer` installed.
- Simple React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `SignMessageButton`.

<CTAButton label="View on GitHub" to="https://github.com/solana-mobile/solana-mobile-dapp-scaffold" />

## Prerequisites

- An [Expo](https://expo.dev/) account.
- React Native and Android Envrionment [setup](https://docs.solanamobile.com/getting-started/development-setup)
  - An Android device/emulator.
  - Install an MWA compliant wallet app on your device/emulator.

## Usage

### Initialization

Initialize the template with:

```
npx create-expo-app --template @solana-mobile/solana-mobile-expo-template
```

Choose your project name then navigate into the directory.

### Build and run the app

Follow the **["Running the app"](/react-native/expo#running-the-app)** section in the Expo Setup guide to launch the template as a custom development build.
