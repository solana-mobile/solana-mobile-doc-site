import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import versions from '@site/sms-version-constants';

# Building Solana transactions

A client interacts with the Solana network by submitting a _transaction_ to the cluster. Transactions
allow a client to invoke instructions of on-chain [_Programs_](https://docs.solana.com/developing/intro/programs).

For a full explanation, see the core docs overview of a [_transaction_](https://docs.solana.com/developing/programming-model/transactions).

## Add dependencies

The [`web3-solana`](https://github.com/solana-mobile/web3-core) library provides the abstraction classes like `Transaction` and `AccountMeta` to simplify building Solana transactions.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

<pre><code language="groovy">

{
`dependencies {
    implementation("com.solanamobile:web3-solana:${versions.KOTLIN_WEB3_SOLANA_VERSION}")
}`
}

</code></pre>

</TabItem>
</Tabs>

## Example: Memo Program Transaction

In the following example, we are creating a `Transaction` that invokes the [Memo Program](https://spl.solana.com/memo) to publish the message "Hello Solana" on-chain.

### Create an instruction

A transaction instruction is comprised of a program id, a list of accounts, and instruction data specific to the program.

To create an instruction, define a list of `AccountMeta` that represent the accounts required by the instruction.
Then pass the encoded message as `data` into the `TransactionInstruction` constructor.

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
```

### Create the Memo transaction

After creating the instructions, use `Message.Builder()` to assemble the instructions and a _blockhash_ to construct the a _Transaction message_. Then
pass the transaction message into the `Transaction` constructor.

See the previous _Making RPC Requests_ guide for an example of how to fetch a blockhash.

```kotlin
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

// Fetch blockhash from RPC
val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
val blockhasResponse = rpcClient.getLatestBlockhash()

if (response.error) {
    println("Failed to fetch latest blockhash: ${response.error.message}")
    return;
}

// Build transaction message
val memoTxMessage = Message.Builder()
    // highlight-next-line
    .addInstruction(memoInstruction) // Pass in instruction from previous step
    .setRecentBlockhash(blockhasResponse.result!!.blockhash)
    .build()

// Construct the Transaction object from the message
val unsignedTx = Transaction(memoTxMessage)
```

## Next steps

Read the following _Using Mobile Wallet Adapter_ guide to learn how to sign these transactions and submit them to the Solana network.
