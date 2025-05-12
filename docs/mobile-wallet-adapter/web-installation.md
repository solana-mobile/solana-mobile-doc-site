# Installing Mobile Wallet Standard 


Use the **Mobile Wallet Standard** library to register Mobile Wallet Adapter as a wallet option into your web application.

## Installation

### 1. Install the package

You can add Mobile Wallet Adapter to your web application by installing:

```shell    
npm install @solana-mobile/wallet-standard-mobile
```

### 2. Register the wallet

In the root of your web application, invoke the `registerMwa` function.

```typescript
import { 
    createDefaultAuthorizationCache, 
    createDefaultChainSelector, 
    createDefaultWalletNotFoundHandler,
    registerMwa, 
} from '@solana-mobile/wallet-standard-mobile';


registerMwa({
    appIdentity: {
      name: 'My app',
      uri: 'https://myapp.io',
      icon: 'relative/path/to/icon.png', // resolves to https://myapp.io/relative/path/to/icon.png
    },    
    authorizationCache: createDefaultAuthorizationCache(),
    chains: ['solana:devnet', 'solana:mainnet-beta'],
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
    remoteHostAuthority: '<REPLACE_WITH_URL_>', // Include to enable remote connection option.
})
```

Once registered, the wallet behavior automatically adapts to the user's device:

- **Desktop**: If `remoteHostAuthority` is provided, remote connection via QR Code.
- **Mobile**: Local connection via Android Intents (same as native Android apps).


## Enable remote connection

To enable the remote connection for desktop viewers, you need to configure the `remoteHostAuthority` parameter in the register function. If not provided, the wallet will only register on mobile environments.

:::info
The `remoteHostAuthority` is a URL that points to a [*reflector WebSocket server*](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#reflector-protocol) endpoint that reflects all communication between the web app and the wallet app. 

For more information, view the Reflector protocol documentation.
:::



### 1. Get the endpoint URL

Solana Mobile maintains a public endpoint for a reflector server (endpoint details to be announced).

If needed, dApps can implement and self-host their own reflector server. More information on this to come.
<!-- For more information, view the Hosting a Reflector server documentation. TODO -->

### 2. Configure your application

Once you've accepted the terms, add the URL in your register function with the URL.

Example with a configured endpoint:

```typescript
registerMwa({
  // ...other configuration options
  remoteHostAuthority: "<REPLACE_WITH_ENDPOINT>",
  // ...remaining options
})
```

After configured, MWA Remote connection will now appear as a wallet option on desktop environments.
