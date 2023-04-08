## Summary

This guide covers integration of the wallet and client libraries into Android apps, to provide support for the Mobile Wallet Adapter protocol.

## Target audience

Developers of Android wallets and dapps.

## Overview

### Mobile Wallet Adapter protocol

The Mobile Wallet Adapter protocol describes how wallets can provide transaction signing services to dapps, whether the dapps are native Android apps, mobile-friendly web dapps, or even running on a remote system (such as a desktop or laptop). See the [protocol specification](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html) for more details.

### Android reference implementation

A reference implementation of the protocol is available for Android wallets and dapps, targeting local association use cases. 

For wallets, it provides incoming association `Intent` handling, a local WebSocket server, transport encryption, RPC method server implementation, and auth token issuance and management. Wallets must provide account enumeration, transaction signing services, dapp identity verification, and all UI.

For dapps, it provides association `Intent` creation, a WebSocket client, transport encryption, and RPC method client implementation. Dapps must provide storage of auth tokens, transaction creation, and all UI.

## Wallet integration

To provide signing services with the Mobile Wallet Adapter protocol, wallets must:

- Define an `Activity` entrypoint to handle incoming association URIs
- Instantiate an appropriate [Scenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/Scenario.java)
- Implement the [`Scenario.Callbacks`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/Scenario.java) interface
- Provide dapp identity verification, authorization, and transaction signing services in response to incoming requests on the `Scenario.Callbacks` interface

### `Activity` entrypoint

The wallet `Activity` entrypoint must handle incoming `solana-wallet://` URIs sent by dapps (either native Android dapps, or mobile-friendly web dapps running in the browser). In addition, for additional security, it is strongly recommended that wallets provide an alternate association URI scheme utilizing [App Links](https://developer.android.com/training/app-links). This allows dapps to guarantee a return to the correct wallet app (on devices where multiple wallet apps are installed), as well as ensuring the identity of the wallet app is attested to by control of a web domain.

For example,

```
<activity
    android:name=".MobileWalletAdapterActivity"
    android:launchMode="singleTask"
    android:taskAffinity="com.solana.mobilewalletadapter.fakewallet.mwa_host_task"
    android:exported="true">
    <!-- Default solana-wallet URI from a browser or native dapp -->
    <intent-filter android:order="1">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="solana-wallet" />
    </intent-filter>
    <!-- Any other uncategorized solana-wallet URI not covered by above -->
    <intent-filter android:order="0">
        <category android:name="android.intent.category.DEFAULT" />
        <data android:scheme="solana-wallet" />
    </intent-filter>
    <!-- App Links entrypoint -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https"
            android:host="solanaexamplewallet.io"
            android:pathPrefix="/somepathprefix" />
    </intent-filter>
</activity>
```

### `Scenario`s

Subclasses of [Scenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/Scenario.java) are used to manage the collection of resources (threads, servers, encryption keys, etc) that collectively implement the wallet endpoint of the Mobile Wallet Adapter protocol. For local use cases, where the wallet and dapp are running on the same device, the wallet should instantiate an instance of [LocalWebSocketServerScenario](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/LocalWebSocketServerScenario.java). A future update of `walletlib` will add support for additional `Scenario`s, such as for offering transaction signing services to remote dapps via the use of a reflector server (see the Mobile Wallet Adapter protocol specification for more details).

The `Scenario` should be valid for as long as the wallet is capable of providing signing services to a dapp. This often corresponds to the visibility of the wallet entrypoint `Activity`, which provides the UI context necessary to request user authorization for transaction signing.

When the dapp disconnects from the wallet, it is recommended that the wallet entrypoint `Activity` [`finish()`](https://developer.android.com/reference/android/app/Activity#finish()) itself, allowing the dapp to return to the foreground.

It’s recommended that wallets call Scenario.close() when they are done with a session (for e.g., when `onScenarioServingComplete` is called or if the containing activity is finish()ed).

### `Callback`s

The wallet is required to implement the [`Scenario.Callbacks`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/Scenario.java) interface. This interface will receive Mobile Wallet Adapter requests from the dapp (such as requests to sign transactions). Many of the `Scenario.Callback` methods provide a [`ScenarioRequest`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/ScenarioRequest.java) object. `ScenarioRequest` subclasses provide methods to complete each request successfully, or with a failure, and will ensure that an appropriate response is sent back to the dapp client.

### Handle interference from power saving mode

When an Android device is in [power/battery saving mode](https://developer.android.com/about/versions/pie/power#battery-saver) app background execution may be blocked or suspended, rendering dApps unable to communicate locally with a wallet via Mobile Wallet Adapter.

`LocalScenario` extends the base `Scenario.Callbacks` to include [`onLowPowerAndNoConnection`](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/walletlib/src/main/java/com/solana/mobilewalletadapter/walletlib/scenario/LocalScenario.java#L391). This callback will be triggered if the MWA instance running in the wallet detects that no connection has been made, and the device is currently in low power mode. Wallets utilizing a local connection scenario are required to implement this callback, and should take appropriate steps to notify the user if and when it is called. 

The wallet may want to manually implement an additional check for whether the device is in power saving mode [(e.g `isPowerSaveMode()`)](https://developer.android.com/reference/android/os/PowerManager#isPowerSaveMode()). The wallet may warn the user to disable the power saving mode or charge their device.