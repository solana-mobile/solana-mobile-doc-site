import { HiddenUrl } from '@site/src/components/HiddenUrlContainer';

# Installing Mobile Wallet Standard 


Use the **Mobile Wallet Standard** library to register Mobile Wallet Adapter as a wallet option into your web application.

The wallet automatically adapts to the user's device:

- Desktop - Remote connection via QR Code.
- Mobile - Local connection via Android Intents (same as native Android apps).

## Installation

### 1. Install the package

You can add Mobile Wallet Adapter to your web application by installing:

```shell    
npm install @solana-mobile/wallet-standard-mobile
```

### 2. Register the wallet

In the root of your web application, invoke the `register` function.

```typescript
import { 
    register, 
    createDefaultAddressSelector, 
    createDefaultAuthorizationResultCache, 
    createDefaultWalletNotFoundHandler 
} from '@solana-mobile/wallet-standard-mobile'

register({
  appIdentity: {
    name: "My app",
    uri: "https://myapp.io",
    icon: "relative/path/to/icon.png", // resolves to https://myapp.io/relative/path/to/icon.png
  },    
  reflectorUrl: "<REPLACE_WITH_ENDPOINT>", // Include to enable remote connection option.
  addressSelector: createDefaultAddressSelector(),
  authorizationResultCache: createDefaultAuthorizationResultCache(),
  cluster: WalletAdapterNetwork.Devnet,
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
})
```

Once registered, Mobile Wallet Adapter is added as a wallet option on mobile environments. For desktop environments, the remote connection option needs to be explicitly enabled.


## Enable remote connection

To enable the remote connection for desktop viewers, you need to configure the `reflectorUrl` parameter in the register function. If not provided, the wallet will only register on mobile environments.


:::info
The `reflectorUrl` should point to a [*reflector WebSocket server*](https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html#reflector-protocol) endpoint that reflects all communication between the web app and the wallet app. 

For more information, view the Reflector protocol documentation.
:::



### 1. Get the endpoint URL

Solana Mobile maintains a public endpoint for a reflector server:

<HiddenUrl
  url="https://reflector.example.solana.com/v1/endpoint"
/>

If needed, dApps can implement and host their own reflector server.
For more information, view the Hosting a Reflector server documentation.

### 2. Configure your application

Once you've accepted the terms, add the URL in your register function with the URL.

Example with a configured endpoint:

```typescript
register({
  // ...other configuration options
  reflectorUrl: "<REPLACE_WITH_ENDPOINT>",
  // ...remaining options
})
```

After configured, MWA Remote connection will now appear as a wallet option on desktop environments.
