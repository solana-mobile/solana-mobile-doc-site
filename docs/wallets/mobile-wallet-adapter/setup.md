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

## 2. Association

To initiate the protocol, dApps must provide an [*association* URI](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#association) to the wallet, indicating they want to establish
an MWA session.

There are two types of sessions supported by the current SDKs:

- Local Sessions - e.g Android dApp to Android wallet app
- Remote Sessions - e.g Desktop Web dApp to Android wallet app

In both cases, the wallet will receive an association URI and use it to establish a connection with the dApp.

### Association Intent

The dApp will initiate the protocol by sending an [intent](https://developer.android.com/guide/components/intents-filters) containing the association URI to the wallet.

- In local association, the dApp will directly send the URI within an intent to the wallet app.
- In remote association, the dApp will display a QR code that encodes the association URI. The QR code is then scanned by the device camera and the URI broadcasted as an intent (e.g or an in-app camera directly scans the QR code).

An example local association URI:

```
solana-wallet:/v1/associate/local?association=<association_token>&port=<port_number>&v=<version>
```


### Define an intent filter

The wallet must define an entrypoint [`Activity`](https://developer.android.com/guide/components/activities/intro-activities) that handles these incoming association intents sent by dApps. The default intent URI scheme used by dApps is `solana-wallet://`.

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
import com.solana.mobilewalletadapter.walletlib.scenario.*

private inner class MobileWalletAdapterScenarioCallbacks : LocalScenario.Callbacks {

    // Scenario lifecycle events
    override fun onScenarioReady() : Unit
    override fun onScenarioServingClients() : Unit
    override fun onScenarioServingComplete() : Unit
    override fun onScenarioComplete() = Unit
    override fun onScenarioError() = Unit
    override fun onScenarioTeardownComplete() = Unit

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

#### 1. Initialize MWA Event listener

Initialize a listener that listens for MWA requests and events and passes them to the provided callback handlers.

```typescript
import {
  initializeMWAEventListener,
  MWARequest,
  MWASessionEvent,
} from '@solana-mobile/mobile-wallet-adapter-walletlib';

const listener: EmitterSubscription = initializeMWAEventListener(
  (request: MWARequest) => { 
      switch (request.__type) {
        case MWARequestType.SignAndSendTransactionsRequest:
        case MWARequestType.SignTransactionsRequest:
        case MWARequestType.SignMessagesRequest:
        case MWARequestType.AuthorizeDappRequest:
          /* ... */
      }
  },
  (sessionEvent: MWASessionEvent) => { 
      switch (event.__type) {
        case MWASessionEventType.SessionStartEvent:
        case MWASessionEventType.SessionReadyEvent:
        case MWASessionEventType.SessionTerminatedEvent:
        case MWASessionEventType.SessionServingClientsEvent:
        case MWASessionEventType.SessionServingCompleteEvent:
        case MWASessionEventType.SessionCompleteEvent:
        case MWASessionEventType.SessionErrorEvent:
        case MWASessionEventType.SessionTeardownCompleteEvent:
        case MWASessionEventType.LowPowerNoConnectionEvent:
          /* ... */
      }
   },
);

/* ... */

// Clean up the listener when it is out of scope
listener.remove()
```

Ensure the listener is cleaned up with `listener.remove()` when it goes out of scope (e.g `listener.remove()` on component lifecycle unmount).

#### 2. Resolving a request

A `MWARequest` is handled by calling `resolve(request, response)`, with each type of request having a corresponding response type.

An example of handling an `AuthorizationRequest`:

```typescript
import {
  resolve,
  AuthorizeDappResponse
} from '@solana-mobile/mobile-wallet-adapter-walletlib';

const response = {
  publicKey: Keypair.generate().publicKey.toBytes(),
  label: 'Wallet Name',
} as AuthorizeDappResponse;

resolve(authorizationRequest, response)
```

#### 3. Rejecting a response

There is also a set of of *fail* responses that you can return to the dApp. These are for cases where the user declines, or an error occurs during signing, etc.

```typescript
import {
  UserDeclinedResponse
} from '@solana-mobile/mobile-wallet-adapter-walletlib';

const response = {
  failReason: MWARequestFailReason.UserDeclined,
} as UserDeclinedResponse;

// Tells the dApp user has declined the authorization request
resolve(authorizationRequest, response)
```

To see the complete list of valid request and response types, view the Request and Response types reference.

  </TabItem>
</Tabs>
## 4. Establish a session

### 1. Parse the Association URI

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Kotlin">
After receiving an incoming intent, extract and parse the association URI with the `AssociationUri` class. 

```kotlin
import android.content.Intent
import com.solana.mobilewalletadapter.walletlib.association.AssociationUri
import com.solana.mobilewalletadapter.walletlib.association.LocalAssociationUri

val associationUri = intent.data?.let { uri -> AssociationUri.parse(uri) }

if (associationUri is LocalAssociationUri) {
  print("dApp association attempt over local connection: '${intent.data}'")
} else {
  print("Unsupported association URI '${intent.data}'")
}
```
  </TabItem>
  <TabItem value="react-native" label="Typescript">
After receiving an incoming intent, extract and parse the association URI with the `AssociationUri` class. 

```typescript
const config: MobileWalletAdapterConfig = {
  supportsSignAndSendTransactions: true,
  maxTransactionsPerSigningRequest: 10,
  maxMessagesPerSigningRequest: 10,
  supportedTransactionVersions: [0, 'legacy'],
  noConnectionWarningTimeoutMs: 3000,
  optionalFeatures: ['solana:signInWithSolana']
};

try {
  const sessionId = await initializeMobileWalletAdapterSession(
    'Wallet Name',
    config,
  );
  console.log('sessionId: ' + sessionId);
} catch (e: any) {
    if (e instanceof SolanaMWAWalletLibError) {
      console.error(e.name, e.code, e.message);
    } else {
      console.error(e);
    }   
}
```
  </TabItem>
</Tabs>

:::tip QR Code Scanning
For remote sessions, wallets can also implement an in-app QR code scanner to directly parse and extract the remote association URI.
:::

### 2. Define a wallet config

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Kotlin">
Define a `MobileWalletAdapterConfig` object that informs the dApp what features/options your wallet supports.

```kotlin
import com.solana.mobilewalletadapter.walletlib.protocol.MobileWalletAdapterConfig

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
  </TabItem>
  <TabItem value="react-native" label="Typescript">
Define a `MobileWalletAdapterConfig` object that informs the dApp what features/options your wallet supports.

```typescript
import {
  MobileWalletAdapterConfig,
} from '@solana-mobile/mobile-wallet-adapter-walletlib';

const config: MobileWalletAdapterConfig = {
  supportsSignAndSendTransactions: true,
  maxTransactionsPerSigningRequest: 10,
  maxMessagesPerSigningRequest: 10,
  supportedTransactionVersions: [0, 'legacy'],
  noConnectionWarningTimeoutMs: 3000,
  optionalFeatures: ['solana:signInWithSolana']
};
```
  </TabItem>
</Tabs>

### 3. Initialize a session

With the association URI, the wallet can initialize and establish a session with the dApp.

<Tabs groupId="development-framework">
  <TabItem value="native-android" label="Kotlin">

```kotlin
import com.solana.mobilewalletadapter.walletlib.scenario.*
import com.solana.mobilewalletadapter.walletlib.authorization.AuthIssuerConfig

val scenario = associationUri.createScenario(
    getApplication<MyWalletApplication>().applicationContext,
    config,
    AuthIssuerConfig("<my_wallet_name>"),
    MobileWalletAdapterScenarioCallbacks()
).also { it.start() }
```
  </TabItem>
  <TabItem value="react-native" label="Typescript">

```typescript
import {
  initializeMobileWalletAdapterSession,
} from '@solana-mobile/mobile-wallet-adapter-walletlib';

const sessionId = await initializeMobileWalletAdapterSession(
  'Wallet Name',
  config,
);
```
  </TabItem>
</Tabs>

If successfully established, the dApp will begin sending requests/events to be handled by the provided callbacks.