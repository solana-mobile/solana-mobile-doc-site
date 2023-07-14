---
title: MWA Typescript Reference
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CardLayout from "../../../src/layouts/CardLayout";
import CTAButton from "../../../src/components/CTAButton";

Connect to wallet apps and sign transactions and messages with the Mobile Wallet Adapter API.

<CTAButton label="API Reference" to="#mobile-wallet-api-methods" />

<br/>

### Install dependencies

- [**`@solana-mobile/mobile-wallet-adapter-protocol`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) 
   - Base library that implements the MWA client. Include this, but only import `transact` from the wrapper library.

- [**`@solana-mobile/mobile-wallet-adapter-protocol-web3js`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js)
    - A convenience wrapper for the base library that enables with `web3.js` primitives like `Transaction`.

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

## Mobile Wallet API Methods
Reference for the Mobile Wallet API for dApps to connect to wallets and receive signing services.

import Transact from "./mobile-wallet-methods/\_transact.mdx"

<Transact />

import WalletAuthorize from "./mobile-wallet-methods/\_walletAuthorize.mdx"

<WalletAuthorize />

import WalletReauthorize from "./mobile-wallet-methods/\_walletReauthorize.mdx"

<WalletReauthorize />

import WalletDeauthorize from "./mobile-wallet-methods/\_walletDeauthorize.mdx"

<WalletDeauthorize />

import WalletGetCapabilities from "./mobile-wallet-methods/\_walletGetCapabilities.mdx"

<WalletGetCapabilities />

import WalletSignTransactions from "./mobile-wallet-methods/\_walletSignTransactions.mdx"

<WalletSignTransactions />

import WalletSignAndSendTransactions from "./mobile-wallet-methods/\_walletSignAndSendTransactions.mdx"

<WalletSignAndSendTransactions />

import WalletSignMessages from "./mobile-wallet-methods/\_walletSignMessages.mdx"

<WalletSignMessages />