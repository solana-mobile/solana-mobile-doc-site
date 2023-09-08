# Web3 and Mobile

Before development, its important to understand the current landscape of Web3 mobile development to foresee potential blockers and opportunities.

## Mobile Platforms 📱

**Android** 🤖

Android is currently the best supported platform for Solana Mobile development. The Solana Mobile SDKs (namely Mobile Wallet Adapter) are all natively implemented and available in Android. The majority of the resources in this website are for Android development.

In addition to this, the Google Play Store has less restrictive policies with regards to Crypto/Web3 dApps compared to the Apple App Store.

For Android development, Solana Mobile SDKs available for **Kotlin, React Native, and Flutter**. See our _SDK_ section for more details on each.

**iOS** 🍎

There are several blockers for developing Solana mobile apps on iOS. First, the Mobile Wallet Adapter protocol is not supported on iOS due to technical limitations of the operating system. In addition to this, the Apple App Store has a more restrictive policy against web3/crypto apps.

For now, the current recommendation for iOS is to create a mobile web app, that is — a web app designed/optimized for mobile browsers. More on this below.

## **Mobile Web** 🌐

Although our recommendation is to always create a native mobile app for the best user experience, this is not always possible like on iOS. An alternative option to developing a native mobile app is to create a web app optimized for a mobile browser experience.

**Browser Compatibility**

- Android Chrome ✅
  - Supports MWA automatically if using the [`wallet-adapter-react`](https://github.com/solana-labs/wallet-adapter) library.
- iOS Safari 🟨
  - Does not support MWA due to iOS limitations.
  - Wallet signing only possible if user has a Safari Extension wallet, like [Glow Wallet](https://glow.app/).
- Firefox, Opera, Brave, Other ❌
  - Does not support MWA on either iOS or Android.
- Wallet In-App-Browsers
  - Mobile wallets like Phantom, Solflare, and Ultimate, also provide an option to load a web dApp through an in-app-browser.
  - In-App-Browsers have wallet signing capabilities at the cost of being restricted within the wallet app.
