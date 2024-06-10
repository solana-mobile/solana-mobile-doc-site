# Solana React Native Polyfills

When developing with React Native on Solana, you may encounter polyfill issues with certain JavaScript libraries that work fine on the web.

To help with this, this section of docs aims to:

- Document the needed polyfills for popular Solana Javascript libraries
- Teach you how to set up each polyfill for a React Native or Expo app

## What are polyfills?

[Polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) are pieces of code that provide functionality which is not natively supported by a specific environment. They act as a substitute, allowing developers to use modern JavaScript features or libraries in environments that do not support them out of the box.

In the context of React Native and Solana, many popular Solana Javascript libraries (e.g solana-web3.js, Anchor SDK, Metaplex JS) were primarily built for a browser or Node environment. As a result, these libraries do not work out of the box when used in a React Native environment.

To remedy this, this section will show you how to set up the necessary polyfills to enable the library in your app.
