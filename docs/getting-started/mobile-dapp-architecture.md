# Mobile dApp Architecture Overview

This reference aims to give a conceptual overview of the architecture of a mobile dApp using the Solana Mobile Stack. 

## High Level
The following diagram shows a bird's eye view of a mobile dApp's interactions with mobile wallets and the Solana network.

  <img src="/diagrams/dapp_architecture_full.png" alt="Full Architecture Diagram" className="diagram-image"/>

## Mobile Wallet Adapter Protocol

The **Mobile Wallet Adapter (MWA) **  protocol is what defines the communication exchange between a dApp and a mobile wallet.
In the protocol, the dApp sends requests (i.e: authorization or signing), while the wallet is responsible for displaying 
these requests to the user and responding back to the dApp if approved. 

For an extensive, deep dive into the specifics of the protocol and MWA methods, refer to the [MWA spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html).


### Session Establishment
To begin the protocol, a dApp initiates first contact with a mobile wallet and establishes an **MWA session**. 
With the current SDKs, the MWA session is initiated through Android intents, with the dApp broadcasting an intent 
with the `solana-wallet://` scheme.

  <img src="/diagrams/session_establishment.png" alt="Session Establishment Diagram" className="diagram-image"/>
  <br /><br />

A wallet then receives the intent and starts a websocket connection, thus establishing a channel for commmunication. 

### Example: Authorize and Sign Transaction 

Once a session is established, the dApp can now begin sending MWA Requests to receive signed transactions from the wallet.
This example case outlines an MWA session where the dApp:
1. Establishes a session with a wallet.
2. Requests authorization, elevating the session to an "authorized state" and receiving an authorized pubKey.
3. Requests transaction signing, receiving a transaction signed with the authorized pubKey.


<img src="/diagrams/authorize_and_sign.png" alt="Authorize and Sign Diagram" className="diagram-image"/>

For a more detailed diagram that shows the full communication exchange, refer to this [section in the spec](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#authorize-and-sign-transaction).


## Submitting to the Solana network

Just like web dApps, the process for a mobile dApp submitting transactions to the blockchain network is the same. The dApp specifies
a cluster and an RPC endpoint then sends the transaction payload, following the [JSON RPC API](https://docs.solana.com/api).

For certain usecases, the dApp may choose to communicate with the RPC through the [Websocket API](https://docs.solana.com/api/websocket)

  <img src="/diagrams/submit_rpc.png" alt="Submit to RPC Diagram" className="diagram-image"/>

### Sign and Send Transaction

An alternative option for submitting transactions is for the dApp to send a `sign_and_send_transaction` MWA request to a wallet. This request
type sends a unsigned transaction to the wallet. If authorized, the wallet will then sign the transaction and send it to the network with its
own implementation.

  <img src="/diagrams/sign_and_send.png" alt="Sign and Send Diagram" className="diagram-image"/>
