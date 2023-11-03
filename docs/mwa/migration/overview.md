# Mobile Wallet Adapter 2.0 Migration Guide

## The MWA 2.0 Specification

The mobile wallet adapter protocol sepcification has been updated to support new features and capabilities and refine the protocol based on feedback from dApps and wallets using the protocol. This new specification aims to be backwards compatible with [Mobile Wallet Adapter 1.0](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec1.0.html), with a few caveats.  

## Migrating from 1.x.x SDKs

### Dapp Developers

#### Android Kotlin SDK

If you are consuming our Android Koltin SDK for dApp endpoints, `clientlib-ktx`, follow the migration guide [here](dapps/clientlib).

#### Android Java SDK

If you are consuming our Android Java SDK for dApp endpoints, `clientlib`, follow the migration guide [here](dapps/clientlib-ktx).

### Wallet Developers

#### Android Java SDK

If you are consuming our Android Java SDK for wallet endpoints, `walletlib`, follow the migration guide [here](wallets/walletlib).
