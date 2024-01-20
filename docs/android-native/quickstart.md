import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kotlin Quickstart

A collection of code snippets and examples for basic use cases commonly used in Solana Kotlin dApps.

## Making RPC requests

## Building transactions

A client interacts with the Solana network by submitting a _transaction_ to the cluster. Transactions
allow a client to invoke instructions of on-chain [_Programs_](https://docs.solana.com/developing/intro/programs).

For a full explanation, see the core docs overview of a [_transaction_](https://docs.solana.com/developing/programming-model/transactions).

### Example: Memo Program Transaction

The `web3-solana` library provides the abstraction classes like `Transaction` to simplify building Solana transactions.

A transaction instruction is comprised of a program id, a list of accounts, and instruction data specific to the program.

```kotlin
import com.solana.publickey.*
import com.solana.transaction.*

// Solana Memo Program
val memoProgramId = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
val memoProgramIdKey = SolanaPublicKey.from(memoProgramId)

// Construct the instruction
val message = "Hello Solana!"
val memoInstruction = TransactionInstruction(
    memoProgramIdKey,
    // Define the accounts in instruction
    listOf(AccountMeta(address, true, true)),
    // Pass in the instruction data as ByteArray
    message.encodeToByteArray()
)

// Fetch latest blockhash from RPC
val blockhash = RecentBlockhashUseCase(rpcUri)

// Build transaction message
val memoTxMessage = Message.Builder()
    .addInstruction(memoInstruction)
    .setRecentBlockhash(blockhash)
    .build()

// Construct the Transaction object from the message
val unsignedTx = Transaction(memoTxMessage)
```

## Using Mobile Wallet Adapter

The Mobile Wallet Adapter library allows a dApp to connect to MWA-compliant wallet apps installed on the device. Once connected,
the dApp can request signing from the wallet app.

### Instantiate `MobileWalletAdapter` client

The `MobileWalletAdapter` object provides methods to connect to wallets and issue MWA requests.

- Define the `ConnectionIdentity` of your dApp so that the wallet app can properly display info to the user when signing.

```kotlin
// Define dApp's identity metadata
val solanaUri = Uri.parse("https://solana.com")
val iconUri = Uri.parse("favicon.ico") // resolves to https://solana.com/favicon.ico
val identityName = "Solana Kotlin dApp"

// Construct the client
val walletAdapter = MobileWalletAdapter(connectionIdentity = ConnectionIdentity(
    identityUri = solanaUri,
    iconUri = iconUri,
    identityName = identityName
))
```

#### Managing the `authToken`

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

### Establishing an MWA session with `transact`

To establish a session with an MWA wallet, use the `transact` method provided by the `MobileWalletAdapter` object.

Calling `transact` dispatches an assocication intent to a locally installed MWA wallet app and prompts the
user to approve or reject the connection request.

Once connected, the user can begin issuing MWA requests and receiving responses from the wallet app.

```kotlin
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
        print("No MWA compatible wallet app found on device.")
    }
    is TransactionResult.Failure -> {
        print("Error connecting to wallet: " + result.e.message)
    }
}
```

On successful connection, the `TransactionResult` will contain an `AuthorizationResult` that contains the user's wallet address, `authToken`, etc.

#### What's the difference with `transact` and `connect`?

Under the hood, the `connect` method just calls the `transact` function with an empty callback, immediately returning the `authResult`.

```kotlin
suspend fun connect(sender: ActivityResultSender) = transact(sender) { }
```

## Authorizing a wallet

After starting a `Scenario` with a wallet app with `transact`, you should first request authorization for your app with a call to [`authorize`](<https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/AdapterOperations.html#authorize(Uri,Uri,String,RpcCluster)>).

When requesting `authorization`, pass in identity metadata to the request so users can recognize your app during
the authorization flow.

- `identityName`: The name of your app.
- `identityUri`: The web URL associated with your app.
- `iconUri`: A path to your app icon relative to the app uri above.

<Tabs>
<TabItem value="Kotlin" label="Kotlin">

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

val walletAdapterClient = MobileWalletAdapter()
val result = walletAdapterClient.transact(sender) {
    // Pass in identity metadata about your app.
    val identityUri = Uri.parse("https://yourapp.com")
    val iconUri = Uri.parse("favicon.ico") // Full path resolves to https://yourdapp.com/favicon.ico
    val identityName = "Example Solana app"

    // `authorize` prompts the user to accept your authorization request.
    val authed = client.authorize(identityUri, iconUri, identityName, RpcCluster.Devnet)

    // Rest of transact code goes below...
}
```

</TabItem>
</Tabs>

Once authorized with a wallet, the app can request the wallet to sign transactions, messages and send transactions via RPC. `authorize` also returns an [`AuthorizationResult`](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib/latest/com/solana/mobilewalletadapter/clientlib/protocol/MobileWalletAdapterClient.AuthorizationResult.html) that contains metadata from the wallet, like the wallet label and an `authToken`.

### Reauthorization for subsequent connections

For subsequent connections to the wallet app, you can skip the authorization step by sending a `reauthorization` request
with a previously stored `authToken`. If still valid, `reauthorize` will bypass the need to explicitly grant authorization again.

<Tabs>
<TabItem value="Kotlin" label="Kotlin">

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

val walletAdapterClient = MobileWalletAdapter()
val result = walletAdapterClient.transact(sender) {
    // Pass in app identity metadata
    val identityUri = Uri.parse("https://yourapp.com")
    val iconUri = Uri.parse("favicon.ico")
    val identityName = "Example Solana app"

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

## Next Steps

- Reference and learn about [Minty Fresh](https://github.com/solana-mobile/Minty-fresh) a Kotlin Android app where you can take a picture and mint it into NFT.

- Dive into the [**Solana Program Library (SPL)**](https://spl.solana.com/) to learn about more interesting Solana Programs, like the [Token Program](https://spl.solana.com/token) used to create NFTs!
