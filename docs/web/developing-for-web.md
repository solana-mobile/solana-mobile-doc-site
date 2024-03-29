---
displayed_sidebar: documentationSidebar
---

# Developing for Web

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

Mobile Wallet Adapter is not supported on iOS Safari, or other iOS browsers. This is the same with iOS native apps, and is a limitation of the operating system explained more in-depth in this [blog article](/blog/ios-wallet-signing#mobile-wallet-adapter).

### Workarounds

Besides Mobile Wallet Adapter, there are alternative ways to enable wallet signing for your website directly within an iOS browser.

#### Wallet In App Browser

Websites that use `@solana/wallet-adapter` can receive wallet signing if the user is viewing their site within a wallet app's in-app-browser.

#### Safari Web Extension Wallet

If the user's wallet app supports a Safari Web Extension for signing, they can receive signing directly within the iOS Safari browser. See
this [proof-of-concept repo](https://github.com/solana-mobile/SolanaSafariWalletExtension) for a demo of what this experience looks like.

_Glow Wallet_ and _Nightly Wallet_ have iOS apps that support this Safari Web Extension signing experience.
