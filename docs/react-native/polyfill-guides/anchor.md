# Polyfill Guide: Anchor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will teach you how to set up the Anchor Javascript SDK with the necessary polyfills in a React Native or Expo app.

## Installation

Add the Anchor library to your project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @coral-xyz/anchor
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @coral-xyz/anchor
```

</TabItem>
</Tabs>

## Polyfills

The following polyfills are needed:

### Install buffer

:::

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add buffer
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install buffer
```

Then, import the library in your app's entrypoint file (e.g `index.js`), before the Anchor library is imported.

```typescript
import { Buffer } from "buffer";
global.Buffer = Buffer;

Buffer.prototype.subarray = function subarray(
  begin: number | undefined,
  end: number | undefined
) {
  const result = Uint8Array.prototype.subarray.apply(this, [begin, end]);
  Object.setPrototypeOf(result, Buffer.prototype); // Explicitly add the `Buffer` prototype (adds `readUIntLE`!)
  return result;
};
```

</TabItem>
</Tabs>

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
