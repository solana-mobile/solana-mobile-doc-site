# MWA for Web Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[**Mobile Wallet Adapter (MWA)**](https://github.com/solana-mobile/mobile-wallet-adapter) is a generic protocol specification that enables dApps to connect with mobile wallet apps for Solana transaction and message signing.

## Why is it important?

- Developers only need to implement MWA once to be compatible with [all MWA-compliant wallets](https://solanamobile.com/wallets)! It eliminates the need to integrate with each wallet individually.

- Developers can focus entirely on their dApp's core functionality, with wallet integration handled at no cost.
 
- Users have freedom to select and use the mobile wallet app of their choice.


## Supported Platforms

| Mobile Platform                            | Is MWA Supported? | Notes                                                                 |
| ------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Android                                    | ✅                | Full support for dApps and Wallet apps.                               |
| Mobile Web - Chrome (Android)              | ✅                | Automatic integration if using `@solana/wallet-adapter-react`.        |
| iOS                                        | ❌                | MWA is not currently available for any iOS platform (app or browser). |
| Mobile Web - Safari, Firefox, Opera, Brave | ❌                | These browsers currently do not support MWA on Android (or iOS).      |

## Using the SDK

Solana Mobile maintains an official [Mobile Wallet Adapter SDK](https://github.com/solana-mobile/mobile-wallet-adapter) that implements the protocol, originally written as a Android Kotlin/Java library.


<Tabs>
<TabItem value="For dApps" label="For dApps">

The SDK is available for:

- [Kotlin](/android-native/overview)
- [React Native](/react-native/using_mobile_wallet_adapter)
- Flutter
- Unity
- Unreal Engine

Explore the *SDKs* section of the site to learn how to integrate the MWA SDK into the framework of your choice.

</TabItem>
<TabItem value="For Wallets" label="For Wallets">

The SDK is available for:

- [Kotlin](/android-native/overview)
- [React Native](/react-native/using_mobile_wallet_adapter)
- Flutter
- Unity
- Unreal Engine

**Migrating to MWA 2.0**

Check out the [2.0 migration guide](../mwa/migration/overview.md) to migrate from 1.x version of Mobile Wallet Adapter to the latest version. 

</TabItem>
</Tabs>


# Mobile Wallet Adapter on Web Browsers

The Solana Mobile Stack was designed to be compatible on the mobile web. This document will
explain how to ensure a mobile web app can be integrated with Solana Mobile libraries.

## Android Web

Mobile Wallet Adapter library is built to also support functionality on the Android Chrome browser.

In particular, [`@solana-mobile/wallet-adapter-mobile` ](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/wallet-adapter-mobile) is a plugin developed for use with `@solana/wallet-adapter` to enable MWA for web apps on Android.

### Usage

Users of these libraries do not need to take any extra steps:

- `@solana/wallet-adapter-react@">=0.15.21"`

Those libraries automatically bundle the Mobile Wallet Adapter plugin, and enable it when running in a compatible mobile environment.

### Customization

Developers might wish to customize the behavior of this plugin for their app. Specifying the app's name and icon, deciding which address to select in the event the wallet authorizes the app to use more than one, specifying which network cluster to communicate with, and more are made possible by creating an instance of the mobile wallet adapter like this.

:::tip
It is highly recommended to provide a custom `appIdentity` with your app name and an identifable icon to help
users understand what app they are interacting with.

If left to default, the user will see an _"Unknown app_" label displayed and a missing icon.
:::

```ts
new SolanaMobileWalletAdapter({
  addressSelector: createDefaultAddressSelector(),
  appIdentity: {
    name: "My app",
    uri: "https://myapp.io",
    icon: "relative/path/to/icon.png", // resolves to https://myapp.io/relative/path/to/icon.png
  },
  authorizationResultCache: createDefaultAuthorizationResultCache(),
  cluster: WalletAdapterNetwork.Devnet,
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
});
```

Developers who use `@solana/wallet-adapter-react@">=0.15.21"` can supply this custom instance to `WalletProvider` which will use it to override the default one.

```ts
const wallets = useMemo(
  () => [
    new SolanaMobileWalletAdapter({
      addressSelector: createDefaultAddressSelector(),
      appIdentity: {
        name: "My app",
        uri: "https://myapp.io",
        icon: "relative/path/to/icon.png",
      },
      authorizationResultCache: createDefaultAuthorizationResultCache(),
      cluster: WalletAdapterNetwork.Devnet,
      onWalletNotFound: createDefaultWalletNotFoundHandler(),
    }),
  ],
  []
);

return (
  <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
    <WalletProvider wallets={wallets}>
      <MyApp />
    </WalletProvider>
  </ConnectionProvider>
);
```

### Browser Compatibility

Currently, the Mobile Wallet Adapter plugin is tested for compatibility with the Android Chrome browser. Other Android browsers, like the Brave browser on Android, might run into issues when trying to use Mobile Wallet Adapter.

This inconsistency can be due to differences in browser configurations for required permissions like local web socket connections.

## iOS Web

Mobile Wallet Adapter is not supported on iOS Safari. This is the same with iOS native apps, and is a limitation of the operating system explained more in-depth in this [blog article](/blog/ios-wallet-signing#mobile-wallet-adapter).

### Workarounds

Besides Mobile Wallet Adapter, there are alternative ways to enable wallet signing for your website directly within an iOS browser.

#### Wallet In App Browser

Websites that use `@solana/wallet-adapter` can receive wallet signing if the user is viewing their site within a wallet app's in-app-browser.

#### Safari Web Extension Wallet

If the user's wallet app supports a Safari Web Extension for signing, they can receive signing directly within the iOS Safari browser. See
this [proof-of-concept repo](https://github.com/solana-mobile/SolanaSafariWalletExtension) for a demo of what this experience looks like.

_Glow Wallet_ and _Nightly Wallet_ have iOS apps that support this Safari Web Extension signing experience.
