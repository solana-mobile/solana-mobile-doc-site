import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Building transactions

A client interacts with the Solana network by submitting a _transaction_ to the cluster. Transactions
allow a client to invoke instructions of on-chain [_Programs_](https://docs.solana.com/developing/intro/programs).

For a full explanation, see the core docs overview of a [_transaction_](https://docs.solana.com/developing/programming-model/transactions).

## Add dependencies

The [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) library provides convenient classes and Solana primitive types to build transactions.

<Tabs>
<TabItem value="yarn" label="yarn">

```bash
yarn install @solana/web3.js
```

</TabItem>
<TabItem value="npm" label="npm">

```bash
npm install @solana/web3.js
```

</TabItem>
</Tabs>

### Add polyfills

After installing, ensure you have also added these [polyfills](/react-native/setup#step-3-update-indexjs-with-polyfills) to your React native app.
These are needed by some parts of `@solana/web3.js` because it is originally written as a web/node library and, as a result, certain expected APIs are missing in a React Native environment.

## Example: SOL Transfer Transaction

In the following example, we create a _transaction_ that invokes the [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program)'s _transfer_ instruction to send SOL to an address.

A _[transaction instruction](https://docs.solana.com/developing/programming-model/transactions#instructions)_ is comprised of a program id, a list of accounts, and instruction data specific to the program.

<Tabs>
<TabItem value="versionedTransaction" label="Versioned Transactions">

A [versioned transaction](https://docs.solana.com/developing/versioned-transactions) is a new format for transactions recommended for use by clients.

As an example, we'll be invoking the _transfer_ instruction from the _System Program_. Use the `SystemProgram` factory class
to conveniently generate the _transfer_ instruction.

```tsx
import {
  Connection,
  PublicKey,
  VersionedTransaction,
  SystemProgram,
} from "@solana/web3.js";

// Create a list of Program instructions to execute.
const instructions = [
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: 1_000_000,
  }),
];

// Connect to an RPC endpoint and get the latest blockhash, to include in
// the transaction.
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const latestBlockhash = await connection.getLatestBlockhash();

// Create the "message" of a transaction and compile to `V0Message` format.
const txMessage = new TransactionMessage({
  payerKey: fromPublicKey,
  recentBlockhash: latestBlockhash.blockhash,
  instructions,
}).compileToV0Message();

// Construct the Versioned Transaction passing in the message.
const versionedTransaction = new VersionedTransaction(txMessage);
```

</TabItem>
<TabItem value="legacyTransaction" label="Legacy Transactions">

For backwards compatiblity, you can still construct legacy transactions with `@solana/web3.js`.

```tsx
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

const latestBlockhash = await connection.getLatestBlockhash();
const randomTransferTransaction = new Transaction({
  ...latestBlockhash,
  feePayer: fromPublicKey,
}).add(
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: 1_000,
  })
);
```

</TabItem>
</Tabs>

## Send a Transaction

After a transaction is signed by the appropriate accounts, it can be submitted to the Solana network via RPC. See the
next guide, _Using Mobile Walelt Adapter_ to learn how to sign transactions.

<Tabs>
<TabItem value="versionedTransaction" label="Versioned Transactions">

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import {
  sendTransaction,
  clusterApiUrl,
  Connection,
  VersionedTransaction,
  confirmTransaction,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const unsignedTx = new VersionedTransaction(/* ... */);
const signedTx: VersionedTransaction = await transact((wallet) => {
  /* ...sign `unsignedTx` with Mobile Wallet Adapter... */
});

// After sending, a transaction signature is returned.
const txSignature = await connection.sendTransaction(signedTx);

// Confirm the transaction was successful.
const confirmationResult = await connection.confirmTransaction(
  txSignature,
  "confirmed"
);

if (confirmationResult.value.err) {
  throw new Error(JSON.stringify(confirmationResult.value.err));
} else {
  console.log("Transaction successfully submitted!");
}
```

</TabItem>
<TabItem value="legacyTransaction" label="Legacy Transactions">

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import {
  sendTransaction,
  clusterApiUrl,
  Connection,
  Transaction,
  confirmTransaction,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const signedTx: Transaction = await transact((wallet) => {
  /* ...signing code from above... */
});

// After sending, a transaction signature is returned.
const txSignature = await sendTransaction(signedTx, connection);

// Confirm the transaction was successful.
const confirmationResult = await connection.confirmTransaction(
  txSignature,
  "confirmed"
);

if (confirmationResult.value.err) {
  throw new Error(JSON.stringify(confirmationResult.value.err));
} else {
  console.log("Transaction successfully submitted!");
}
```

</TabItem>
</Tabs>

## Next steps

- Read the following _Using Mobile Wallet Adapter_ guide to learn how to sign these transactions and submit them to the Solana network.
- See the [Anchor Integration guide](/react-native/anchor_integration) to learn how to create and create transactions and invoke instructions from Anchor programs.
