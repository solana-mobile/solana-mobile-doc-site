# Mobile Wallet Adapter Setup

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This integration guide will show how to:
- Install the Mobile Wallet Adapter (MWA) Wallet Library in the framework of your choice.
- Declare your wallet eligible to handle MWA Android intents for session establishment.
- Implement request handlers for each MWA request from dApps (e.g Respond to a transaction signing request).

## 1. Installation

Add the MWA Wallet Library as a dependency to your wallet application.

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Android Project">

Add the following to your build.gradle:

```groovy
implementation 'com.solanamobile:mobile-wallet-adapter-walletlib:2.0.6-beta3'
```
  </TabItem>
    <TabItem value="react-native" label="React Native">

Install the package with npm:

```bash
npm install @solana-mobile/mobile-wallet-adapter-walletlib
```
  </TabItem>
</Tabs>

## 2. Activity Entrypoint

To begin the protocol, dApps will send an *association* [intent](https://developer.android.com/guide/components/intents-filters) to a wallet, indicating they want to establish an MWA session.

The wallet must define an entrypoint [`Activity`](https://developer.android.com/guide/components/activities/intro-activities) that handles incoming intents sent by dApps. The default intent URI scheme used by dApps is `solana-wallet://`.

### Define an intent filter

To ensure your wallet is discoverable during Android intent [disambiguation](https://developer.android.com/training/basics/intents/sending#disambiguation-dialog), you need to add an [intent filter](https://developer.android.com/guide/components/intents-filters#Receiving) for the
`solana-wallet:` URI scheme.

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Android Project">

Native Android and bare React Native apps add the intent filter to an activity in the app's manifest.
- The `solana-wallet` scheme is the default URI to filter for MWA intents from dApps.
- The activity will launch in response to a dApp attempting to establish a session.

:::tip Bottom Sheets

Handling requests with a bottom sheet (with no full app switch) requires defining a new Activity separate from your main app, that renders with a transparent background.

View the [MWA Bottom Sheet guide](/wallets/guides/bottom-sheets) for setup instructions.
:::

```xml title="AndroidManifest.xml"
<activity
    android:name=".MobileWalletAdapterActivity"
    android:launchMode="singleTask"
    android:taskAffinity="com.your.wallet.mwa_host_task"
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
</activity>
```
  </TabItem>
  <TabItem value="react-native" label="Expo">

Expo projects can define an Android intent filter in the `app.json`.

- The `solana-wallet` scheme is the default URI to filter for MWA intents from dApps.
- The activity will launch in response to a dApp attempting to establish a session.

:::tip Bottom Sheets

Handling requests with a bottom sheet (with no full app switch) requires defining a new Activity separate from your main app, that renders with a transparent background. 

Solana Mobile provides a custom Expo config plugin to do this. View the [MWA Bottom Sheet guide](/wallets/guides/bottom-sheets) for setup instructions.
:::

```json title="app.json"
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "solana-wallet",
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

## 3. Implement request handling

The library defines an interface for handling MWA requests and events through callback handlers. Implement
your wallet authorization, signing, and error handling logic through these callbacks.

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Kotlin">
```kotlin
private inner class MobileWalletAdapterScenarioCallbacks : LocalScenario.Callbacks {
    override fun onScenarioReady() : Unit
    
    override fun onScenarioServingClients() : Unit
    
    override fun onScenarioServingComplete() {
        // Handle scenario completion and cleanup
    }
    
    override fun onScenarioComplete() = Unit
    
    override fun onScenarioError() = Unit
    
    override fun onScenarioTeardownComplete() {
        // Handle scenario teardown completion
    }

    override fun onAuthorizeRequest(request: AuthorizeRequest) {
        // Handle authorization requests (including SIWS)
    }

    override fun onReauthorizeRequest(request: ReauthorizeRequest) {
        // Handle reauthorization requests
    }

    override fun onSignTransactionsRequest(request: SignTransactionsRequest) {
        // Handle transaction signing requests
    }

    override fun onSignMessagesRequest(request: SignMessagesRequest) {
        // Handle message signing requests
    }

    override fun onSignAndSendTransactionsRequest(request: SignAndSendTransactionsRequest) {
        // Handle sign and send transaction requests
    }

    private fun verifyPrivilegedMethodSource(request: VerifiableIdentityRequest): Boolean {
        // Verify the source of privileged method calls
        return false
    }

    override fun onDeauthorizedEvent(event: DeauthorizedEvent) {
        // Handle deauthorization events
        event.complete()
    }

    override fun onLowPowerAndNoConnection() {
        // Handle low power and no connection scenarios
    }
}
```
  </TabItem>
    <TabItem value="react-native" label="Typescript">
```javascript
async function handleRequest(request) {
  // Implementation
}
```
  </TabItem>
</Tabs>


## 4. Establish a session

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Kotlin">

### 1. Parse the Association URI

After receiving an incoming intent, extract and parse the association URI with the `AssociationUri` class. 

```kotlin
val associationUri = intent.data?.let { uri -> AssociationUri.parse(uri) }

if (associationUri is LocalAssociationUri) {
  print("dApp association attempt over local connection: '${intent.data}'")
} else {
  print("Unsupported association URI '${intent.data}'")
}
```

### 2. Define a wallet config

Define a `MobileWalletAdapterConfig` object that informs the dApp what features/options your wallet supports.

```kotlin
val config = MobileWalletAdapterConfig(
    10, // maxTransactionsPerSigningRequest
    10, // maxMessagesPerSigningRequest
    arrayOf(MobileWalletAdapterConfig.LEGACY_TRANSACTION_VERSION, 0), // supportedTransactionVersions
    3000L, // noConnectionWarningTimeoutMs
    arrayOf( // supportedFeatures
        ProtocolContract.FEATURE_ID_SIGN_TRANSACTIONS,
        ProtocolContract.FEATURE_ID_SIGN_IN_WITH_SOLANA
    )
),
```

### 3. Create a Scenario

With the association URI, the wallet can establish a session with the dApp by invoking `createScenario` and `start`.

```kotlin
val scenario = associationUri.createScenario(
    getApplication<MyWalletApplication>().applicationContext,
    config,
    AuthIssuerConfig("<my_wallet_name>"),
    MobileWalletAdapterScenarioCallbacks()
).also { it.start() }
```

If successfully established, the dApp will begin sending requests/events to be handled by the provided callbacks.

  </TabItem>
  <TabItem value="Expo" label="Typescript">


  </TabItem>
</Tabs>


## Local and Remote sessions

There are two types of sessions supported by the current SDKs:

- Local Sessions - e.g Android dApp to Android wallet app
- Remote Sessions - e.g Desktop Web dApp to Android wallet app

The main difference when handing local vs. remote sessions is

1. How the dApp attempts to associate with the wallet.
2. How communication is facilitated between the dApp and wallet.

### Local sessions

**Association** - Local sessions are initiated by the dApp sending an Android association intent to the wallet app on the same device.

**Local Web Socket Server** - The session is facilitated through a direct local web socket connection, hosted by the wallet endpoint.

### Remote Sessions

**Association** - The web dApp displays a QR Code encoded as remote association URI, which is scanned and parsed by the wallet app.

**Reflector Server** - The session connection is facilitated by a [reflector Websocket server](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#reflector-protocol), which reflects traffic between the dApp and wallet.
