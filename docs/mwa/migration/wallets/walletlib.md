# Migrating from walletlib 1.x to 2.0

## Update

To update to `walletlib` 2.0, simply add the latest dependency in your gradle file:

```
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.0-alpha5'
}
```

## Authorize

To conform to the updated `authorize` RPC request specification, the `AuthorizationRequest` object that is passed from `walletlib` through the `onAuthorizeReqest` callback now includes some new parameters:

AuthorizeRequest {
    @Nullable Uri identityUri;
    @Nullable Uri iconUri;
    @Nullable String identityName;
    @Nullable String authToken;
    @Nullable String chain;
    @Nullable String[] features;
    @Nullable String[] addresses;
}

Similarly, the `AuthorizationResult` object that is returned to the dapp endpoint now supports multiple accounts. Rather than return the public key and label for a single account, the `AuthorizationResult` now returns a list of `AuthorizedAccount` objects with the following structure:

```
AuthorizedAccount {
    @NonNull byte[] publicKey
    @Nullable String accountLabel
    @Nullable String[] chains
    @Nullable String[] features
}
```

## Sign And Send Transactions

Suport for the `sign_and_send_traansactions` request has been made mandatory in the Mobile Wallet Adapter 2.0 specification. Wallets must now implement this method according to [the spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#sign_and_send_transactions). The optional transaction parameters have also been expanded to allows dapps to further specify how transactions should be sent to the RPC by the wallet endpoint. 

## `MobileWalletAdapterConfig`

The configuration object that is used when setting up an MWA session has been updated. The boolean feature flags `supportsSignAndSendTransactions` and `supportsCloneAuthorization` have been replaced with the cooresponding feature IDs `solana:signAndSendTransaction` and `solana:cloneAuthorization` and exosed through the new feature extension API.

```
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

```
MobileWalletAdapterConfig(
    int maxTransactionsPerSigningRequest,
    int maxMessagesPerSigningRequest,
    Object[] supportedTransactionVersions,
    long noConnectionWarningTimeoutMs,
    String[] supportedFeatures // supported feature IDs go here
)
```