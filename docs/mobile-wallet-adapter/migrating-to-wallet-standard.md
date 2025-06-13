# Migrate to Wallet Standard

On the web, Mobile Wallet Adapter (MWA) is available as a *standard wallet* with the package:

- [`@solana-mobile/wallet-standard-mobile`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/wallet-standard-mobile)

This is the recommended library for MWA on web and this guide explains why and how to migrate your web app.

## Why switch?

There are several reasons to upgrade to using MWA via Wallet Standard.

### Wallet Adapter no longer includes MWA as a default 

The `@solana/wallet-adapter-react` library will [not include MWA as a default option](https://github.com/anza-xyz/wallet-adapter/pull/1097) starting from versions `>= 1.0.0`. 

This means any web app using `@solana/wallet-adapter-react` will no longer display *"Mobile Wallet Adapter"* as an option for users
browsing on Android Chrome, unless explicitly added.

### Enable remote connection

The `@solana-mobile/wallet-standard-mobile` library includes a remote connection option that allows users to connect their mobile wallet app to a desktop web page.

View the [MWA Remote documentation](/mobile-wallet-adapter/web-installation#enable-remote-connection) for more information.

### Bug fixes and stability

The `@solana-mobile/wallet-standard-mobile` is the recommended web library for MWA going forward. This means it will receive all the latest feature additions and updates. 

The legacy `@solana-mobile/wallet-adapter-mobile` library will be deprecated and enter maintenance mode, and only receive updates for bug fixes.

## How to upgrade

### Install Mobile Wallet Standard

Installing the standard wallet takes two steps:

1. Add the library `@solana-mobile/wallet-standard-mobile`.
2. Call the `register` function.

**View the [installation guide](/mobile-wallet-adapter/web-installation).**

### Upgrade to the latest wallet-adapter

If your web app is using `@solana/wallet-adapter-react`, update to the latest version. The latest version fixes common MWA Web issues
like the [*No connect after selecting MWA*](https://github.com/solana-mobile/mobile-wallet-adapter/issues/1086) bug.
