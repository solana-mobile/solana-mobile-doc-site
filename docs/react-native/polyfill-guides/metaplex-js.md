# Polyfill Guide: Metaplex JS

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will teach you how to set up the Metaplex JS library with the necessary polyfills in a React Native or Expo app.

## Installation

Add the libraries to your project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @metaplex-foundation/js @solana/web3.js
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @metaplex-foundation/js @solana/web3.js
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

Then, import the library in your app's entrypoint file (e.g `index.js`), before the Anchor library is imported.

```js
import "react-native-get-random-values";
// ...other imports below
```

### Install assert

Add the `assert` library to your project.

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add assert
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install assert
```

</TabItem>
</Tabs>

### Install text-encoding

Add the `text-encoding` library to your project.

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add text-encoding
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install text-encoding
```

</TabItem>
</Tabs>

Then, populate the `global.TextEcoder` value in your app's entrypoint file (e.g `index.js`).

```js
// ...imports
global.TextEncoder = require("text-encoding").TextEncoder;
```

## Example
