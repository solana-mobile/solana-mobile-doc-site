# Metaplex Integration Guide

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

[Metaplex](https://docs.metaplex.com/) provides a collection of on-chain tools/programs for creating and managing NFTs on Solana. In addition, Metaplex provides multiple [Client SDKs](https://docs.metaplex.com/sdks/) that makes it easier for developers to interact and use their on chain programs.

This guide will focus on integrating with the [Metaplex JS SDK](https://docs.metaplex.com/sdks/js/) in a React Native app with Mobile Wallet Adapter.

<CTAButton label="Example App Repo" to="https://github.com/solana-mobile/tutorial-apps/tree/main/MobileNFTMinter" />


## Installation
Intall the Metaplex JS package to your project.

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @metaplex-foundation/js
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @metaplex-foundation/js
```

</TabItem>
</Tabs>

### Polyfill installation

The JS SDK was originally written to be run in a Browser/Node environment, so certain dependencies aren't immediately available on React Native. These polyfill libraries will fill in the missing libraries and enable React Native compatibility.

#### 1. Install polyfills
```shell
yarn add 
    assert \
    crypto-browserify \
    readable-stream \
    zlib \
    react-native-url-polyfill
```

#### 2. Add polyfi;ls to resolver in metro.config.js
Adding the `resolver` property lets the Metro know which packages to substitute with when seeing a `require`.
```js
module.exports = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('readable-stream'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
      url: require.resolve('react-native-url-polyfill'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

#### 3. Add imports to index.js
```tsx
import 'react-native-url-polyfill/auto'; // Add this before the 'App' import!

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## Creating a Metaplex instance

## Minting an NFT

### Uploading to a storage provider

### Minting the token on chain



