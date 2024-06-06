# Building Anchor Program instructions

[Anchor](https://www.anchor-lang.com/) is a popular Solana development framework for writing on-chain programs. Programs and instructions created with Anchor, have a different data format than other programs like SPL and SystemProgram.

This guide will teach you how to build instructions and transactions that invoke Anchor programs in Kotlin.

## Add dependencies

Add the following dependencies to your project:

- [`web3-solana`](https://github.com/solana-mobile/web3-core) library provides the abstraction classes like `Transaction` and `AccountMeta` to simplify building Solana transactions.
- [`kborsh`](https://github.com/Funkatronics/kBorsh/tree/main) library for Borsh serialization of instruction data.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

```groovy
dependencies {
    implementation("com.solanamobile:web3-solana:0.2.2")
    implementation 'io.github.funkatronics:kborsh:0.1.0'
    implementation("foundation.metaplex:solanapublickeys:0.2.10")
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

To derive the Counter PDA, we'll use the SolanaKMP `:solanapublickeys:` module which provides a `findProgramAddress` method.

Call `findProgramAddress` and pass `"counter"` as a seed and the Counter program ID:

```kotlin
import com.solana.publickey.SolanaPublicKey
import foundation.metaplex.solanapublickeys.PublicKey as KmpPublicKey

val counterProgramId = KmpPublicKey("ADraQ2ENAbVoVZhvH5SPxWPsF2hH5YmFcgx61TafHuwu")
val counterPDA = KmpPublicKey.findProgramAddress(listOf("counter".encodeToByteArray()), counterProgramId)

val counterAccountPublicKey = SolanaPublicKey(counterPDA.address.toByteArray())
```

:::info

In the snippet above, we are using both the `PublicKey` class (aliased `KmpPublicKey`) from the SolanaKMP `solanapublickeys` module and the `SolanaPublicKey` class from the `web3-solana` module.

The SolanaKMP `PublicKey` is needed for its PDA derivation functionality.

This confusion is temporary and, in a future release, the `findProgramAddress` functionality will be provided all within `web3-solana`.

:::

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
    listOf(AccountMeta(counterAccountPublicKey, false, true)),
    encodedInstructionData
)
```

### 4. Create the transaction

Then build a transaction message and construct the `Transaction` packed with the increment instruction.

```kotlin
import com.solana.transaction.*

// Fetch latest blockhash from RPC
val blockhash = fetchLatestBlockhash(rpcUri)


// Build transaction message
val incrementAmount = 5
val incrementCounterMessage =
    Message.Builder()
        .addInstruction(
            incrementInstruction
        )
        .setRecentBlockhash(blockhash)
        .build()

// Construct the Transaction object from the message
val unsignedIncrementTx = Transaction(incrementCounterMessage)
```

### 5. Sign and send the transaction

At this point, you have successfully created an _unsigned_ Solana transaction that, when submitted to the network, invokes the _increment_ instruction of the Anchor program.

Read the [_Using Mobile Wallet Adapter_ guide](/android-native/using_mobile_wallet_adapter#signing-and-sending-transactions) to learn how to enable users to sign these transactions and submit them to the Solana network.
