# React Native dApp Scaffold

The fastest way to start building React Native on Solana is using our template: [Solana Mobile dApp Scaffold](https://github.com/solana-mobile/solana-mobile-dapp-scaffold):

The scaffold is a ready-to-go React Native dApp that offers:

- Pre-installed standard SDKs like Mobile Wallet Adapter and `@solana/web3.js`
- Required polyfills like `react-native-get-random-values` and `Buffer` installed.
- Simple React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `SignMessageButton`.

## Prerequisites

If you haven't setup a React Native development environment for Android, you'll need to do that first. Follow the [Prerequisite Setup Guide](https://docs.solanamobile.com/getting-started/development-setup).

Follow the guide to make sure you:

- setup your Android and React Native development environment.
- have an Android device or emulator.
- install an MWA compliant wallet app on your device/emulator.

## Usage

**1. Initialize project template**

```
npx react-native init MySolanaDapp --template @solana-mobile/solana-mobile-dapp-scaffold --npm
```

:::note
The `--npm` flag is only needed if you're using Yarn 2 or 3 as the default package manager. Once the template is initialized, you can delete the `package-lock.json` and run `yarn install` to continue using Yarn.
:::

**2. Install dependencies**

- `yarn install` or `npm install`

**3. Launch the app on your Android device/emulator**

- `npx react-native run-android`
