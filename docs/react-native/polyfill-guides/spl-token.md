# Polyfill Guide: spl-token

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will teach you how to set up the Solana `spl-token` library with the necessary polyfills in a React Native or Expo app.

## Installation

Add the library to your project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @solana/spl-token.js
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @solana/spl-token.js
```

</TabItem>
</Tabs>

## Polyfills

The following polyfills are needed:

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

Then, add this resolver to your project's `metro.config.js`

```js
config.resolver.extraNodeModules.crypto = require.resolve(
  "react-native-get-random-values"
);
```

This configures the Metro bundler to replace instances of `require('crypto')` with `react-native-get-random-values`, thus polyfilling `getRandomValues`.

:::tip

Alternatively, you can use the `expo-crypto` library to polyfill `crypto.getRandomValues`. View this [sample app](https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/src/polyfills.ts#L7) for a reference of how to polyfill the `crypto` class.

:::

## Example
