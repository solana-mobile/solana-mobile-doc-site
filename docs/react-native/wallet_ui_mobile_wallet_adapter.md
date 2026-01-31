import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mobile Wallet Adapter

This guide covers how to integrate [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter) (MWA) into your React Native app using [Wallet UI](https://github.com/wallet-ui/wallet-ui), a community library that provides a streamlined React hook-based API for connecting to Solana wallets.

## Prerequisites

- **Android only** - This library currently supports Android devices only
- An existing Expo or React Native project. If using Expo, you must use a [custom dev build](https://docs.expo.dev/develop/development-builds/introduction/) rather than Expo Go, since native modules are required.
- `expo-dev-client` is recommended for Expo projects to enable testing on physical devices

## Step 1: Install Dependencies

First, detect your package manager by checking which lockfile exists in your project root, then install the required packages.

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @wallet-ui/react-native-web3js \
  react-native-quick-crypto \
  @solana/web3.js \
  expo-dev-client
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @wallet-ui/react-native-web3js \
  react-native-quick-crypto \
  @solana/web3.js \
  expo-dev-client
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @wallet-ui/react-native-web3js \
  react-native-quick-crypto \
  @solana/web3.js \
  expo-dev-client
```

</TabItem>
<TabItem value="bun" label="bun">

```bash
bun add @wallet-ui/react-native-web3js \
  react-native-quick-crypto \
  @solana/web3.js \
  expo-dev-client
```

</TabItem>
</Tabs>

## Step 2: Configure Polyfills

Solana libraries require crypto polyfills in React Native. This step is critical for the SDK to work properly.

**A. Create `polyfill.js` in the project root:**

```javascript
// polyfill.js
import { install } from 'react-native-quick-crypto';

install();
```

**B. Create or update `index.js` in the project root:**

This file ensures polyfills load before the app starts.

```javascript
// index.js
import './polyfill';
import 'expo-router/entry'; // If using Expo Router

// If NOT using Expo Router, use:
// import { AppRegistry } from 'react-native';
// import App from './App';
// AppRegistry.registerComponent('main', () => App);
```

**C. Update `package.json`:**

Point the `main` entry to your new `index.js` and update the scripts to use the Expo Dev Client:

```json
{
  "main": "./index.js",
  "scripts": {
    "android": "expo run:android"
  }
}
```

:::warning
The Dev Client script (`expo run:android`) is required because native polyfills from `react-native-quick-crypto` must be compiled into the app. Using `expo start` alone will fail.
:::

## Step 3: Setup Provider

Wrap your application root (e.g., in `app/_layout.tsx` or `App.tsx`) with `MobileWalletProvider`.

```tsx
import { MobileWalletProvider } from '@wallet-ui/react-native-web3js';
import { clusterApiUrl } from '@solana/web3.js';

const chain = 'solana:devnet';
const endpoint = clusterApiUrl('devnet');

const identity = {
  name: 'My Solana App',
  uri: 'https://mysolanaapp.com',
  icon: 'favicon.png', // Must be a relative path to the uri above
};

export default function RootLayout() {
  return (
    <MobileWalletProvider chain={chain} endpoint={endpoint} identity={identity}>
      {/* Your App Navigation/Content */}
    </MobileWalletProvider>
  );
}
```

## Connect and Disconnect

Use the `useMobileWallet` hook to connect and disconnect from a wallet.

```tsx
import { useMobileWallet } from '@wallet-ui/react-native-web3js';
import { Button, Text, View } from 'react-native';

export function ConnectWallet() {
  const { account, connect, disconnect } = useMobileWallet();

  if (account) {
    return (
      <View>
        <Text>Connected: {account.address.toString()}</Text>
        <Button title="Disconnect" onPress={disconnect} />
      </View>
    );
  }

  return <Button title="Connect Wallet" onPress={connect} />;
}
```

## Sign a Message

Use the `signMessage` function to request an off-chain message signature. The function expects a `Uint8Array`, so use `TextEncoder` to convert plain strings to bytes.

```tsx
import { useMobileWallet } from '@wallet-ui/react-native-web3js';
import { Button } from 'react-native';

export function SignMessageButton() {
  const { signMessage } = useMobileWallet();

  const handleSign = async () => {
    try {
      const message = 'Verify this message';
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);
      console.log('Signed:', Buffer.from(signature).toString('base64'));
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  return <Button title="Sign Message" onPress={handleSign} />;
}
```

:::tip
Use `new TextEncoder().encode(str)` to convert plain strings to `Uint8Array`. The `toUint8Array` helper from the library is for decoding base64 strings, not plain text.
:::

## Sign In with Solana (SIWS)

Use the `signIn` method for authentication using the [Sign In With Solana](https://github.com/phantom/sign-in-with-solana) standard. This combines authorization and message signing into one step.

:::note
The example below demonstrates client-side SIWS. For production apps, you'll typically want to verify the signed message on your backend server to establish an authenticated session. See the [Phantom SIWS documentation](https://github.com/phantom/sign-in-with-solana) for the full specification and server-side verification details.
:::

```tsx
import { useMobileWallet } from '@wallet-ui/react-native-web3js';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export function SignInButton() {
  const { account, signIn } = useMobileWallet();
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = async () => {
    try {
      await signIn({
        domain: 'your-app-domain.com',
        statement: 'Sign in to Your App',
      });
      setSignedIn(true);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (!account) return null;

  if (signedIn) {
    return <Text>Signed in with Solana</Text>;
  }

  return <Button title="Sign In with Solana" onPress={handleSignIn} />;
}
```

**SignInPayload options:**
- `domain` - Your app's domain (required for verification)
- `statement` - Human-readable message shown to user
- `uri` - URI of your app
- `nonce` - Random string for replay protection
- `issuedAt` - ISO timestamp
- `expirationTime` - ISO timestamp for expiration

## Sign and Send a Transaction

Use `signAndSendTransaction` to sign and submit a transaction to the network in one step.

```tsx
import { useMobileWallet } from '@wallet-ui/react-native-web3js';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { Button } from 'react-native';

export function SendTransactionButton() {
  const { account, signAndSendTransaction, connection } = useMobileWallet();

  const handleSend = async () => {
    if (!account) return;

    try {
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext();

      const transaction = new Transaction({
        feePayer: account.publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: account.publicKey,
          toPubkey: new PublicKey('RECIPIENT_ADDRESS_HERE'),
          lamports: 1000,
        })
      );

      const signature = await signAndSendTransaction(transaction, minContextSlot);
      console.log('Transaction sent:', signature);

      // Wait for confirmation
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });
      console.log('Transaction confirmed');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return <Button title="Send Transaction" onPress={handleSend} />;
}
```

## Common Issues

### "Crypto not found" or "Buffer is not defined"
- Ensure `polyfill.js` is imported at the very top of `index.js`
- Ensure `package.json` `main` field points to `index.js`

### "input is not valid base64 encoded data" when signing messages
- You're using `toUint8Array()` with a plain string (it expects base64 input)
- Use `new TextEncoder().encode(message)` for plain text messages

### Build failures after installing dependencies
- Ensure `expo-dev-client` is installed
- Re-run `npx expo run:android` to rebuild the native app

### Wallet not connecting
- Ensure a compatible wallet (Phantom, Solflare, etc.) is installed on the device/emulator
- Check that your app's deep linking is properly configured

### "Objects are not valid as a React child"
- You're trying to render a `PublicKey` object directly
- Call `.toString()` or `.toBase58()` on the object (e.g., `{account.address.toString()}`)

### "SolanaMobileWalletAdapterProtocolError: -32602"
- The `identity.icon` is set to an absolute URL
- Use a relative path (e.g., `favicon.png`) relative to your `identity.uri`

## Next Steps

- For lower-level control, see how to [invoke MWA sessions directly](/react-native/using_mobile_wallet_adapter)
- Browse the [Sample Apps](/sample-apps/sample_app_overview) for complete React Native examples
- View the [Anchor Integration guide](/react-native/anchor_integration) to interact with Anchor programs
