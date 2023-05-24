---
title: MWA Typescript Reference
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CardLayout from "../../../src/layouts/CardLayout";

The Mobile Wallet Adapter Typescript API relies on these libraries:

- [**`@solana-mobile/mobile-wallet-adapter-protocol`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) 
   - Base library that implements the MWA client.

- [**`@solana-mobile/mobile-wallet-adapter-protocol-web3js`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js)
    - A convenience wrapper for the base library that enables with `web3.js` primitives like `Transaction`.

### Install dependencies

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
```

</TabItem>
<TabItem value="npm" label="npm">


```shell
npm install \
  @solana-mobile/mobile-wallet-adapter-protocol-web3js \
  @solana-mobile/mobile-wallet-adapter-protocol \
```

</TabItem>
</Tabs>

### Import into a file
```tsx
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
```

<br/><br/>

# Mobile Wallet API Methods
Reference for the Mobile Wallet API for dApps to connect to wallets and receive signing services.

import Transact from "./mobile-wallet-methods/\_transact.mdx"

<Transact />

import WalletAuthorize from "./mobile-wallet-methods/\_walletAuthorize.mdx"

<WalletAuthorize />


