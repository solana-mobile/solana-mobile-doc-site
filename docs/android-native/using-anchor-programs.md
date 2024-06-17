# Working with Anchor Programs in Kotlin

[Anchor](https://www.anchor-lang.com/) is a popular Solana development framework for writing on-chain programs. Programs and instructions created with Anchor, have a different data format than other programs like SPL and SystemProgram.

This guide will teach you how to build instructions and transactions that invoke Anchor programs in Kotlin.

## Add dependencies

Add the following dependencies to your project:

- [`web3-solana`](https://github.com/solana-mobile/web3-core) library provides the abstraction classes like `Transaction` and `AccountMeta` to simplify building Solana transactions.
- [`rpc-core`](https://github.com/solana-mobile/rpc-core) library provides a `SolanaRpcClient` class with convenient RPC methods.
- [`kborsh`](https://github.com/Funkatronics/kBorsh/tree/main) library for Borsh serialization of instruction data.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

```groovy
dependencies {
    implementation("com.solanamobile:web3-solana:0.2.2")
    implementation("com.solanamobile:rpc-core:0.2.6")
    implementation('io.github.funkatronics:kborsh:0.1.0')
}
```

</TabItem>
</Tabs>

## Example: Counter Program

As an example, we'll build a transaction using this devnet on-chain [Counter Program](https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/counter-program/programs/counter-program/src/lib.rs) that was created with Anchor.

Specifically, let's invoke the `Increment` instruction.

### Instruction Format

Taking a look at the [source code](https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/counter-program/programs/counter-program/src/lib.rs#L43), observe that the `Increment` instruction format expects:

**Program ID**

- The Counter Program is deployed on devnet with the Program Id: `ADraQ2ENAbVoVZhvH5SPxWPsF2hH5YmFcgx61TafHuwu`.

**Account Addresses**

- The Counter account PDA as a non-signer. `"counter"` is the only seed used to derive the PDA.

**Instruction Data**

- An `amount: u64` parameter.
- An additional 8 bytes for the [Anchor discriminator](https://book.anchor-lang.com/anchor_bts/discriminator.html)

Now, let's create each of these required inputs.

### 1. Find the Counter account PDA

To derive the Counter PDA, we'll use the `ProgramDerivedAddres` interface in the `web3-solana` module which provides a `find` method.

Call `ProgramDerivedAddres.find` and pass `"counter"` as a seed and the Counter program ID:

```kotlin
import com.solana.publickey.SolanaPublicKey
import com.solana.publickey.ProgramDerivedAddress

val programId = SolanaPublicKey.from("ADraQ2ENAbVoVZhvH5SPxWPsF2hH5YmFcgx61TafHuwu")

// Counter account has a single seed 'counter'
val seeds = listOf("counter".encodeToByteArray())

// Calculate the PDA
val result = ProgramDerivedAddress.find(seeds, programId)

// Unwrap the result
val counterAccountPDA = result.getOrNull()
```

### 2. Serialize the instruction data

The next step is to build and serialize the instruction data.

Using the `kotlinx` serialization library, define the expected increment arguments as a `@Serializable` class.

```kotlin
import kotlinx.serialization.Serializable

@Serializable
class Args_increment(val amount: UInt)
```

Now, use the `AnchorInstructionSerializer` to serialize the instruction arguments and lastly use the `kBorsh` library to Borsh encode the data.

```kotlin
val encodedInstructionData = Borsh.encodeToByteArray(
    AnchorInstructionSerializer("increment"),
    Args_increment(amount)
)
```

:::info

Anchor instruction data uses a unique [Anchor discriminator](https://book.anchor-lang.com/anchor_bts/discriminator.html) to determine which instruction is called.

The `AnchorInstructionSerializer` will handle this discriminator during serialization, as long as you pass the correct instruction name (e.g `increment`) into the constructor.

:::

### 3. Construct the instruction

Putting all the inputs together, you can build the full `TransactionInstruction`.

```kotlin
import com.solana.publickey.SolanaPublicKey
import com.solana.transaction.*

val incrementInstruction = TransactionInstruction(
    SolanaPublicKey.from("ADraQ2ENAbVoVZhvH5SPxWPsF2hH5YmFcgx61TafHuwu"),
    listOf(AccountMeta(counterAccountPDA!!, false, true)),
    encodedInstructionData
)
```

### 4. Create the transaction

Then build a transaction message and construct the `Transaction` packed with the increment instruction.

```kotlin
import com.solana.transaction.*
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

// Fetch latest blockhash from RPC
val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
val blockhashResponse = rpcClient.getLatestBlockhash()

// Build transaction message
val incrementAmount = 5
val incrementCounterMessage =
    Message.Builder()
        .addInstruction(
            incrementInstruction
        )
        .setRecentBlockhash(blockhashResponse.result!!.blockhash)
        .build()

// Construct the Transaction object from the message
val unsignedIncrementTx = Transaction(incrementCounterMessage)
```

### 5. Sign the transaction

At this point, you have successfully created an _unsigned_ Solana transaction for incrementing the counter account. Before submitting to the network, the transaction must be signed by the fee payer.

#### Signing with Mobile Wallet Adapter

If you want users to sign the transaction using their mobile wallet app (e.g Phantom, Solflare) you can use Mobile Wallet Adapter to request signing.

Read the [_Using Mobile Wallet Adapter_ guide](/android-native/using_mobile_wallet_adapter#signing-and-sending-transactions) to learn how to prompt users to sign these transactions and submit them to the Solana network.

#### Signing with a keypair

If you have direct access to a keypair, you can serialize the Transaction message, sign the bytes, and construct the signed transaction.

```kotlin
import com.solana.transaction.*
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

// Fetch latest blockhash from RPC
val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
val blockhashResponse = rpcClient.getLatestBlockhash()

// Build transaction message
val incrementAmount = 5
val incrementCounterMessage =
    Message.Builder()
        .addInstruction(
            incrementInstruction
        )
        .setRecentBlockhash(blockhashResponse.result!!.blockhash)
        .build()

// sign the transaction with some keypair signer
val signature = ed25519Signer.signBytes(incrementCounterMessage.serialize())

// send the transaction to the cluster
val signedTransaction = Transaction(listOf(signature), incrementCounterMessage)

```

### 6. Sending the transaction

After the transaction is signed, it can be submitted to an RPC using the `SolanaRpcClient` class.

```kotlin
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())

val response = rpcClient.sendTransaction(signedTransaction)

if (response.result) {
    println("Transaction signature: ${response.result}")
} else if (response.error) {
    println("Failed to send transaction: ${response.error.message}")
}
```
