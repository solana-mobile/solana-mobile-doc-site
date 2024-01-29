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
yarn install @solana-mobile/mobile-wallet-adapter-protocol-web3js \
             @solana-mobile/mobile-wallet-adapter-protocol
```

</TabItem>
<TabItem value="npm" label="npm">

```bash
npm install @solana-mobile/mobile-wallet-adapter-protocol-web3js \
            @solana-mobile/mobile-wallet-adapter-protocol \
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

**Authorization Result**

If the user approves, the wallet returns an `AuthorizationResult` response that contains the user's authorized wallet `accounts`, an `auth_token`, and `wallet_uri_base`.

In practice, most wallet apps currently only support single account authorization, so there will be at most 1 item in `accounts`.

```ts
type AuthorizationResult = Readonly<{
  accounts: Account[];
  auth_token: AuthToken;
  wallet_uri_base: string;
  sign_in_result?: SolanaSignInOutput;
}>;
```

See the [SDK reference](/reference/typescript/mobile-wallet-adapter#web3mobilewalletauthorize) for a full explanation of the `AuthorizationResult` response type.

### Connecting with an `auth_token`

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

## Sign in with Solana

To connect to a wallet and simultaneously verify the user's ownership of the wallet, use the [_Sign in with Solana_](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#introduction) feature.
_SIWS_ combines the `authorize` and `signMessage` step and returns a `SolanaSignInOutput` that can be verified by the dApp.

To initiate _SIWS_, include the optional `sign_in_payload` parameter in the `authorize` request. If provided, the wallet
will display a dedicated _SIWS_ UI and prompt the user to sign in by signing the `statement` message.

```tsx
const signInResult = await transact(async (wallet: Web3MobileWallet) => {
  const authorizationResult = await wallet.authorize({
    chain: 'solana:devnet',
    identity: APP_IDENTITY,
    sign_in_payload: {
      domain: 'yourdomain.com',
      statement: 'Sign into React Native Sample App',
      uri: 'https://yourdomain.com',
    },
  });

  return authorizationResult.sign_in_result;
}
```

### Verifying the sign-in result

If approved, the wallet will include a `sign_in_result` payload in the `AuthorizationResult` response. The dApp can then
verify that the `sign_in_result` was correctly signed by the user's wallet.

The `@solana/wallet-standard-util` library provides a `verifySignIn` helper method for SIWS message and signature verification.

```typescript
import type {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";

export function verifySIWS(
  input: SolanaSignInInput,
  output: SolanaSignInOutput
): boolean {
  const serialisedOutput: SolanaSignInOutput = {
    account: {
      publicKey: new Uint8Array(output.account.publicKey),
      ...output.account,
    },
    signature: new Uint8Array(output.signature),
    signedMessage: new Uint8Array(output.signedMessage),
  };
  return verifySignIn(input, serialisedOutput);
}
```

See the [Phantom SIWS docs](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#dapp-integration) for more information. It is written for web dApps, but can be extrapolated for mobile dApps.

## Signing and sending a transaction

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsignandsendtransactions" />

To request a wallet to sign and then send a Solana transaction, use the `signAndSendTransactions` method. With this method,
the wallet will handle both signing the transactions then submitting them to the Solana network.

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
  // Authorize the wallet session
  const authorizationResult = await wallet.authorize({
    cluster: "solana:devnet",
    identity: APP_IDENTITY,
  });

  // Convert base64 address to web3.js PublicKey class
  const authorizedPubkey = new PublicKey(
    toByteArray(authorizationResult.accounts[0].address)
  );

  // Construct an instruction to transfer 1,000,000 lamports to a randomly generated account
  const randomKeypair = Keypair.generate();
  const instructions = [
    SystemProgram.transfer({
      fromPubkey: authorizedPubkey,
      toPubkey: randomKeypair.publicKey,
      lamports: 1_000_000,
    }),
  ];

  // Construct the Versioned message and transaction.
  const txMessage = new TransactionMessage({
    payerKey: authorizedPubkey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToV0Message();

  const transferTx = new VersionedTransaction(txMessage);

  // Send the unsigned transaction, the wallet will sign and submit it to the network,
  // returning the transaction signature.
  const transactionSignatures = await wallet.signAndSendTransactions({
    transactions: [transferTx],
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
  /* ...building transaction code... */

  const transferTx = new Transaction({
    ...latestBlockhash,
    feePayer: authorizedPubkey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: authorizedPubkey,
      toPubkey: toPublicKey,
      lamports: 1_000_000,
    })
  );

  // Send the unsigned transaction, the wallet will sign and submit it to the network,
  // returning the transaction signature.
  const transactionSignatures = await wallet.signAndSendTransactions({
    transactions: [transferTx],
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

The result from sending a transaction is a base58 transaction signature (or transaction ID). This transaction signature can be used to uniquely identify your transaction on the ledger.

Using `confirmTransaction`, you can check that the transaction was `confirmed` by the network. For other commitment levels, read about [Commitment Status](https://docs.solana.com/cluster/commitments).

## Signing Transactions

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsigntransactions" />

Alternatively, you can request the wallet to just sign a transaction by issuing a `signTransactions` request.

<Tabs>
<TabItem value="versionedTransaction" label="Versioned Transactions">

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { toByteArray } from "react-native-quick-base64";

// Connect to an RPC endpoint and get the latest blockhash, to include in
// the transaction.
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const latestBlockhash = await connection.getLatestBlockhash();

const signedTx = await transact(async (wallet) => {
  /* ...transaction code from above... */
  const transferTx = new VersionedTransaction(txMessage);

  // Request to sign the transaction
  const signedTxs = await wallet.signTransactions({
    transactions: [transferTx],
  });

  return signedTxs[0];
});
```

</TabItem>
<TabItem value="legacyTransaction" label="Legacy Transactions">

```tsx
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import {
  Keypair,
  clusterApiUrl,
  Connection,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

// Connect to an RPC endpoint and get the latest blockhash, to include in
// the transaction.
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const latestBlockhash = await connection.getLatestBlockhash();

const signedTx = await transact(async (wallet) => {
  /* ...transaction code from above... */

  // Sign and return the transactions.
  const signedTransactions = await wallet.signTransactions({
    transactions: [randomTransferTransaction],
  });

  return signedTransactions[0];
});
```

</TabItem>
</Tabs>

The response returned will be a signed `Transaction` that can be submitted to an RPC endpoint with the `sendTransaction` function from the `Connection` class.

## Signing messages

<CTAButton label="API Reference" to="/reference/typescript/mobile-wallet-adapter#web3mobilewalletsignmessages" />

To request off-chain message signing, issue a `signMessages` request. In this case, a _message_ is any payload of bytes.

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
      cluster: 'solana:devnet',
      identity: APP_IDENTITY,
  });

  // Request to sign the payload with the authorized account.
  const signedMessages = wallet.signMessages({
    addresses: [authorizationResult.accounts[0].address].
    payloads: [messageBuffer]
  })

  return signedMessages;
});
```

The response returned will be an `Uint8Array[]`, where each item corresponds to the signed message input.

## Next Steps

- Browse the collection of [Sample Apps](/sample-apps/sample_app_overview) to reference a full Solana React Native app.

- View the [Anchor Integration guide](/react-native/anchor_integration) to learn how to interact with Anchor programs in React Native.
