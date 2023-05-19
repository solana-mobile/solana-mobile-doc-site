# React Native SDK

## Why React Native?
[**React Native**](https://reactnative.dev/docs/getting-started) is a popular development framework for creating mobile apps using React and Javascript. This section goes over the benefits of React Native and why you might choose it to build your mobile app.

### Code Reusability
Solana developers can continue using popular, well-supported Solana web libraries like `@solana/web3.js` and leverage their existing code in a React Native project. Developers familiar with Solana Web development will find this their quickest option to start building.

### Familiarity
Developers familiar with React development will be able to leverage their existing knowledge and translate it to building mobile apps. Just like React development on web, React Native supports live and hot reloading, which significantly speeds up the development process.

## Library overview

[**`@solana/web3.js`**](https://solana-labs.github.io/solana-web3.js/)

- The official Solana Javascript SDK that provides helpful abstraction classes around Solana core concepts (like accounts, programs, transactions) and implements
an RPC `Connection` Client that interacts with the Solana network through the Solana [JSON RPC API](https://docs.solana.com/api/http).

[**`@solana-mobile/mobile-wallet-adapter-protocol`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol)

- An implementation of the [Mobile Wallet Adapter](../getting-started/overview#mobile-wallet-adapter) protocol in React Native. It provides a library of classes and methods to start a session between your dApp and a wallet app, in which you can issue API calls to it (eg. *sign_messages*) as per the spec. 

[**`@solana-mobile/mobile-wallet-adapter-protocol-web3js`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol-web3js)
- A convenience wrapper package around `mobile-wallet-adapter-protocol` enabling use of common primitives from [**@solana/web3.js**](https://solana-labs.github.io/solana-web3.js) – such as `Transaction` and `Uint8Array`. Use the `transact` function from this package.

## Expo?
[**Expo**](https://docs.expo.dev/) is a popular platform that simplifies the development and deployment process for React Native projects, with the tradeoff of stricter customization of native code.
To use Expo with the MWA libraries, you'll need to follow an alternate Expo development flow, called a [custom Expo Development build](https://docs.expo.dev/develop/development-builds/create-a-build/). 

Follow this [guide](/react-native/expo) to set up your Expo project.