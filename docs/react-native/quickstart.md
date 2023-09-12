import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

## Connect to a wallet

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
  }));

  return authorizationResult;
});
```

Once authorized with a wallet, the app can request the wallet to sign transactions, messages and send transactions via RPC. We'll cover that in the next section.

`authorize` returns an [`AuthorizationResult`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L31) that contains:

- `accounts`: An array of [Accounts](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L3) (a label and public key) from the wallet.
- `authToken`: An authorization token that can be stored and re-used for requathorization on subsequent connections.

In practice, most wallet apps only support single account authorization, so there will be at most 1 item in `accounts`.

### Reauthorization for subsequent connections

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

## Signing Transactions and Messages

After authorized with a wallet, you can now request signing services within `transact` with:

- `signMessages`
- `signTransactions`

In `signTransactions`, we use using [**System Program**](https://docs.solana.com/developing/runtime-facilities/programs#system-program) to generate a simple _transfer_ instruction that moves SOL around. _System Program_ is an example of a Solana [Native Program](https://docs.solana.com/developing/runtime-facilities/programs). To learn more about Solana transactions see the this [deep dive](https://docs.solana.com/developing/programming-model/transactions).

<Tabs>
<TabItem value="signMessasges" label="signMessages">

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

// If we have one, retrieve an authToken from a previous authorization.
const storedAuthToken = maybeGetStoredAuthToken(); // dummy placeholder function
const message = 'Hello world!'
const messageBuffer = new Uint8Array(
  message.split('').map(c => c.charCodeAt(0)),
);

const signedMessages = await transact(async (wallet) => {
  // First, request for authorization from the wallet.
  const authorizationResult = await (storedAuthToken
    ? wallet.reauthorize({
        auth_token: storedAuthToken,
        identity: APP_IDENTITY,
      })
    : wallet.authorize({
      cluster: 'devnet',
      identity: APP_IDENTITY,
  }));

  // Sign the payload with the provided address from authorization.
  const signedMessages = wallet.signMessages({
    addresses: [authorizationResult.address].
    payloads: [messageBuffer]
  })

  return signedMessages;
});
```

</TabItem>
<TabItem value="signTransactions" label="signTransactions">

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  Keypair,
  clusterApiUrl,
  Connection,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

// If we have one, retrieve an authToken from a previous authorization.
const storedAuthToken = maybeGetStoredAuthToken(); // dummy placeholder function

const signedTransaction = await transact(async (wallet) => {
  // First, request for authorization from the wallet.
  const authorizationResult = await (storedAuthToken
    ? wallet.reauthorize({
        auth_token: storedAuthToken,
        identity: APP_IDENTITY,
      })
    : wallet.authorize({
      cluster: 'devnet',
      identity: APP_IDENTITY,
    }));

  // Connect to an RPC endpoint and get the latest blockhash, to include in
  // the transaction.
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const latestBlockhash = await connection.getLatestBlockhash();

  // Construct a transaction. This transaction uses web3.js `SystemProgram`
  // to create a transfer that sends lamports to randomly generated address.
  const keypair = Keypair.generate();
  const randomTransferTransaction = new Transaction({
    ...latestBlockhash,
    feePayer: authorizationResult.publicKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: authorizationResult.publicKey,
      toPubkey: keypair.publicKey,
      lamports: 1_000,
    }),
  );

  // Sign and return the transactions.
  const signedTransactions: await wallet.signTransactions({
    transactions: [memoProgramTransaction],
  });

  return signedTransactions[0];
});
```

</TabItem>
</Tabs>

## Send a Transaction

Once a `Transaction` is signed by the appropriate accounts, it can be submitted to the Solana network via RPC.

Use the `Connection` class that provides an RPC functions conforming to the Solana [JSON RPC API](https://docs.solana.com/api/http).

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

const signedTransaction = await transact((wallet) => {
  /* ...signing code from above... */
});

const signature = await sendTransaction(transaction, connection);

await connection.confirmTransaction(signature, "confirmed");
```

The result from `sendTransaction` is a base58 encoded transaction signature. Using `confirmTransaction`, you can check that the transaction was `confirmed` by the network. For other commitment levels, read about [Commitment Status](https://docs.solana.com/cluster/commitments).

### Sign and Send with MWA

An alternative option for submitting transactions is for the dApp to send a `signAndSendTransactions` MWA request to a wallet.

This request sends an unsigned transaction to the wallet. If authorized, the wallet will then sign the transaction and send it to the network with its own implementation.

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

const signature = await transact((wallet) => {
  const authorizationResult = await(
    storedAuthToken
      ? wallet.reauthorize({
          auth_token: storedAuthToken,
          identity: APP_IDENTITY,
        })
      : wallet.authorize({
          cluster: "devnet",
          identity: APP_IDENTITY,
        })
  );

  const latestBlockhash = await connection.getLatestBlockhash();

  const keypair = Keypair.generate();
  const randomTransferTransaction = new Transaction({
    ...latestBlockhash,
    feePayer: authorizationResult.publicKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: authorizationResult.publicKey,
      toPubkey: keypair.publicKey,
      lamports: 1_000,
    })
  );

  // Send the unsigned transaction, the wallet will sign and submit it to the network,
  // returning the transaction signature.
  const transactionSignatures = await wallet.signAndSendTransactions({
    transactions: [randomTransferTransaction],
  });

  return transactionSignatures[0];
});

const confirmationResult = await connection.confirmTransaction(
  signature,
  "confirmed"
);

if (confirmationResult.value.err) {
  // Transaction was unsuccessfully submitted.
  throw new Error(JSON.stringify(confirmationResult.value.err));
}
```

## Next Steps

- Follow the [First dApp Tutorial](/react-native/first_app_tutorial.md) to learn how to use our starter dApp scaffold, create UI components, and record a public message on the Solana Blockchain.

- See our collection of [Sample Apps](/sample-apps/sample_app_overview) to reference a full React Native app.

- Dive into the [**Solana Program Library (SPL)**](https://spl.solana.com/) to learn about more interesting Solana Programs, like the [Token Program](https://spl.solana.com/token) used to create NFTs!
