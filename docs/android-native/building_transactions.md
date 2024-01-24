import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Building transactions

A client interacts with the Solana network by submitting a _transaction_ to the cluster. Transactions
allow a client to invoke instructions of on-chain [_Programs_](https://docs.solana.com/developing/intro/programs).

For a full explanation, see the core docs overview of a [_transaction_](https://docs.solana.com/developing/programming-model/transactions).

## Example: Memo Program Transaction

The `web3-solana` library provides the abstraction classes like `Transaction` and `AccountMeta` to simplify building Solana transactions.

In the following example, we are creating a `Transaction` that invokes the Memo Program to publish the message "Hello Solana" on-chain.

### Creating transaction instructions

A transaction instruction is comprised of a program id, a list of accounts, and instruction data specific to the program. We define a list of `AccountMeta` to represent the required accounts, then pass the encoded message as `data` into the `TransactionInstruction` constructor.

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

### Creating Transaction

```kotlin
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
