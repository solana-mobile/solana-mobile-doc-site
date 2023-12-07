# Migrating from walletlib 1.x to 2.0

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Mobile Wallet Adapter 2.0 spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html) is published and the `walletlib` Android SDK
has been upgraded to support MWA 2.0.

Wallets can update their application following this migration guide.

## Summary of key changes

- Introduction of [feature identifiers](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#feature-identifiers).
- Introduction of [chain identifiers](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#chain-identifiers).
- API changes to the `authorize` RPC request specfication adding new parameters:
  - Sign In With Solana payload
  - Chain and feature identifiers
  - `authToken` and `addresses`
- API changes to the `MobileWalletAdapterConfig` object returned by `getCapabilities` RPC request.
- Mandatory support of the `signAndSendTransactions` RPC request.
  - Additional optional parameters added to `signAndSendTransactions`.
- Deprecation of `reauthorize` and `signTransactions` methods.

## Migration guide

### Update walletlib

To update to `walletlib` 2.0, simply add the latest dependency in your gradle file:

```groovy
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.0-beta1'
}
```

There will be no breaking changes and the 2.0 implementation will be immediately backwards compatible with legacy clients.

### Authorize ([2.0 spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#authorize))

#### AuthorizeRequest

To conform to the updated `authorize` RPC request specification, the `AuthorizationRequest` object that is passed from `walletlib` through the `onAuthorizeReqest` callback now includes some new parameters:

<Tabs>
<TabItem value="MWA 2.0" label="MWA 2.0">

```kotlin
AuthorizeRequest {
    @Nullable Uri identityUri;
    @Nullable Uri iconUri;
    @Nullable String identityName;
    @Nullable String authToken;                      // New
    @Nullable String chain;                          // New
    @Nullable String[] features;                     // New
    @Nullable String[] addresses;                    // New
    @Nullable SignInWithSolana.Payload signInPayload // New
}
```

</TabItem>
<TabItem value="Legacy" label="Legacy">

```kotlin
AuthorizeRequest {
    @Nullable Uri identityUri;
    @Nullable Uri iconUri;
    @Nullable String identityName;
    @NonNull String cluster // Deprecated. Replaced by `chain` parameter.
}
```

</TabItem>
</Tabs>

New parameters:

- `authToken`: An optional `authToken` where if provided, the wallet should attempt to reauthorize the session with it.
- `addresses`: An optional list of base64 encoded account addresses that the dapp wishes to be included in the authorization scope.
- `signInPayload`: An object containing the payload portion of a [Sign In With Solana message](https://siws.web3auth.io/spec).
- `chain`: A [chain identifier](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#chain-identifiers) to distinguish the requested blockchain network. Replaces the deprecated `cluster` parameter.
  - Supported Solana network chains: `solana:mainnet`, `solana:testnet`, and `solana:devnet`.
- `features`: An array of [feature identifiers](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#feature-identifiers), representing features requested by the client.

#### Parameter: `authToken`

An optional `authToken` where if present, the wallet should attempt to reauthorize the session using it. The wallet implementation will likely be able to re-use their `reauthorize` logic
to handle this case. This aims to replace the `reauthorize` RPC request and reduce the confusion between `authorize`/`reauthorize` for dApps developers.

#### Parameter: Sign In With Solana

An optional object containing the payload portion of a [Sign In With Solana message](https://siws.web3auth.io/spec).

If present, the wallet should present the SIWS message to the user and, if approved, include a `SignInResult` object in the `AuthorizationResult` response to the dapp endpoint.

```kotlin
public class SignInResult {
    @NonNull public final byte[] publicKey;
    @NonNull public final byte[] signedMessage;
    @NonNull public final byte[] signature;
    @Nullable public final String signatureType;
}
```

#### AuthorizationResult

The `AuthorizationResult` object that is returned to the dapp endpoint is now constructed by passing in an `AuthorizedAccount`, rather than a public key and label.

Constructor for `AuthorizationResult`:

<Tabs>
<TabItem value="MWA 2.0" label="MWA 2.0">

```kotlin
public AuthorizationResult(@NonNull String authToken,
                            @NonNull AuthorizedAccount account,
                            @Nullable Uri walletUriBase,
                            @Nullable SignInResult signInResult);
```

</TabItem>
<TabItem value="Legacy" label="Legacy">

```kotlin
@Deprecated
public AuthorizationResult(@NonNull String authToken,
                            @NonNull byte[] publicKey,
                            @Nullable String accountLabel,
                            @Nullable Uri walletUriBase);
```

</TabItem>
<TabItem value="AuthorizedAccount" label="AuthorizedAccount">

```kotlin
AuthorizedAccount {
    @NonNull byte[] publicKey
    @Nullable String accountLabel
    @Nullable String[] chains
    @Nullable String[] features
}
```

</TabItem>
</Tabs>

:::note

In the near future, `AuthorizationResult` will be updated again to support multiple accounts and store a list of `AuthorizedAccount` objects.

:::

### Sign And Send Transactions ([2.0 spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#sign_and_send_transactions))

Suport for the `sign_and_send_transactions` request has been made mandatory in the Mobile Wallet Adapter 2.0 specification. Wallets must now implement this method according to [the spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#sign_and_send_transactions).

The optional transaction parameters have also been expanded to allows dapps to further specify how transactions should be sent to the RPC by the wallet endpoint.

Additional optional parameters in `SignAndSendTransactionRequest`:

<Tabs>
<TabItem value="MWA 2.0" label="MWA 2.0">

```java
public class SignAndSendTransactionRequest
    extends BaseVerifiableIdentityRequest<MobileWalletAdapterServer.SignAndSendTransactionsRequest> {

    /* ... */

    @Nullable
    public Integer getMinContextSlot();
    @Nullable
    public String getCommitment();      // New
    @Nullable
    public Boolean getSkipPreflight();  // New
    @Nullable
    public Integer getMaxRetries();     // New
    @Nullable
    public Boolean getWaitForCommitmentToSendNextTransaction(); // New

    /* ... */

}
```

</TabItem>
</Tabs>

For an explanation on each parameter, see the [spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#method-3).

### `MobileWalletAdapterConfig`

The configuration object that is used when setting up an MWA session has been updated. This object is returned to the dapp endpoint from a [`get_capabilities`](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec1.0.html#get_capabilities) RPC request.

The boolean feature flags `supportsSignAndSendTransactions` and `supportsCloneAuthorization` have been replaced with the `supportedFeatures` array, using the new
feature extension and identifer API.

The wallet can flag these features by adding `solana:signAndSendTransaction` and `solana:cloneAuthorization` and exposed through the new feature extension API.

<Tabs>
<TabItem value="MWA 2.0" label="MWA 2.0">

```java
MobileWalletAdapterConfig(
    int maxTransactionsPerSigningRequest,
    int maxMessagesPerSigningRequest,
    Object[] supportedTransactionVersions,
    long noConnectionWarningTimeoutMs,
    String[] supportedFeatures // Supported feature identifiers go here
)
```

</TabItem>
<TabItem value="Legacy" label="Legacy">

```java
MobileWalletAdapterConfig(
    boolean supportsSignAndSendTransactions, // Deprecated. Migrate to feature IDs
    boolean supportsCloneAuthorization,      // Deprecated. Migrate to feature IDs
    int maxTransactionsPerSigningRequest,
    int maxMessagesPerSigningRequest,
    Object[] supportedTransactionVersions,
    long noConnectionWarningTimeoutMs
)
```

</TabItem>
</Tabs>
