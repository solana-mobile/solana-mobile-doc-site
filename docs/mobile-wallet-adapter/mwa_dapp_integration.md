## Dapp integration

To request signing services with the Mobile Wallet Adapter protocol, dapps must:

- Instantiate an appropropriate [Scenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib/src/main/java/com/solana/mobilewalletadapter/clientlib/scenario/Scenario.java)
- Dispatch an association `Intent` via [`startActivity()`](https://developer.android.com/reference/android/app/Activity#startActivity(android.content.Intent))
- Prepare and send transactions to the wallet app
- Close the [Scenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib/src/main/java/com/solana/mobilewalletadapter/clientlib/scenario/Scenario.java) when signing is complete
- Store the auth token and public key(s) for future usage with the same wallet

### `Scenario`s

Subclasses of [Scenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib/src/main/java/com/solana/mobilewalletadapter/clientlib/scenario/Scenario.java) are used to manage the collection of resources (threads, sockets, encryption keys, etc) that collectively implement the dapp endpoint of the Mobile Wallet Adapter protocol. For local use cases, where the wallet and dapp are running on the same device, the dapp should instantiate an instance of [LocalAssociationScenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib/src/main/java/com/solana/mobilewalletadapter/clientlib/scenario/LocalAssociationScenario.java). A future update of `clientlib` will add support for additional `Scenario`s, such as for associating with a remote wallet endpoint via the use of a reflector server (see the Mobile Wallet Adapter protocol specification for more details).

The `Scenario` should be valid for as long as the dapp is actively making signing requests to the wallet. Once signing is complete, the dapp should `close()` the `Scenario`. This allows the wallet to tear down its UI context, and return control to the dapp.

### Subsequent connections

After a successful call to `authorize`, the dapp will be in possession of an auth token and corresponding public key(s), and optionally a wallet base URI. It should store these in persistent storage, for use on subsequent connections to the same wallet app. The auth token persists the authorization granted to this dapp, allowing future signing attempts to avoid the need for re-authorization (though transaction approval by the wallet will still be required). If a wallet base URI was provided, the dapp should use it on subsequent connections. When used with [App Links](https://developer.android.com/training/app-links), this guarantees that a dapp will reconnect to the intended wallet.

## Sample apps

Wallet: [`fakewallet`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet)

Dapp: [`fakedapp`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakedapp)

These sample apps demonstrate how to integrate `walletlib` and `clientlib` into wallets and dapps, repsectively. They can be used to test integrations of the Mobile Wallet Adapter protocol into real wallets and dapps. These apps are suitable for use with [devnet](https://docs.solana.com/clusters#devnet) or [testnet](https://docs.solana.com/clusters#testnet).