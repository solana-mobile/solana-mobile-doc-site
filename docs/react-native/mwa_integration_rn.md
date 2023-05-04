import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Native Integration Guide

:::note
This page is a work in progress. More content is being worked on and will being added soon!
:::

The [**Mobile Wallet Adapter Javascript library**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages) is an implementation of the [Mobile Wallet Adapter](../getting-started/overview#mobile-wallet-adapter) protocol in [React Native](https://reactnative.dev/docs/getting-started). It provides a library of classes and methods to start a session between your dApp and a wallet app, in which you can issue API calls to it (eg. *sign_messages*) as per the spec. 

### Library overview
[`@solana-mobile/mobile-wallet-adapter-protocol`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) is a React Native npm package that provides an implementation of the Mobile Wallet Adapter protocol, enabling interaction with MWA-compatible wallets.

[`@solana-mobile/mobile-wallet-adapter-protocol-web3js`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js) is a convenience wrapper package around `mobile-wallet-adapter-protocol` enabling use of common primitives from @solana/web3.js – such as [`Transaction`](https://solana-labs.github.io/solana-web3.js/classes/Transaction.html) and `Uint8Array`.


This integration guide will teach you how to integrate a dApp with these libraries to enable wallet signing and sending services.

### What you will learn
- How to connect a wallet with `transact`.
- How to request wallet authorization.
- Handle subsequent connections to the wallet.
- Prepare and request transaction/message signing.

## Connect to a wallet

To connect to a wallet, use the [`transact`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol-web3js/src/transact.ts) function from `@solana-mobile/mobile-wallet-adapter-protocol-web3js`. 

The `transact` method starts a session with a locally installed MWA-compatible wallet app. Within the callback, use
`wallet` to send requests for signing or sending transactions/messages.

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

await transact(async (wallet) => {
    /* ... */
});
```

## Authorizing a wallet
After starting a session with a wallet app with `transact`, you should first request authorization for your app with a call to [`authorize`](https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/com/solana/mobilewalletadapter/clientlib/AdapterOperations.html#authorize(Uri,Uri,String,RpcCluster)).

When requesting `authorization`, include an [App Identity](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/js/packages/mobile-wallet-adapter-protocol/src/types.ts#L13) to the request so users can recognize your app during the authorization flow.
- `name`: The name of your app.
- `uri`: The web URL associated with your app.
- `icon`: A relative path to your app icon.

```tsx
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {AuthorizeAPI} from '@solana-mobile/mobile-wallet-adapter-protocol';

export const APP_IDENTITY = {
  name: 'React Native dApp',
  uri:  'https://yourdapp.com'
  icon: "./favicon.ico",
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
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

await transact(async (wallet) => {
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

  // Construct a transaction. This transaction uses web3.js `SystemProgram`
  // to create a transfer that sends lamports to randomly generated address.
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
    }),
  );

  // Sign and return the transactions.
  const signedTransactions: await wallet.signTransactions({
    transactions: [memoProgramTransaction],
  });

  return signedTransactions;
});
```

</TabItem>
</Tabs>

