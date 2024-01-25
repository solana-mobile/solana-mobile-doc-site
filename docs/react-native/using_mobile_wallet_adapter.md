import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

# Using Mobile Wallet Adapter

The Mobile Wallet Adapter protocol is a spec that enables a secure communication exchange between a dApp and an MWA-compliant wallet app installed on the device.

Mobile Wallet Adapter 2.0 is the newest and current version of the Mobile Wallet Adapter protocol. The complete 2.0 spec is viewable [here](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

## Add dependencies

Solana Mobile has published two React Native libraries to use Mobile Wallet Adapter.

- [`@solana-mobile/mobile-wallet-adapter-protocol`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) is the core library that implements the Mobile Wallet Adapter protocol for React Native.
- [`@solana-mobile/mobile-wallet-adapter-protocol-web3js`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js) is a convenience wrapper package around the core library that enables use of common types from `@solana/web3.js` – such as `Transaction` and `Uint8Array`.

These libraries provide a convenient API to connect, issue signing requests to a locally installed wallet app, and receive responses.

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

## Establishing an MWA session

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#transact" />

To establish a session, or request to 'connect', with an MWA wallet, use the `transact` method provided by `@solana-mobile/mobile-wallet-adapter-protocol-web3js`.

Calling `transact` dispatches an assocication intent to a locally installed MWA wallet app and prompts the user to approve or reject the connection request.

Once session is established, the user can begin issuing MWA requests and receiving responses from the wallet app within the provided `callback`.

```tsx
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

await transact(async (wallet: Web3MobileWallet) => {
  /* ...In callback, send requests to `wallet`... */
});
```

:::tip
Use the `transact` function from `@solana-mobile/mobile-wallet-adapter-protocol-web3js` rather than `@solana-mobile/mobile-wallet-adapter-protocol`.

The former provides convenient wrappers around common `web3.js` Solana types like `Transaction` while the latter provides base64 encoded byte payloads.
:::

## Connecting to a wallet

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletauthorize" />

After session establishment, you can connect to the wallet by issuing an [`authorize`](/reference/typescript/mobile-wallet-adapter#web3mobilewalletauthorize) request. This authorization step is required if you want to request signing services from the wallet.

Define the _App Identity_ of your dApp so that the wallet app can properly display your dApp info to the user.

- `name`: The name of your app.
- `uri`: The web URL associated with your app.
- `icon`: A path to your app icon relative to the app uri above.

```tsx
import {transact, Web3MobileWallet} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export const APP_IDENTITY = {
  name: 'React Native dApp',
  uri:  'https://yourdapp.com'
  icon: "favicon.ico", // Full path resolves to https://yourdapp.com/favicon.ico
};

const authorizationResult = await transact(async (wallet: Web3MobileWallet) => {
    const authorizationResult = await wallet.authorize({
        cluster: 'solana:devnet',
        identity: APP_IDENTITY,
    });

    /* After approval, signing requests are available in the session. */

    return authorizationResult;
});

console.log("Connected to: " + authorizationResult.accounts[0].address)
```

If the user approves, the wallet returns an `AuthorizationResult` response that contains the user's authorized wallet account, an `auth_token`, and `wallet_uri_base`.

See the [SDK reference](/reference/typescript/mobile-wallet-adapter#web3mobilewalletauthorize) for a full explanation of the `AuthorizationResult` response type.

```ts
type AuthorizationResult = Readonly<{
  accounts: Account[];
  auth_token: AuthToken;
  wallet_uri_base: string;
  sign_in_result?: SolanaSignInOutput;
}>;
```

In practice, most wallet apps currently only support single account authorization, so there will be at most 1 item in `accounts`.

### Connecting with an `auth_token`

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletreauthorize" />

For subsequent sessions with the wallet app, you can skip the authorization step by including an `auth_token` in the `authorize` request.

If valid, the user is able to skip the connection approval dialog for authorization.

```tsx
import {transact, Web3MobileWallet} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export const APP_IDENTITY = {
  name: 'React Native dApp',
  uri:  'https://yourdapp.com'
  icon: "./favicon.ico",
};

// If we have one, retrieve an authToken from a previous authorization.
const storedAuthToken = maybeGetStoredAuthToken(); // dummy placeholder function

await transact(async (wallet: Web3MobileWallet) => {
    // If we have a previously stored authToken, we can pass it into `authorize`.
    const authorizationResult = await wallet.authorize({
        chain: 'solana:devnet',
        identity: APP_IDENTITY,
        auth_token: storedAuthToken ? storedAuthToken: undefined,
    });

    // Rest of transact code goes below...
});
```

### Deauthorizing a wallet

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletdeauthorize" />

A dApp can revoke authorization or "disconnect" from a wallet by sending a `deauthorize` request.
The wallet invalidate the provided `authToken`.

```tsx
await transact(async (wallet) => {
  if (!previouslyStoredAuthToken) {
    return;
  }

  // Pass in the prior auth token to invalidate it.
  await wallet.deauthorize({ auth_token: previouslyStoredAuthToken });
});
```

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
