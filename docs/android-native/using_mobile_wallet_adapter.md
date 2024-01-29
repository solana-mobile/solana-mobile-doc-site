import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Mobile Wallet Adapter

The Mobile Wallet Adapter protocol is a spec that enables a secure, communication exchange between a dApp and an MWA-compliant wallet app, installed on the device.

Mobile Wallet Adapter 2.0 is the newest and current version and the complete 2.0 spec is viewable [here](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

## Add dependencies

The `mobile-wallet-adapter-clientlib-ktx` library is Solana Mobile's implementation of the Mobile Wallet Adapter protocol.

It provides a convenient API to connect, issue signing requests to a locally installed wallet app, and receive responses.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

```groovy
dependencies {
    implementation("com.solanamobile:mobile-wallet-adapter-clientlib-ktx:2.0.0")
}
```

</TabItem>
</Tabs>

## Instantiate `MobileWalletAdapter` client

The `MobileWalletAdapter` object provides methods to connect to wallets and issue MWA requests.

Define the `ConnectionIdentity` of your dApp so that the wallet app can properly display your dApp info to the user.

Parameters:

- `identityName`: The name of your app.
- `identityUri`: The web URL associated with your app.
- `iconUri`: A path to your app icon relative to the app uri above.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

// Define dApp's identity metadata
val solanaUri = Uri.parse("https://yourdapp.com")
val iconUri = Uri.parse("favicon.ico") // resolves to https://yourdapp.com/favicon.ico
val identityName = "Solana Kotlin dApp"

// Construct the client
val walletAdapter = MobileWalletAdapter(connectionIdentity = ConnectionIdentity(
    identityUri = solanaUri,
    iconUri = iconUri,
    identityName = identityName
))
```

### Managing the `authToken`

The `MobileWalletAdapter` object exposes an `authToken` property that it manages throughout its lifetime.

If present, the `authToken` is automatically used by the MWA client when issuing MWA requests (like `connect`, `signMessages`, etc). And if valid,
the user is able to skip the connection approval dialog for subsequent requests.

The `authToken` is stored by the `MobileWalletAdapter` client whenever you connect to a wallet, but it can also be
provided manually:

```kotlin
// Retrieve and use a persisted authToken from a previous session of the app.
val previouslyStoredAuthToken = maybeGetStoredAuthToken()
walletAdapter.authToken = previouslyStoredAuthToken
```

This is especially useful when you want to persist connections after a user closes and re-opens the app.

## Establishing an MWA session

To establish a session, or 'connect', with an MWA wallet, use the `transact` method provided by the `MobileWalletAdapter` object.

Calling `transact` dispatches an assocication intent to a locally installed MWA wallet app and prompts the
user to approve or reject the connection request.

Once connected, the user can begin issuing MWA requests and receiving responses from the wallet app. The `MobileWalletAdapter`
object also stores, in memory, the `authToken` from successful connections to be used automatically subsequent sessions.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

// `transact` dispatches an association intent to MWA-compatible wallet apps.
val result = walletAdapter.transact(sender) { authResult ->
    /* Once connected, send requests to the wallet in this callback */
}
```

When the session is complete, `transact` returns a `TransactionResult` that can be unwrapped and conditioned upon to handle success and error cases.

### Connecting to a wallet

If you only need to connect to a wallet and do not need to send any additional MWA requests, use the `connect` method from the `MobileWalletAdapter` client.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

// `connect` dispatches an association intent to MWA-compatible wallet apps.
val result = walletAdapter.connect(sender)

when (result) {
    is TransactionResult.Success -> {
        // On success, an `AuthorizationResult` type is returned.
        val authResult = result.authResult
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error connecting to wallet: " + result.e.message)
    }
}
```

On successful connection, the `TransactionResult` will contain an `AuthorizationResult` that contains the user's wallet address, `authToken`, etc.

#### What's the difference with `transact` and `connect`?

Under the hood, the `connect` method just calls the `transact` function with an empty callback, immediately returning the `authResult`.

```kotlin
suspend fun connect(sender: ActivityResultSender) = transact(sender) { }
```

## Sign in with Solana

To connect to a wallet and simultaneously verify the user's ownership of the wallet, use the [_Sign in with Solana_](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#introduction) feature.
_SIWS_ combines the `authorize` and `signMessage` step and returns a `SignInResult` that can be verified by the dApp.

To initiate _SIWS_, use the `signIn` method and pass in a `SignInPayload` parameter. If provided, the wallet
will display a dedicated _SIWS_ UI and prompt the user to sign in by signing the `statement` message.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

// `connect` dispatches an association intent to MWA-compatible wallet apps.
val result = walletAdapter.signIn(
    sender,
    SignInWithSolana.Payload("solana.com", "Sign in to Ktx Sample App")
)

when (result) {
    is TransactionResult.Success -> {
        // On success, an `AuthorizationResult` with a `signInResult` object is returned.
        val signInresult = result.authResult.signInResult
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error connecting to wallet: " + result.e.message)
    }
}
```

### Verifying the sign-in result

If successful, the wallet will respond with an `authResult` that includes a `SignInResult` object, which can be used
for verifying the sign-in process. The `SignInResult` object will contain the fields outlined in the [SIWS spec](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#sign-in-output-fields).

To verify the Sign-In output, use an Ed25519 library to verify that the message was correctly signed by the user's wallet. See `fakedapp` for an [example of message verification in Kotlin](https://github.com/solana-mobile/mobile-wallet-adapter/blob/761c3367e5ed4651fa2661767439abf25a178588/android/fakedapp/src/main/java/com/solana/mobilewalletadapter/fakedapp/MainViewModel.kt#L99C13-L108C18) or an [example with javascript on server-side](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#sign-in-output-verification-backend).

### Transact after signing in

Similarly to `connect`, the `signIn` method just wraps an empty `transact` call and includes the provided `signInPayload`.

If you want to sign in to the wallet and and continue issuing additional MWA requests, then you can use
the include the optional `signInPayload` parameter when using the `transact` method.

```kotlin
// Sign in to authorize the session, then continue issuing requests.
val result = walletAdapter.transact(sender,
             SignInWithSolana.Payload("solana.com", "Sign in to Ktx Sample App")) { authResult ->
    /* ..Send MWA requests.. */
}
```

## Disconnecting from a wallet

A dApp can revoke authorization or disconnect from a wallet by sending a disconnect request. The wallet will invalidate the `authToken` stored by the `MobileWalletAdapter`. This will require the user to approve the connection request once again, when connecting to that wallet.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

val result = walletAdapter.disconnect(sender)

when (result) {
    is TransactionResult.Success -> {
        // On success, the authToken has been successfully invalidated.
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error connecting to wallet: " + result.e.message)
    }
}
```

Alternatively, you can directly issue a `deauthorize` request to the wallet and provide a specific `authToken` to invalidate.

```kotlin
val result = walletAdapter.transact(sender) { authResult ->
    deauthorize(someAuthToken)
}
```

## Signing and sending transactions

To request a wallet to sign and then send a Solana transaction, use the `signAndSendTransactions` method. With this method,
the wallet will handle both signing the transactions then submitting them to the Solana network.

For an example of building a transaction, see the 'Building transactions' guide.

```kotlin
import com.funkatronics.encoders.Base58
import com.solana.publickey.SolanaPublicKey
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

val result = walletAdapter.transact(sender) { authResult ->
    // Build a transaction using web3-solana classes
    val account = SolanaPublicKey(authResult.accounts.first().publicKey)
    val memoTx = buildMemoTransaction(account, "Hello Solana!");

    // Issue a 'signTransactions' request
    signAndSendTransactions(arrayOf(memoTx.serialize()));
}

when (result) {
    is TransactionResult.Success -> {
        val txSignatureBytes = result.successPayload?.signatures?.first()
        txSignatureBytes?.let {
            println("Transaction signature: " + Base58.encodeToString(signedTxBytes))
        }
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error during signing and sending transactions: " + result.e.message)
    }
}
```

If successful, the `TransactionResult` will contain a `successPayload` with an array (`signatures`), where each item is a transaction
signature serialized as `ByteArray`, in corresponding order to the input.

## Signing messages

To request a wallet to sign a message, use the `signMessagesDetached` method. In this case, a _message_ is any payload of bytes.

```kotlin
import com.funkatronics.encoders.Base58
import com.solana.publickey.SolanaPublicKey
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

val message = "Sign this message please!"
val result = walletAdapter.transact(sender) { authResult ->
    signMessagesDetached(arrayOf(message.toByteArray()), arrayOf((authResult.accounts.first().publicKey)))
}

when (result) {
    is TransactionResult.Success -> {
        val signedMessageBytes = result.successPayload?.messages?.first()?.signatures?.first()
        signedMessageBytes?.let {
            println("Message signed: ${Base58.encodeToString(it)}")
        }
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error during transaction signing: " + result.e.message)
    }
}
```

If successful, the `TransactionResult` will contain a `successPayload` with an array (`messages`), where each item is a signed message
payload serialized as a `ByteArray`, in corresponding order to the input.

## Signing transactions (deprecated)

:::caution
The `signTransactions` method is deprecated according to the Mobile Wallet Adapter 2.0 [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html). Wallet apps
may still support this method for backwards compatibility, but it is recommended for dApps to use `signAndSendTransactions` instead.

The reason for deprecation is to prevent [_durable transaction nonce_](https://docs.solana.com/implemented-proposals/durable-tx-nonces) based replay attacks and vulnerabilities.
:::

To request a wallet to sign a Solana transaction, use the `signTransactions` method. For an example
of building a transaction, see the 'Building transactions' guide.

```kotlin
import com.funkatronics.encoders.Base58
import com.solana.publickey.SolanaPublicKey
import com.solana.mobilewalletadapter.clientlib.*

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

val result = walletAdapter.transact(sender) { authResult ->
    // Build a transaction using web3-solana classes
    val account = SolanaPublicKey(authResult.accounts.first().publicKey)
    val memoTx = buildMemoTransaction(account, "Hello Solana!");

    // Issue a 'signTransactions' request
    signTransactions(arrayOf(memoTx.serialize()));
}

when (result) {
    is TransactionResult.Success -> {
        val signedTxBytes = result.successPayload?.signedPayloads?.first()
        signedTxBytes?.let {
            println("Signed memo transaction: " + Base58.encodeToString(signedTxBytes))
        }
    }
    is TransactionResult.NoWalletFound -> {
        println("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        println("Error during transaction signing: " + result.e.message)
    }
}
```

The `signTransactions` method accepts an array of serialized transactions and, on success, returns `signedPayloads` containing the corresponding
signed payloads serialized as `ByteArray`.

## Next Steps

- Browse or clone the [MintyFresh repo](https://github.com/solana-mobile/Minty-fresh/tree/main) to reference best practices for a live, published Kotlin Solana dApp.
