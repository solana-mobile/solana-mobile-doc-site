# Migrating from walletlib 1.x to 2.0

## Update

To update to `walletlib` 2.0, simply add the latest dependency in your gradle file:

```
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.0-alpha5'
}
```

### `MobileWalletAdapterConfig`

The configuration object that is used when setting up an MWA session has been updated

```
MobileWalletAdapterConfig(
    @IntRange(from = 0) int maxTransactionsPerSigningRequest,
    @IntRange(from = 0) int maxMessagesPerSigningRequest,
    @NonNull @Size(min = 1) Object[] supportedTransactionVersions,
    @IntRange(from = 0) long noConnectionWarningTimeoutMs,
    @NonNull String[] supportedFeatures
)
```