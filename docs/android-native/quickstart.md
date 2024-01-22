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
val blockhash = fetchLatestBlockhash(rpcUri)

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

Define the `ConnectionIdentity` of your dApp so that the wallet app can properly display your dApp info to the user.

Parameters:

- `identityName`: The name of your app.
- `identityUri`: The web URL associated with your app.
- `iconUri`: A path to your app icon relative to the app uri above.

```kotlin
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

### Establishing an MWA session

To establish a session, or 'connect', with an MWA wallet, use the `transact` method provided by the `MobileWalletAdapter` object.

Calling `transact` dispatches an assocication intent to a locally installed MWA wallet app and prompts the
user to approve or reject the connection request.

Once connected, the user can begin issuing MWA requests and receiving responses from the wallet app. The `MobileWalletAdapter`
object also stores, in memory, the `authToken` from successful connections to be used automatically subsequent sessions.

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

### Disconnecting from a wallet

A dApp can revoke authorization or disconnect from a wallet by sending a disconnect request. The wallet will invalidate the `authToken` stored by the `MobileWalletAdapter`. This will require the user to approve the connection request once again, when connecting to that wallet.

```kotlin
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

### Signing and sending transactions

To request a wallet to sign and then send a Solana transaction, use the `signAndSendTransactions` method. With this method,
the wallet will handle both signing the transactions then submitting them to the Solana network.

For an example of building a transaction, see the 'Building transactions' guide.

```kotlin
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

If successful, the `TransactionResult` will contain an array of `signatures`, with each item corresponding to a transaction
signature serialized as `ByteArray`.

### Signing transactions

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

### Signing messages

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

## Next Steps

- Reference and learn about [Minty Fresh](https://github.com/solana-mobile/Minty-fresh) a Kotlin Android app where you can take a picture and mint it into NFT.

- Dive into the [**Solana Program Library (SPL)**](https://spl.solana.com/) to learn about more interesting Solana Programs, like the [Token Program](https://spl.solana.com/token) used to create NFTs!
