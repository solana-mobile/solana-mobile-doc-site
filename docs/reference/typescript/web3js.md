---
title: Web3.js Reference
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CardLayout from "../../../src/layouts/CardLayout";
import CTAButton from "../../../src/components/CTAButton";

Interact with accounts and programs on the 
Solana network through the Solana [JSON RPC API](https://docs.solana.com/api/http).

<CTAButton label="API Reference" to="https://solana-labs.github.io/solana-web3.js/" />

### Install dependencies

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill \
  @craftzdog/react-native-buffer
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill \
  @craftzdog/react-native-buffer
```

</TabItem>
</Tabs>

### Polyfills

Enable all of them in `index.js`

```typescript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {Buffer} from '@craftzdog/react-native-buffer';
global.Buffer = Buffer;
```
