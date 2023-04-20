import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Android Native Integration Guide

:::note
This page is a work in progress. More content is being worked on and will being added soon!
:::

The Mobile Wallet Adapter Client Library is an implementation of the Mobile Wallet Adapter protocol. It provides a library of classes and methods to connect your DApp to a wallet app and communicate through a series of requests. 

### SDK overview
The `clientlib` library ([Javadoc reference](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib/latest/index.html)) provides implementation of the Mobile Wallet Adapter protocol and contains core classes of the protocol. 

The Kotlin library `clientlib-ktx` ([Javadoc reference](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/package-summary.html)) is a wrapper of `client-lib` provides a simple API that allows DApps to `transact` and send requests to wallet apps. 


This integration guide will teach you how to integrate a DApp with these libraries to enable wallet signing and sending services.

### What you will learn
- How to connect a wallet with `transact`.
- How to request wallet authorization.
- Handle subsequent connections to the wallet.
- Prepare and request transaction/message signing.

## Connect to a wallet

To connect to a wallet, use the [`transact`](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/MobileWalletAdapter.html) method provided by the `MobileWalletAdapter` class. 

The `transact` method instantiates a [`Scenario`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib/src/main/java/com/solana/mobilewalletadapter/clientlib/scenario/Scenario.java) and dispatches an association Intent via [`startActivity()`](https://developer.android.com/reference/android/app/Activity#startActivity(android.content.Intent)) that will be received by MWA-compatible wallet apps. 

This starts a session with a wallet and within the callback, the DApp can send requests for signing or sending transactions/messages.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

val walletAdapterClient = MobileWalletAdapter()
val result = walletAdapterClient.transact(sender) {
    /* ... */
}
```

## Authorizing a wallet
After starting a `Scenario` with a wallet app with `transact`, you should first request authorization for your DApp with a call to [`authorize`](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/AdapterOperations.html#authorize(Uri,Uri,String,RpcCluster)).

When requesting `authorization`, pass in identity metadata to the request so users can recognize your DApp during 
the authorization flow.
- `identityName`: The name of your DApp.
- `identityUri`: The web URL associated with your DApp.
- `iconUri`: A relative path to your DApp icon.

<Tabs>
<TabItem value="Kotlin" label="Kotlin">

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

val walletAdapterClient = MobileWalletAdapter()
val result = walletAdapterClient.transact(sender) {
    // Pass in identity metadata about your DApp.
    val identityUri = Uri.parse("https://yourdapp.com")
    val iconUri = Uri.parse("favicon.ico")
    val identityName = "Example Solana DApp"

    // `authorize` prompts the user to accept your authorization request.
    val authed = client.authorize(identityUri, iconUri, identityName, RpcCluster.Devnet)

    // Rest of transact code goes below...
}
```

</TabItem>
</Tabs>

Once authorized with a wallet, the DApp can request the wallet to sign transactions, messages and send transactions via RPC. `authorize` also returns an [`AuthorizationResult`](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib/latest/com/solana/mobilewalletadapter/clientlib/protocol/MobileWalletAdapterClient.AuthorizationResult.html) that contains metadata from the wallet, like the wallet label and an `authToken`.

### Reauthorization for subsequent connections

For subsequent connections to the wallet app, you can skip the authorization step by sending a `reauthorization` request 
with a previously stored `authToken`. If still valid, `reauthorize` will bypass the need to explicitly grant authorization again.

<Tabs>
<TabItem value="Kotlin" label="Kotlin">

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

val walletAdapterClient = MobileWalletAdapter()
val result = walletAdapterClient.transact(sender) {
    // Pass in DApp identity metadata
    val identityUri = Uri.parse("https://yourdapp.com")
    val iconUri = Uri.parse("favicon.ico")
    val identityName = "Example Solana DApp"

    if (hasAuthToken) {
        // If we've saved an authToken from a previous `AuthorizationResult`, we can skip `authorize`
        // by sending a `reauthorize` request.
        val reauthed = reauthorize(identityUri, iconUri, identityName, savedAuthToken)
    } else {
        val authed = client.authorize(identityUri, iconUri, identityName, RpcCluster.Devnet)
    }

    // Rest of transact code goes below...
}
```

</TabItem>
</Tabs>




