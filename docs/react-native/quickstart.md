import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

# React Native Quickstart

This guide covers basic use cases and teaches you how to use our React Native SDK in your mobile app.
For a more comprehensive guide of how to build your first dApp, check out our React Native [starter tutorial](/react-native/first_app_tutorial).

### What you will learn

- How to use [**Mobile Wallet Adapter**](/react-native/overview#library-overview) to:
  - Connect to a wallet app with `transact`.
  - Request wallet authorization and reauthorization.
  - Sign transactions and messages
- How to use [**web3.js**](https://solana-labs.github.io/solana-web3.js/) to:

  - Connect to a Solana RPC endpoint.
  - Construct a Solana transaction for signing.

## Install libraries and polyfills

Follow [React Native Setup](/react-native/setup#step-2-install-dependencies) or [Expo Setup](/react-native/expo#step-2-install-dependencies) to install dependencies and polyfills.

## Connect to a wallet

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#transact" />

To connect to a wallet, use the [`transact`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol-web3js/src/transact.ts) function from `@solana-mobile/mobile-wallet-adapter-protocol-web3js`.

The `transact` method starts a session with a locally installed MWA-compatible wallet app. Within the callback, use
`wallet` to send requests for signing or sending transactions/messages.

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

await transact(async (wallet) => {
  /* ... */
});
```

:::tip
Use the `transact` function from `@solana-mobile/mobile-wallet-adapter-protocol-web3js` rather than `@solana-mobile/mobile-wallet-adapter-protocol`.

The former provides convenient wrappers around common ` web3.js` Solana types like `Transaction` while the latter provides base64 encoded byte payloads.
:::

## Authorizing a wallet

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletauthorize" />

After starting a session with a wallet app with `transact`, you should first request authorization for your app with a call to [`authorize`](<https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/AdapterOperations.html#authorize(Uri,Uri,String,RpcCluster)>).

When requesting `authorization`, include an [App Identity](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L13) to the request so users can recognize your app during the authorization flow.

- `name`: The name of your app.
- `uri`: The web URL associated with your app.
- `icon`: A path to your app icon relative to the app uri above.

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {AuthorizeAPI} from '@solana-mobile/mobile-wallet-adapter-protocol';

export const APP_IDENTITY = {
  name: 'React Native dApp',
  uri:  'https://yourdapp.com'
  icon: "favicon.ico", // Full path resolves to https://yourdapp.com/favicon.ico
};

const authorizationResult = await transact(async (wallet: AuthorizeAPI) => {
  const authorizationResult = await wallet.authorize({
    cluster: 'devnet',
    identity: APP_IDENTITY,
  });

  return authorizationResult;
});
```

Once authorized with a wallet, the app can request the wallet to sign transactions, messages and send transactions via RPC. We'll cover that in the next section.

`authorize` returns an [`AuthorizationResult`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L31) that contains:

- `accounts`: An array of [Accounts](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L3) (a label and public key) from the wallet.
- `authToken`: An authorization token that can be stored and re-used for requathorization on subsequent connections.

In practice, most wallet apps only support single account authorization, so there will be at most 1 item in `accounts`.

### Reauthorization for subsequent connections

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletreauthorize" />

For subsequent connections to the wallet app, you can skip the authorization step by sending a `reauthorize` request
with a previously stored `authToken`. If still valid, `reauthorize` will bypass the need to explicitly grant authorization again.

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {AuthorizeAPI, DeauthorizeAPI} from '@solana-mobile/mobile-wallet-adapter-protocol';

export const APP_IDENTITY = {
  name: 'React Native dApp',
  uri:  'https://yourdapp.com'
  icon: "./favicon.ico",
};

// If we have one, retrieve an authToken from a previous authorization.
const storedAuthToken = maybeGetStoredAuthToken(); // dummy placeholder function

await transact(async (wallet: AuthorizeAPI & ReauthorizeAPI) => {
  // If we have a previously stored authToken, we can instead call `reauthorize`.
  const authorizationResult = await (storedAuthToken
    ? wallet.reauthorize({
        auth_token: storedAuthToken,
        identity: APP_IDENTITY,
      })
    : wallet.authorize({
        cluster: 'devnet',
        identity: APP_IDENTITY,
      }));

  // Rest of transact code goes below...
});
```

### Deauthorizing a wallet

<CTAButton label="API Reference" to="http://localhost:3000/reference/typescript/mobile-wallet-adapter#web3mobilewalletdeauthorize" />

A dApp can revoke authorization or "disconnect" from a wallet by sending a `deauthorize` request.
This will invalidate the previously provided `authToken` from the wallet.

```tsx
await transact(async (wallet) => {
  if (!previouslyStoredAuthToken) {
    return;
  }

  // Pass in the prior auth token to invalidate it.
  await wallet.deauthorize({ auth_token: previouslyStoredAuthToken });
});
```

## Building Transactions

A client interacts with the Solana network by submitting a _transaction_ to the cluster. Transactions
allow a client to invoke instructions of on-chain [_Programs_](https://docs.solana.com/developing/intro/programs).

For a full explanation, see the core docs overview of a [_transaction_](https://docs.solana.com/developing/programming-model/transactions).

<Tabs>
<TabItem value="versionedTransaction" label="Versioned Transactions">

A [versioned transaction](https://docs.solana.com/developing/versioned-transactions) is a new format for transactions required for use by clients.
We'll create a `VersionedTransaction` from the `@solana/web3.js` library.

As an example, we'll be invoking the _transfer_ instruction from the _System Program_.
The System Program is an example of a Solana [Native Program](https://docs.solana.com/developing/runtime-facilities/programs).

```tsx
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage,
  SystemProgram,
} from "@solana/web3.js";

// Create a list of Program instructions to execute.
const instructions = [
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: 1_000,
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

## Signing Transactions

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsigntransactions" />

After creating a `VersionedTransaction` or `Transaction`, you can request a wallet to sign it within `transact`.

<Tabs>
<TabItem value="versionedTransaction" label="Versioned Transactions">

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { toByteArray } from "react-native-quick-base64";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const signedTx = await transact(async (wallet) => {
  // Authorize the wallet session
  const authorizationResult = await wallet.authorize({
    cluster: "devnet",
    identity: APP_IDENTITY,
  });

  // Convert base64 address to web3.js PublicKey class
  const authorizedPubkey = new PublicKey(
    toByteArray(authorizationResult.accounts[0].address)
  );

  // Construct an instruction to transfer 1,000 lamports to a randomly generated account
  const randomKeypair = Keypair.generate();
  const instructions = [
    SystemProgram.transfer({
      fromPubkey: authorizedPubkey,
      toPubkey: randomKeypair.publicKey,
      lamports: 1_000,
    }),
  ];

  // Connect to an RPC endpoint and get the latest blockhash, to include in
  // the transaction.
  const latestBlockhash = await connection.getLatestBlockhash();

  // Construct the Versioned message and transaction.
  const txMessage = new TransactionMessage({
    payerKey: authorizedPubkey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToV0Message();
  const versionedTransaction = new VersionedTransaction(txMessage);

  // Request to sign the transaction
  const signedTxs = await wallet.signTransactions({
    transactions: [versionedTransaction],
  });

  return signedTxs[0];
});
```

</TabItem>
<TabItem value="legacyTransaction" label="Legacy Transactions">

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  Keypair,
  clusterApiUrl,
  Connection,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const signedTx = await transact(async (wallet) => {
  // Authorize the wallet session
  const authorizationResult = wallet.authorize({
    cluster: 'devnet',
    identity: APP_IDENTITY,
  });

  // Convert base64 address to web3.js PublicKey class
  const authorizedPubkey = new PublicKey(toByteArray(authorizationResult.accounts[0].address));

  // Connect to an RPC endpoint and get the latest blockhash, to include in
  // the transaction.
  const latestBlockhash = await connection.getLatestBlockhash();

  // Construct a transaction. This transaction uses web3.js `SystemProgram`
  // to create a transfer that sends lamports to randomly generated address.
  const keypair = Keypair.generate();
  const randomTransferTransaction = new Transaction({
    ...latestBlockhash,
    feePayer: authorizedPubkey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: authorizedPubkey,
      toPubkey: keypair.publicKey,
      lamports: 1_000,
    }),
  );

  // Sign and return the transactions.
  const signedTransactions: await wallet.signTransactions({
    transactions: [randomTransferTransaction],
  });

  return signedTransactions[0];
});
```

</TabItem>
</Tabs>

## Signing messages

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsignmessages" />

Mobile Wallet Adapter provides an API to request message signing. In this case, a _message_ is any payload of bytes.

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

// Convert 'Hello world!' to a byte array.
const message = 'Hello world!'
const messageBuffer = new Uint8Array(
  message.split('').map(c => c.charCodeAt(0)),
);

const signedMessages = await transact(async (wallet) => {
  // Authorize the wallet session.
  const authorizationResult = await wallet.authorize({
      cluster: 'devnet',
      identity: APP_IDENTITY,
  });

  // Sign the payload with the provided address from authorization.
  const signedMessages = wallet.signMessages({
    addresses: [authorizationResult.address].
    payloads: [messageBuffer]
  })

  return signedMessages;
});
```

## Send a Transaction

After a `Transaction` is signed by the appropriate accounts, it can be submitted to the Solana network via RPC.

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
const signedTx: VersionedTransaction = await transact((wallet) => {
  /* ...signing code from above... */
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

The result from sending a transaction is a base58 transaction signature (or transaction ID). This transaction signature can be used to uniquely identify your transaction
on the ledger.

Using `confirmTransaction`, you can check that the transaction was `confirmed` by the network. For other commitment levels, read about [Commitment Status](https://docs.solana.com/cluster/commitments).

### Sign and Send with MWA

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsignandsendtransactions" />

An alternative option for submitting transactions is for the dApp to send a `signAndSendTransactions` MWA request to a wallet.

This request sends an unsigned transaction to the wallet. If authorized, the wallet will then sign the transaction and send it to the network with its own implementation.

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
const txSignature = await transact((wallet) => {
  /* ...transaction code from above... */

  // Send the unsigned transaction, the wallet will sign and submit it to the network,
  // returning the transaction signature.
  const transactionSignatures = await wallet.signAndSendTransactions({
    transactions: [versionedTransaction],
  });

  return transactionSignatures[0];
});

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
const txSignature = await transact((wallet) => {
  /* ...transaction code from above... */

  // Send the unsigned transaction, the wallet will sign and submit it to the network,
  // returning the transaction signature.
  const transactionSignatures = await wallet.signAndSendTransactions({
    transactions: [randomTransferTransaction],
  });

  return transactionSignatures[0];
});

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

## Next Steps

- Follow the [First dApp Tutorial](/react-native/first_app_tutorial.md) to learn how to use our starter dApp scaffold, create UI components, and record a public message on the Solana Blockchain.

- See our collection of [Sample Apps](/sample-apps/sample_app_overview) to reference a full React Native app.

- Dive into the [**Solana Program Library (SPL)**](https://spl.solana.com/) to learn about more interesting Solana Programs, like the [Token Program](https://spl.solana.com/token) used to create NFTs!
