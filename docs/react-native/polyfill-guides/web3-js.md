# Polyfill Guide: Solana web3.js

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will teach you how to set up the Solana web3.js library with the necessary polyfills in a React Native or Expo app.

## Installation

Add the library to your project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @solana/web3.js
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @solana/web3.js
```

</TabItem>
</Tabs>

## Polyfills

The following polyfills are needed, **only if you intend to use the `Keypair.generate` function**. Otherwise, this polyfill is not
required to use `@solana/web3.js`.

### Install getRandomValues

Add the `react-native-get-random-values` library to your project.

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add react-native-get-random-values
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install react-native-get-random-values
```

</TabItem>
</Tabs>

Then, import the library in your app's entrypoint file (e.g `index.js`), before the `@solana/web3.js` library is imported.

```js
import "react-native-get-random-values";
// ...other imports below
```

:::tip

Alternatively, you can use the `expo-crypto` library to polyfill `crypto.getRandomValues`. View this [sample app](https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/src/polyfills.ts#L7) for a reference of how to polyfill the `crypto` class.

:::

## Example
