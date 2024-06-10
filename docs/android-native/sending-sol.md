# Example: Sign and send a SOL transfer

This example will walkthrough the steps to build a transaction that sends SOL from a user's wallet to another wallet.

To achieve this, you will write code that:

1. Builds a transaction that invokes the System Program's `transfer` instruction
2. Connects to the user's wallet to retrieve their wallet address
3. Prompt the user to sign the transaction with Mobile Wallet Adapter

## Build a transfer transaction

Write a helper method `buildTransferTransaction` that handles creating the transfer instruction and assembling it into a `Transaction`.

You can use the `SystemProgram.transfer` util method provided by `web3-solana` to conveniently generate a serialized transfer instruction.

```kotlin
import com.solana.publickey.SolanaPublicKey
import com.solana.transaction.*

fun buildTransferTransaction(
    blockhash: String,
    fromPublicKey: SolanaPublicKey,
    toPublicKey: SolanaPublicKey,
    lamports: Long
): Transaction {
    val transferTxMessage = Message.Builder()
        .addInstruction(
            SystemProgram.transfer(
                fromPublicKey,
                toPublicKey,
                lamports
            )
        )
        .setRecentBlockhash(blockhash)
        .build()

    return Transaction(transferTxMessage)
}
```

:::tip

## Fetching the latest blockhash

In this method, we use a `blockhash` parameter. See this [RPC requests guide](/android-native/rpc-requests#example-fetching-latest-blockhash) for an exampkle.

:::tip

## Instantiate Mobile Wallet Adapter client

In your app, instantiate a `MobileWalletAdapter` client instance, that will be used to establish a session with the user's mobile wallet app.

```kotlin
import com.solana.mobilewalletadapter.clientlib.*

// Define dApp's identity metadata
val solanaUri = Uri.parse("https://yourdapp.com")
val iconUri = Uri.parse("favicon.ico") // resolves to https://yourdapp.com/favicon.ico
val identityName = "Solana Kotlin Transfer Example"

// Construct the client
val walletAdapter = MobileWalletAdapter(connectionIdentity = ConnectionIdentity(
    identityUri = solanaUri,
    iconUri = iconUri,
    identityName = identityName
))
```

## Connect to the user's wallet

Assuming you do not currently have the user's wallet address available, you can use Mobile Wallet Adapter
to connect to their mobile wallet app, and learn what their wallet address is.

```kotlin
import com.funkatronics.encoders.Base58
import com.solana.publickey.SolanaPublicKey
import com.solana.mobilewalletadapter.clientlib.*
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

 // `this` is the current Android activity
val sender = ActivityResultSender(this)

// Instantiate the MWA client object
val walletAdapter = MobileWalletAdapter(/* ... */)

val lamportAmount = 1000000
val result = walletAdapter.transact(sender) { authResult ->
    // Retrieve the user wallet address from the MWA authResult
    val userWallet = SolanaPublicKey(authResult.accounts.first().publicKey)

    // Fetch latest blockhash
    val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
    val blockhashResponse = rpcClient.getLatestBlockhash()

    // Use the wallet address to build the transfer transaction
    val transferTx = buildTransferTransaction(
        blockhashResponse.result!!.blockhash,
        userWallet,
        SolanaPublicKey("<address_of_recipient>"),
        lamportAmount
    );

    // ...
}
```

## Sign and send the transaction

Finally, issue a `signAndSendTransactions` request, prompting the user to sign the transfer transaction
and submit it to the network.

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

    // Fetch latest blockhash
    val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
    val blockhashResponse = rpcClient.getLatestBlockhash()

    // Use the wallet address to build the transfer transaction
    val transferTx = buildTransferTransaction(
        blockhashResponse.result!!.blockhash,
        userWallet,
        SolanaPublicKey("<address_of_recipient>"),
        lamportAmount
    );

    // Issue a 'signTransactions' request
    signAndSendTransactions(arrayOf(transferTx.serialize()));
}

// Read the results!
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

If signing is successful, you can check the returned `result` for the transaction signature, or handle failure cases.

## Next steps

Check out the [Kotlin Compose Scaffold](https://github.com/solana-mobile/solana-kotlin-compose-scaffold) for a code examples of what is discussed in this guide, and an easy launching point to getting started with Solana Kotlin development!
