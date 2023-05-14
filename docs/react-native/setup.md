import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Native dApp Setup

### Prerequisites

Follow the [prerequisite setup](../getting-started/quickstart#prerequisite-setup) guide to set up your [Android Device/Emulator](../getting-started/quickstart#android-deviceemulator) and install a MWA-compatible wallet, like [fakewallet](../getting-started/quickstart#install-a-wallet-app).

:::note
If you're planning on developing React Native on Windows, you should consider setting up your dev environment with [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) to avoid build issues installing our libraries.
:::

### Clone Solana Mobile dApp Scaffold

The fastest way to start building React Native on Solana is cloning our [Solana Mobile React Native dApp Scaffold](https://github.com/solana-mobile/SolanaMobileDAppScaffold):

```shell
git clone https://github.com/solana-mobile/SolanaMobileDAppScaffold.git
```

The scaffold is a ready-to-go React Native dApp that comes with:
- The Mobile Wallet Adapter SDK and `@solana/web3.js`.
- Required polyfills like `react-native-get-random-values` and `Buffer` installed.
- Wallet authorization/connecting and airdrop request functionality.
- Premade React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `SignMessageButton`.


### Setting up a new React Native project

If you want to create a new React Native project from scratch then follow these steps. If you want to integrate an existing project with the SDK, then skip to [installing the dependencies](#step-2-install-dependencies).

As a prerequisite, follow the [React Native official documentation](https://reactnative.dev/docs/environment-setup) and set up your environment for Android.

#### Step 1: Initialize a new React Native project

```shell
npx react-native@latest init MySolanaMobileDapp
cd MySolanaMobileDapp
```

#### Step 2: Install dependencies

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  @solana/wallet-adapter-react \
  react-native-get-random-values \
  buffer
```

</TabItem>
<TabItem value="npm" label="npm">


```shell
npm install \
  @solana/web3.js \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
  @solana/wallet-adapter-react \
  react-native-get-random-values \
  buffer
```

</TabItem>
</Tabs>

<details>
<summary>A brief overview of each dependency:</summary>

- `@solana-mobile/mobile-wallet-adapter-protocol`: A React Native/Javascript API enabling interaction with MWA-compatible wallets.
- `@solana-mobile/mobile-wallet-adapter-protocol-web3js`: A convenience wrapper to use common primitives from [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) – such as `Transaction` and `Uint8Array`.
- `@solana/web3.js`: Solana Web Library for interacting with Solana network through the [JSON RPC API](https://docs.solana.com/api/http).
- `@solana/wallet-adapter-react`: Solana Web Library where we can re-use certain React components/hooks like `ConnectionProvider`.
- `react-native-get-random-values` Secure random number generator polyfill for `web3.js` underlying Crypto library on React Native. 
- `buffer` Buffer polyfill also needed for `web3.js` on React Native.

</details>


#### Step 3: Update index.js with polyfills

To load the polyfills, we open the file `index.js` in the root of the project and add the following two lines to the top of the file:

:::note
Make sure you place these imports before your App component import!
:::

```javascript
import {Buffer} from 'buffer';
import 'react-native-get-random-values'

// Place the App component import below your polyfill imports!
import App from './App';
```

#### Step 4: Run the app on device/emulator

Make sure your device/emulator is set up by following the [official React Native documentation](https://reactnative.dev/docs/running-on-device). 

In your project folder run:
```
npx react-native run-android
```
The Metro Bundler terminal UI will pop up then select the Android option. Your app should build and launch on your emulator. 


## Next Steps

Congrats! At this point, your React Native project is set up and running with all the dependencies to build a Solana Mobile dApp!

You can follow the [React Native Hello World Tutorial](../react-native/hello_world_tutorial.md) to see how to write components that can connect to the Solana network and record a message on the blockchain.
