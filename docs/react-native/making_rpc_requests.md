import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Making RPC requests

To interface with the Solana network, a client needs to construct and send [_JSON RPC requests_](https://docs.solana.com/api/http) to an [_RPC endpoint_](https://docs.solana.com/cluster/rpc-endpoints).

## Add dependencies

The [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) library provides a convenient RPC client [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) class that has an API for submitting RPC requests to a JSON RPC endpoint.

<Tabs>
<TabItem value="yarn" label="yarn">

```bash
yarn install @solana/web3.js \
             react-native-get-random-values \
             buffer
```

</TabItem>
<TabItem value="npm" label="npm">

```bash
npm install @solana/web3.js \
             react-native-get-random-values \
             buffer
```

</TabItem>
</Tabs>

### Add polyfills

After installing, ensure you have also added these [polyfills](/react-native/setup#step-3-update-indexjs-with-polyfills) to the `index.js` of your React native app. These are needed in some parts of `@solana/web3.js` because it is originally written as a web/node library and, as a result, certain expected APIs are missing in a React Native environment.

## Creating a `Connection` client

The `Connection` class represents a connection to a Solana RPC endpoint and provides convenient functions to make RPC requests.

Construct a `Connection` client by passing in an RPC endpoint and an optional [commitment](https://docs.solana.com/cluster/commitments) config:

```typescript
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
```

The `Connection` class created can be reused throughout your application.

### Usage

After creation, call various asynchronous RPC functions and receive responses from the RPC endpoint.

```typescript
// `getLatestBlockhash` RPC request
const blockhash = await connection.getLatestBlockhash();

// `getBalance` RPC request
const balanceInLamports = await connection.getBalance();

// Sending a Transaction
const txSignature = await sendTransaction(tx);
```

View the [official documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) to see the full list of available RPC functions, parameter types, and response types.

## Next steps

- Read the following _Building transactions_ guide to learn how to create transactions that interact with on-chain Solana Programs.
- Browse the [full list](https://docs.solana.com/api/http) of Solana RPC HTTP Methods
