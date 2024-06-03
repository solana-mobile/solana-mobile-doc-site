# Polyfill Guide: Anchor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will teach you how to set up the Anchor Javascript SDK with the necessary polyfills in a React Native or Expo app.

## Installation

Add the Anchor library to your project:

:::caution
React Native apps should use **Anchor v0.28.0**. Later versions have an unsolved polyfill issue on React Native.
:::
<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @coral-xyz/anchor@0.28.0
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @coral-xyz/anchor@0.28.0
```

</TabItem>
</Tabs>

## Polyfills

The following polyfills are needed:

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
global.TextEncoder = require("text-encoding").TextEncoder;
```

## Example
