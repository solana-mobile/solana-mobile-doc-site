# Migrating from walletlib 1.x to 2.0

The [Mobile Wallet Adapter 2.0 spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html) is published and the `walletlib` Android SDK
has been upgraded to support MWA 2.0.

Wallets can update their application following this migration guide.

## Summary of key changes

- Introduction of [feature identifiers](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#feature-identifiers).
- Introduction of [chain identifiers](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#chain-identifiers).
- API changes to the `authorize` RPC request specfication to support new identifiers and an `authToken` parameter.
- API changes to the `MobileWalletAdapterConfig` object returned by `getCapabilities` RPC request.
- Mandatory support of the `signAndSendTransactions` RPC request.
  - Additional optional parameters added to `signAndSendTransactions`.
- Deprecation of `reauthorize` and `signTransactions` methods.

## Migration guide

### Update walletlib

To update to `walletlib` 2.0, simply add the latest dependency in your gradle file:

```groovy
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.0-alpha5'
}
```

There will be no breaking changes and the 2.0 implementation will be immediately backwards compatible with legacy clients.

### Authorize ([spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#authorize))

#### AuthorizeRequest

To conform to the updated `authorize` RPC request specification, the `AuthorizationRequest` object that is passed from `walletlib` through the `onAuthorizeReqest` callback now includes some new parameters:

```kotlin
AuthorizeRequest {
    @Nullable Uri identityUri;
    @Nullable Uri iconUri;
    @Nullable String identityName;
    @Nullable String authToken;     // New
    @Nullable String chain;         // New
    @Nullable String[] features;    // New
    @Nullable String[] addresses;
}
```

New parameters:

- `authToken`: The client can now include an optional `authToken` in `authorize`. If provided, the wallet should attempt to reauthorize the session with it.
- `chain`: A identifier used to distinguish the requested blockchain network (e.g `solana:mainnet`). Replaces the deprecated `cluster` parameter.
- `features`: An array of feature identifiers, representing features requested by the client.

#### AuthorizationResult

Similarly, the `AuthorizationResult` object that is returned to the dapp endpoint now supports multiple accounts. Rather than returning the public key and label for a single account, the `AuthorizationResult` now returns a list of `AuthorizedAccount` objects with the following structure:

```kotlin
AuthorizedAccount {
    @NonNull byte[] publicKey
    @Nullable String accountLabel
    @Nullable String[] chains
    @Nullable String[] features
}
```

### Sign And Send Transactions

Suport for the `sign_and_send_transactions` request has been made mandatory in the Mobile Wallet Adapter 2.0 specification. Wallets must now implement this method according to [the spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#sign_and_send_transactions). The optional transaction parameters have also been expanded to allows dapps to further specify how transactions should be sent to the RPC by the wallet endpoint.

## `MobileWalletAdapterConfig`

The configuration object that is used when setting up an MWA session has been updated. The boolean feature flags `supportsSignAndSendTransactions` and `supportsCloneAuthorization` have been replaced with the cooresponding feature IDs `solana:signAndSendTransaction` and `solana:cloneAuthorization` and exosed through the new feature extension API.

```kotlin
MobileWalletAdapterConfig(
    boolean supportsSignAndSendTransactions,
    boolean supportsCloneAuthorization,
    int maxTransactionsPerSigningRequest,
    int maxMessagesPerSigningRequest,
    Object[] supportedTransactionVersions,
    long noConnectionWarningTimeoutMs
)
```

becomes

```kotlin
MobileWalletAdapterConfig(
    int maxTransactionsPerSigningRequest,
    int maxMessagesPerSigningRequest,
    Object[] supportedTransactionVersions,
    long noConnectionWarningTimeoutMs,
    String[] supportedFeatures // supported feature IDs go here
)
```
