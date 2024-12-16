# Mobile Wallet Adapter Integration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This integration guide will show how to:
- Install the MWA Wallet Library in the framework of your choice.
- Register your wallet app to handle MWA Android intents for session establishment.
- Manage persistent authorization tokens from dApps. 
- Implement request handlers for each MWA request from dApps (e.g Respond to a transaction signing request).


## Installation

Add the MWA Wallet Library as a dependency to your wallet application.

<Tabs groupId="development-framework">
  <TabItem value="Typescript" label="Typescript">

Install the package with npm:

```bash
npm install @solana-mobile/mobile-wallet-adapter-walletlib
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin">

Add the following to your build.gradle:

```groovy
implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.6-beta3'
```
  </TabItem>
</Tabs>

## Add an intent filter for MWA requests

MWA Clients (dApps) send Android [*intents*](https://developer.android.com/guide/components/intents-filters) to initiate a local Mobile Wallet Adapter session with a wallet app. By default, MWA intents will have the URI scheme `solana-wallet:`.

To ensure your wallet is discoverable during Android intent disambiguation, you need to add an [intent filter](https://developer.android.com/guide/components/intents-filters#Receiving) for the
`solana-wallet:` URI scheme.

<Tabs groupId="development-framework">
  <TabItem value="Typescript" label="Typescript">
Configure your wallet with the following Typescript setup:

```Typescript
const config = {
  network: 'mainnet',
  endpoint: 'https://api.mainnet.solana.com'
};
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin">
Configure your wallet with the following Kotlin setup:

```kotlin
val config = WalletConfig(
    network = "mainnet",
    endpoint = "https://api.mainnet.solana.com"
)
```
  </TabItem>
</Tabs>

## Define a wallet config

## 

## Implement request handler callbacks

Request handlers are essential for managing wallet interactions.

<Tabs groupId="development-framework">
  <TabItem value="Typescript" label="Typescript">
```javascript
async function handleRequest(request) {
  // Implementation
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin">
```kotlin
suspend fun handleRequest(request: Request) {
    // Implementation
}
```
  </TabItem>
</Tabs>
