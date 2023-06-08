--- 
title: Hello World React Native Tutorial
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SideBySideLayout from "../../src/layouts/SideBySideLayout"

In this tutorial, we'll walk you through the process of setting up an Android React Native project and use the [Mobile Wallet Adapter Javascript library](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages) to build a simple user interface that allows you to connect to a mobile wallet, request an airdrop, and send a message to the Solana network. 

By the end of this tutorial, you'll have an understanding of how to use the Solana Mobile SDK to build dApps that can interact with the Solana Blockchain.

## What you will learn
- How to set up a React Native Android project and integrate the Mobile Wallet Adapter library.
- How to use Mobile Wallet Adapter to connect to an installed wallet app.
- How to connect to devnet, check your wallet balance, and request an airdrop of SOL.
- How to use the memo program to write your message to the network and see your message on the blockchain!

## Prerequisites
Read the [**prerequisite setup**](../getting-started/development-setup) guide before starting the tutorial. This tutorial will be using the [fakewallet](../getting-started/development-setup#3-install-a-wallet-app) app to test your app's integration with Mobile Wallet Adapter.

### Clone the tutorial repo

Clone the [tutorial repo](https://github.com/solana-mobile/tutorial-apps/tree/main/SolanaReactNativeTutorial) from github. 
```shell
git clone https://github.com/solana-mobile/tutorial-apps.git
cd SolanaReactNativeTutorial
```
There should be two folders:
- `SolanaReactNativeTutorialStarter`: A boilerplate app with the MWA packages/dependencies ready and starter code that we'll be building up throughout the tutorial.
- `SolanaReactNativeTutorialComplete`: The complete version of the app and the end product of the tutorial.

### First run

Move into the starter project directory, install dependencies, and try running the app.

```shell
cd SolanaReactNativeTutorialStarter && yarn install && npx react-native start
```

In the Metro bundler menu, select the android option to build and launch the app in your device. Make changes to `MainScreen.tsx` and you can see your app update immediately, due to React Native's [*Fast Refresh*](https://reactnative.dev/docs/fast-refresh) feature.

## Connect to a wallet

Wallet apps manage your wallet's private key and can do actions like signing and sending transactions/messages. You will learn how use the [Mobile Wallet Adapter JS library](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) to connect your dApp to the `fakewallet` app.

### Build a connect button
In `ConnectButton.tsx`:
- Use the `transact` function to start a session with a wallet app. 
- Then within the session, request wallet authorization for the dApp. 
- Save the results of authorization in the parent component's state.

After successful authorization, the dApp receives an `AuthorizationResult` object from `authorize`. It contains a list of `accounts` and an `authToken`.
Each account object contains useful information like the account's address (or `publicKey`) and account label. The `authToken` will be used for `reauthorization` in future `transact`'s with the wallet. 

In `MainScreen.tsx`:
- Render the `ConnectButton` component below the `ScrollView`.
- Create `authorization` state and `setAuthorization` within `onConnect`.

<Tabs>
<TabItem value="ConnectButton" label="ConnectButton">

```tsx
export default function ConnectButton({onConnect}: ConnectButtonProps) {
  const onPress = async () => {
    await transact(async wallet => {
      // Transact starts a session with the wallet app during which our app
      // can send actions (like `authorize`) to the wallet.
      const authResult: AuthorizationResult = await wallet.authorize({
        cluster: 'devnet',
        identity: APP_IDENTITY,
      });
      const {accounts, auth_token} = authResult;

      // After authorizing, store the authResult with the onConnect callback we pass into the button
      onConnect({
        address: accounts[0].address,
        label: accounts[0].label,
        authToken: auth_token,
        publicKey: getPublicKeyFromAddress(accounts[0].address),
      });
    });
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Connect Wallet</Text>
    </TouchableOpacity>
  );
}
```

</TabItem>
<TabItem value="MainScreen" label="MainScreen">

```tsx
export default function MainScreen() {
  const {connection} = useConnection();
  const [message, setMessage] = useState<string>('');
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null,
  );
  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello Solana!</Text>
          </View>

          {/* Text Input */}
          <View>
            <Text style={styles.inputHeader}>What's on your mind?</Text>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              onChangeText={text => setMessage(text)}
              placeholder="Write your message here"
            />
          </View>
        </ScrollView>
        <ConnectButton
          onConnect={async (authorization: Authorization) => {
            setAuthorization(authorization);
          }}
        />
      </View>
    </>
  );
}
```

</TabItem>
</Tabs>

### Build a disconnect button

We also want to give the users the option to disconnect their wallet from the app. We'll use a `deauthorize` request to invalidate the provided `authToken`.

In `DisconnectButton.tsx`:
- Pass in the stored `authorization` and, within a `transact` session, send a `deauthorize` request to the wallet for the stored `authToken`.

In `MainScreen.tsx`:
- Conditionally render the `ConnectButton` or `DisconnectButton`.
- Pass in `onDisconnect` as props, setting the stored `authorization` state to null.

<Tabs>
<TabItem value="DisconnectButton" label="DisconnectButton">

```tsx
export default function DisconnectButton({
  onDisconnect,
  authorization,
}: DisconnectButtonProps) {
  const onPress = async () => {
    await transact(async wallet => {
      // The deauthorize request will invalidate the authToken.
      await wallet.deauthorize({
        auth_token: authorization.authToken,
      });
      // Set stored authorization state to null through onDisconnect callback
      onDisconnect();
    });
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Disconnect Wallet</Text>
    </TouchableOpacity>
  );
}

```

</TabItem>
<TabItem value="MainScreen" label="MainScreen">

```tsx
export default function MainScreen() {
  const {connection} = useConnection();
  const [message, setMessage] = useState<string>('');
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null,
  );
  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello Solana!</Text>
          </View>

          {/* Text Input */}
          <View>
            <Text style={styles.inputHeader}>What's on your mind?</Text>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              onChangeText={text => setMessage(text)}
              placeholder="Write your message here"
            />
          </View>
        </ScrollView>

        {/* Conditionally render connect or disconnect, 
            depending on if a wallet is connected */}
        {authorization === null ? (
          <ConnectButton
            onConnect={async (authorization: Authorization) => {
              setAuthorization(authorization);
            }}
          />
        ) : (
          <DisconnectButton
            authorization={authorization}
            onDisconnect={() => {
              setAuthorization(null);
            }}
          />
        )}
      </View>
    </>
  );
}

```

</TabItem>
</Tabs>

## View wallet account balance
After connecting to a wallet, we'll use the `connection` class from `useConnection` to view your wallet account's SOL balance on devnet. 

In `MainScreen.tsx`:
- Create a `balance` state and call `connection.getBalance(authorization.publicKey)` to fetch the wallet balance from devnet.
- Create a `useEffect` hook, that calls the fetches and updates the balance once connected to a wallet.
- Conditionally render the `AccountInfo` component if connected to a wallet.

In `AccountInfoSection.tsx`:
- The starter code includes function `convertLamportToSOL` because the number returned from `getBalance` is in units of [lamport](https://docs.solana.com/terminology#lamport).

:::note
The starter code handles wrapping the app with a `ConnectionProvider` in `App.tsx`, enabling the `useConnection` hook.
:::

<Tabs>
<TabItem value="AccountInfoSection" label="AccountInfoSection">

```tsx
export default function AccountInfoSection({
  authorization,
  balance,
}: AccountInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.walletBalance}>
          {balance !== null
            ? `Balance: ${convertLamportsToSOL(balance)} SOL`
            : 'Loading balance...'}
        </Text>
        <Text style={styles.walletName}>
          {authorization.label ?? 'Wallet name not found'}
        </Text>
        <Text style={styles.walletNameSubtitle}>{authorization.address}</Text>
      </View>
    </View>
  );
}

```
</TabItem>
<TabItem value="MainScreen" label="MainScreen">

```tsx
export default function MainScreen() {
  const {connection} = useConnection();
  const [message, setMessage] = useState<string>('');
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null,
  );
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = async (authorization: Authorization) => {
    // The ConnectionProvider (in App.tsx) is set to the devnet endpoint.
    const balance = await connection.getBalance(authorization.publicKey);
    console.log('Balance fetched: ' + balance);
    setBalance(balance);
  };

  useEffect(() => {
    // Fetch and update balance, if connected to a wallet.
    if (!authorization) {
      return;
    }
    fetchAndUpdateBalance(authorization);
  }, [authorization]);

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello Solana!</Text>
          </View>

          {/* Text Input */}
          <View>
            <Text style={styles.inputHeader}>What's on your mind?</Text>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              onChangeText={text => setMessage(text)}
              placeholder="Write your message here"
            />
          </View>

          {/* Conditionally render if connected to a wallet. */}
          {authorization !== null ? (
            <AccountInfo authorization={authorization} balance={balance} />
          ) : null}
        </ScrollView>
        {authorization === null ? (
          <ConnectButton
            onConnect={async (authorization: Authorization) => {
              setAuthorization(authorization);
            }}
          />
        ) : (
          <DisconnectButton
            authorization={authorization}
            onDisconnect={() => {
              setAuthorization(null);
            }}
          />
        )}
      </View>
    </>
  );
}
```
</TabItem>
</Tabs>

## Request a SOL airdrop
If you try connecting to the wallet at this point, you'll notice that you have 0 SOL tokens in your balance. 
In order to send transactions to devnet, we'll need to fund the account by requesting an airdrop. 

With `RequestAirdropButton`, use `connection.requestAirdrop(...)` to request an airdrop to your wallet's address (public key).

Then in `MainScreen`, render the new button and pass in `fetchAndUpdateBalance(authorization)` to the `onAirdropComplete` prop.

:::note
Unfortunately, airdropping on devnet is prone to flakiness and a request can often fail. If you are seeing a transaction confirmation error
at this step, it's most likely because due to this instability.
:::

<Tabs>
<TabItem value="RequestAirdropButton" label="RequestAirdropButton">

```tsx
export default function RequestAirdropButton({
  authorization,
  onAirdropComplete,
}: AccountInfoProps) {
  const {connection} = useConnection();

  const requestAirdrop = async () => {
    // SOL/Lamports will be airdropped to the wallet's address (public key).
    // Use Promise.all to also fetch the latest block hash in parallel.
    const [signature, latestBlockhash] = await Promise.all([
      connection.requestAirdrop(authorization.publicKey, LAMPORTS_PER_AIRDROP),
      connection.getLatestBlockhash(),
    ]);

    // Confirm that the airdrop was successful.
    return await connection.confirmTransaction({
      signature: signature,
      ...latestBlockhash,
    });
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={async () => {
        const result = await requestAirdrop();
        const error = result?.value?.err;
        if (error) {
          console.log(
            'Failed to fund account: ' +
              (error instanceof Error ? error.message : error),
          );
        } else {
          // Fetch and update balance if airdrop is successful
          onAirdropComplete(authorization);
        }
      }}>
      <Text style={styles.buttonText}>Request airdrop</Text>
    </TouchableOpacity>
  );
}
```
</TabItem>
<TabItem value="MainScreen" label="MainScreen">

```tsx
export default function MainScreen() {
  const {connection} = useConnection();
  const [message, setMessage] = useState<string>('');
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null,
  );
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = async (authorization: Authorization) => {
    // The ConnectionProvider (in App.tsx) is set to the devnet endpoint.
    const balance = await connection.getBalance(authorization.publicKey);
    console.log('Balance fetched: ' + balance);
    setBalance(balance);
  };

  useEffect(() => {
    // Fetch and update balance, after connecting to a wallet.
    if (!authorization) {
      return;
    }
    fetchAndUpdateBalance(authorization);
  }, [authorization]);

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello Solana!</Text>
          </View>

          {/* Text Input */}
          <View>
            <Text style={styles.inputHeader}>What's on your mind?</Text>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              onChangeText={text => setMessage(text)}
              placeholder="Write your message here"
            />
          </View>

          {/* Conditionally render if connected to a wallet. */}
          {authorization !== null ? (
            <AccountInfo authorization={authorization} balance={balance} />
          ) : null}
          <View style={styles.buttonGroup}>
            {authorization !== null ? (
              <RequestAirdropButton
                authorization={authorization}
                onAirdropComplete={(authorization: Authorization) => {
                  fetchAndUpdateBalance(authorization);
                }}
              />
            ) : null}
          </View>
        </ScrollView>
        {authorization === null ? (
          <ConnectButton
            onConnect={async (authorization: Authorization) => {
              setAuthorization(authorization);
            }}
          />
        ) : (
          <DisconnectButton
            authorization={authorization}
            onDisconnect={() => {
              setAuthorization(null);
            }}
          />
        )}
      </View>
    </>
  );
}
```
</TabItem>
</Tabs>

## Record a message to the blockchain
### Construct and send a transaction
After receiving an airdrop successfully, you should see your SOL balance update to `0.1`. You can now pay the fee to send a transaction to record the message on the network. To do so, we'll be invoking an [on-chain program](https://docs.solana.com/developing/intro/programs#on-chain-programs) called the [`MemoProgram`](https://spl.solana.com/memo).

In `RecordMessageButton.tsx`, create a function `recordMessage` that:
- Constructs the `MemoProgram` Transaction.
- Sends a `signAndSendTransaction` request to the wallet.
- The wallet then signs the transaction with the private key and sends it to devnet.

<Tabs>
<TabItem value="recordMessage" label="recordMessage">

```tsx
// Takes in a `Buffer` type that represents the message string.
async function recordMessage(
  connection: Connection,
  authorization: Authorization,
  messageBuffer: Buffer,
): Promise<[string, RpcResponseAndContext<SignatureResult>]> {
  const [signature] = await transact(async wallet => {
    // Start a wallet session with `transact` and `reauthorize` our dApp by passing in the `authToken`.
    // Use Promise.all to also fetch the latest block hash in parallel.
    const [authResult, latestBlockhash] = await Promise.all([
      wallet.reauthorize({
        auth_token: authorization.authToken,
        identity: APP_IDENTITY,
      }),
      connection.getLatestBlockhash(),
    ]);

    // Construct a `Transaction` with an instruction to invoke the `MemoProgram`.
    const memoProgramTransaction = new Transaction({
      ...latestBlockhash,
      feePayer: authorization.publicKey,
    }).add(
      new TransactionInstruction({
        data: messageBuffer,
        keys: [],
        programId: new PublicKey(
          'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr', // Memo Program address
        ),
      }),
    );

    // Send a `signAndSendTransactions` request to the wallet. The wallet will sign the transaction with the private key and send it to devnet.
    return await wallet.signAndSendTransactions({
      transactions: [memoProgramTransaction],
    });
  });

  const latestBlockhash = await connection.getLatestBlockhash();
  return [
    signature,
    await connection.confirmTransaction({
      signature: signature,
      ...latestBlockhash,
    }),
  ];
}
```

</TabItem>
<TabItem value="RecordMessageButton" label="RecordMessageButton">

```tsx
export default function RecordMessageButton({
  authorization,
  message,
}: RecordMessageButtonProps) {
  const {connection} = useConnection();
  const buttonDisabled = message === null || message.length === 0;
  const buttonStyle = buttonDisabled ? styles.disabled : styles.enabled;
  return (
    <TouchableOpacity
      disabled={buttonDisabled}
      style={[styles.button, buttonStyle]}
      onPress={async () => {
        const result = await recordMessage(
          connection,
          authorization,
          new TextEncoder().encode(message) as Buffer,
        );
        if (result) {
          const [signature, response] = result;
          const err = response.value.err;
          if (err) {
            console.log(
              'Failed to record message:' +
                (err instanceof Error ? err.message : err),
            );
          } else {
            const explorerUrl =
              'https://explorer.solana.com/tx/' +
              signature +
              '?cluster=' +
              WalletAdapterNetwork.Devnet;
            console.log(
              'Successfully recorded a message. View your message at: ' +
                explorerUrl,
            );
            // TODO: Add an alert to give the user an option to click the link.
          }
        }
      }}>
      <Text style={styles.buttonText}>Record message</Text>
    </TouchableOpacity>
  );
}
```

</TabItem>
</Tabs>

### View your message on explorer
If this transaction is successful, you can use the [Solana Explorer](https://explorer.solana.com/) to see your message on the blockchain itself.

On the success case, add an `Alert` to give the user the option to click a link and navigate to the `explorerUrl`.

```tsx
Alert.alert(
       'Success!',
       'Your message was successfully recorded. View your message on Solana Explorer:',
    [
       { text: 'View', onPress: () => Linking.openURL(explorerUrl) },
       { text: 'Cancel', style: 'cancel' },
    ]
);
```

You should now be seeing the alert after clicking the `RecordMessageButton`.

***Congratulations!***

You've successfully recorded your message onto the Solana blockchain and created a functioning Solana Mobile dApp!  🎉


## Next steps

Explore guides and SDK references to learn more and create more advanced applications. Here are some links to explore:

### Sample App Collection
- If you want to see more examples of dApps, then check out this [curated list](../sample-apps/sample_app_overview) of Solana mobile sample apps. It also includes a more [robust version of the app](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app) built in this tutorial.

### Guides/References
- [web3.js Javascript SDK reference](https://solana-labs.github.io/solana-web3.js/)
- [Writing your own Solana programs](https://docs.solana.com/developing/on-chain-programs/overview)


