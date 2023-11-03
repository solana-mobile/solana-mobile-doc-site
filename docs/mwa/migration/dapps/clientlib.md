# Migrating from `clientlib`` 1.x to 2.0

## Update

To update to clientlib 2.0, simply add the latest dependency in your gradle file:

```
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib:2.0.0-alpha5'
}
```

Becasue there are no breaking changines in 2.0.0, This all that is required to update to MWA 2.0.

## Migrating from deprecated methods

Several methods and fields within the SDK have been updated to conform to the new 2.0 protocol. These methods will continue to work, but we recommend that dapps take advantage of the new capabilities.

### `MobileWalletAdapterClient.authorize`

The `MobileWalletAdapterClient.authorize` method accepts some new parameters. 

```
authorize(
    @Nullable Uri identityUri,
    @Nullable Uri iconUri,
    @Nullable String identityName,
    @Nullable String cluster
)
```

```
authorize(
    @Nullable Uri identityUri,
    @Nullable Uri iconUri,
    @Nullable String identityName,
    @Nullable String chain,
    @Nullable String authToken,
    @Nullable String[] features,
    @Nullable byte[][] addresses
)
```

#### AuthorizationResult

The result object that is returned by `authorize` now supports multiple accounts. Rather than return the public key and label for a single account, the `AuthorizationResult` now returns a list of `AuthorizedAccount` objects with the following structure:

```
AuthorizedAccount {
    @NonNull byte[] publicKey
    @Nullable String accountLabel
    @Nullable String[] chains
    @Nullable String[] features
}
```

### `MobileWalletAdapterClient.getCapabilities`

The feature flags `supportsSignAndSendTransactons` and `supportsCloneAuthorization` haave been removed from the `get_capabilities` request in MWA 2.0. These have been replaced by the feature IDs exposed by the feature extension API. The result object returned by `MobileWalletAdapterClient.getCapabilities` has been updated to conform to the new request specification. A new `suportedOptionalFeatures` attribute has been added to `MobileWalletAdapterClient.GetCapabilitiesResult` that will contian a list of feature identifieer strings indicating which optional feaures the wallet supports.