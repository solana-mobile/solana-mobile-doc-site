# Mobile Wallet Adapter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[**Mobile Wallet Adapter (MWA)**](https://github.com/solana-mobile/mobile-wallet-adapter) is a generic protocol specification that enables dApps to connect with mobile wallet apps for Solana transaction and message signing.

## Why is it important?

- Developers only need to implement MWA once to be compatible with [all MWA-compliant wallets](https://solanamobile.com/wallets)! It eliminates the need to integrate with each wallet individually.

- Developers can focus entirely on their dApp's core functionality, with wallet integration handled at no cost.
 
- Users have freedom to select and use the mobile wallet app of their choice.


## Supported Platforms

| Mobile Platform                            | Is MWA Supported? | Notes                                                                 |
| ------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Android                                    | ✅                | Full support for dApps and Wallet apps.                               |
| Mobile Web - Chrome (Android)              | ✅                | Automatic integration if using `@solana/wallet-adapter-react`.        |
| iOS                                        | ❌                | MWA is not currently available for any iOS platform (app or browser). |
| Mobile Web - Safari, Firefox, Opera, Brave | ❌                | These browsers currently do not support MWA on Android (or iOS).      |

## Using the SDK

Solana Mobile maintains an official [Mobile Wallet Adapter SDK](https://github.com/solana-mobile/mobile-wallet-adapter) that implements the protocol, originally written as a Android Kotlin/Java library.




<Tabs>
<TabItem value="For dApps" label="For dApps">

The SDK is also ported other frameworks and is available for:

- React Native
- Flutter
- Unity
- Unreal Engine

</TabItem>
<TabItem value="For Wallets" label="For Wallets">

The SDK is also ported other frameworks and is available for:

- React Native
- Flutter
- Unity
- Unreal Engine

**Migrating to MWA 2.0**

Check out the [2.0 migration guide](../mwa/migration/overview.md) to migrate from 1.x version of Mobile Wallet Adapter to the latest version. 

</TabItem>
</Tabs>

TODO: For wallets

Explore the _Development_ section of the site to learn how to integrate the MWA SDK into the framework of your choice.

## Deep dive learning

Fundamentally, MWA is a generic protocol specification for connecting dApps to Wallets. The protocol is not limited to Android devices either; it envisions similar support for iOS devices, as well as the capability of Wallet apps to provide signing services to applications running remotely, such as on other mobile devices, and on desktop or laptop computers.

If interested, you can deep dive into the protocol [specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

# Deep dive

Fundamentally, MWA is a generic protocol specification for connecting dApps to Wallets. The protocol is not limited to Android devices either; it envisions similar support for iOS devices, as well as the capability of Wallet apps to provide signing services to applications running remotely, such as on other mobile devices, and on desktop or laptop computers.

## Diagram

The following diagram shows a bird's eye view of a mobile dApp's interactions with mobile wallets and the Solana network.

  <img src="/diagrams/dapp_architecture_full.svg" alt="Full Architecture Diagram" className="diagram-image"/>

## Mobile Wallet Adapter Protocol

The **Mobile Wallet Adapter (MWA) ** protocol is what defines the communication exchange between a dApp and a mobile wallet.
In the protocol, the dApp sends requests (i.e: authorization or signing), while the wallet is responsible for displaying
these requests to the user and responding back to the dApp if approved.

For an extensive, deep dive into the specifics of the protocol and MWA methods, refer to the [MWA spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).

### Session Establishment

To begin the protocol, a dApp initiates first contact with a mobile wallet and establishes an **MWA session**.
With the current SDKs, the MWA session is initiated through Android intents, with the dApp broadcasting an intent
with the `solana-wallet://` scheme.

  <img src="/diagrams/session_establishment.svg" alt="Session Establishment Diagram" className="diagram-image"/>
  <br /><br />

A wallet then receives the intent and starts a websocket connection, thus establishing a channel for commmunication.

### Example: Authorize and Sign Transaction

Once a session is established, the dApp can now begin sending MWA Requests to receive signed transactions from the wallet.
This example case outlines an MWA session where the dApp:

1. Establishes a session with a wallet.
2. Requests authorization, elevating the session to an "authorized state" and receiving a list of authorized accounts and an authToken.
3. Requests transaction signing, receiving a transaction signed by the authorized accounts.

<img src="/diagrams/authorize_and_sign.svg" alt="Authorize and Sign Diagram" className="diagram-image"/>

In future sessions, the dApp can initiate with the valid authToken to immediately elevate to an "authorizd state", skipping the "connect" step.

While the protocol technically supports multiple accounts, most wallet apps only implement a single account authorization per session.

For a more detailed diagram that shows the full communication exchange, refer to this [section in the spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#authorize-and-sign-transaction).

## Submitting to the Solana network

Just like web dApps, the process for a mobile dApp submitting transactions to the blockchain network is the same. The dApp specifies
a cluster and an RPC endpoint then sends the transaction payload, following the [JSON RPC API](https://docs.solana.com/api).

For certain usecases, the dApp may choose to communicate with the RPC through the [Websocket API](https://docs.solana.com/api/websocket)

  <img src="/diagrams/submit_rpc.svg" alt="Submit to RPC Diagram" className="diagram-image"/>

### Sign and Send Transaction

For submitting transactions, it is encouraged for the dApp to send a `sign_and_send_transaction` MWA request to the wallet. This request
type sends a unsigned transaction to the wallet. If authorized, the wallet will then sign the transaction and send it to the network with its
own implementation. Depending on the wallet app, this can include applying its own priority fee.

Relying on the wallet reduces the risk of replay attacks with [durable nonce based transactions](https://docs.solana.com/implemented-proposals/durable-tx-nonces), which can be abused with `sign_transactions`.

  <img src="/diagrams/sign_and_send.svg" alt="Sign and Send Diagram" className="diagram-image"/>
