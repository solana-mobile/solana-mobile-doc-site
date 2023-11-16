---
title: Wallet Signing on iOS
description: A discussion of the pitfalls and solutions to iOS wallet signing.
slug: ios-wallet-signing
authors:
  - name: Mike Sulistio
    title: Developer Relations @ Solana Mobile
    url: https://twitter.com/MikeSulistio
    image_url: https://pbs.twimg.com/profile_images/1678828535514038272/6HR0mgOd_400x400.jpg
tags: [mobile-wallet-adapter, iOS, MWA, custody, transaction, signing]
hide_table_of_contents: false
---

# Wallet Signing on iOS

This article aims to address questions around the state of **wallet signing** and **key custody** on iOS.

That is -- How can iOS mobile dApps enable native transaction signing?

We commonly see the same questions and ideas being raised across different social medias and platforms, so one goal of this article is to share all the insights from the Solana Mobile team's research into different iOS solutions.

## Mobile Wallet Adapter

First, we need to understand why the current implementation of MWA (Mobile Wallet Adapter) is incompatible with iOS.

In the MWA Android SDKs, _local web sockets_ are used to establish a persistent background connection between the dApp and the wallet app. This is an on-going two way channel that allows the dApp to seamlessly exchange messages with the wallet, asking for authorization, signing, etc.

On iOS, this type of persistent communication is not possible because of the strict limitations around iOS app background execution. In short, the operating system will terminate the connection between the dApp and wallet during the MWA protocol.

## Issues with Deep Linking

One potential solution that has been brought up is wallet communication through the use of _deep links_ (technically called [_Universal Links_](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc) on iOS, but we'll refer to them as deep links throughout this document).

While deep links may sound like a viable solution, they fundamentally cannot provide the same functionality as an MWA persistent connection while also delivering a good user experience.

These are the issues with deep linking as a replacement for MWA on iOS:

### 1. Excessive Context Switching

A typical MWA session requires multiple back and forth message exchanges between a wallet and dApp. This is problematic with deep links because each message triggers a full app switch, which leads to excessive app switches within a full session.

To illustrate this let's look at signing flows, with a hypothetical idealized deep link implementation (In reality, a deep link request/response API would be more convoluted than a simple `deepLinkWalletToX` method, discussed later).

```ts
/** Signing a single transaction */
// Round trip 1
const { walletAddress, authToken } = deeplinkWalletToConnect();

if (walletAddress) {
  const tx = buildTx(walletAddress);
  // Round trip 2
  const signedTransaction = deeplinkWalletToSign(tx, authToken);
}
```

With every additional request, we have to do an additional context switch. This quickly can become jarring for users as the # of requests increases

```tsx
/** Signing two separate transactions */
// Round trip 1
const { walletAddress, authToken } = deeplinkWalletToConnect();

if (walletAddress) {
  const tx1 = buildTx(walletAddress);
  const tx2 = buildAnotherTx(walletAddress);

  // Round trip 2
  const signedTx1 = deeplinkWalletToSign(tx, authToken);

  // Round trip 3
  const signedTx2 = deeplinkWalletToSign(tx, authToken);
}
```

Maybe we can further improve this by batching transactions into a single deep link request.

```tsx
/** Signing batched transactions */
// Round trip 1
const { walletAddress, authToken } = deeplinkWalletToConnect();

if (walletAddress) {
  const [tx1, tx2, tx3] = buildTxs(walletAddress);
  // Round trip 2
  const signedTxs = deeplinkWalletToSignAll([tx1, tx2, tx3], authToken);
}
```

That seems better...but what if a request depends on the outcome of a previous request?

Suddenly, we can no longer batch the transactions together and once again need to separate them:

```tsx
/** Signing dependent transactions */
// Round trip 1
const { walletAddress, authToken } = deeplinkWalletToConnect();

if (walletAddress) {
  const tx1 = buildTx(walletAddress);
  // Round trip 2
  const signedTx1 = deeplinkWalletToSign(tx1, authToken);

  // tx2 depends on outcome of tx1
  const tx2 = buildTx(walletAddress, signedTx);
  const signedTx2 = deepLinkWalletToSign(tx2, authToken);
}
```

Deeplinks do not provide the same flexibility as MWA especially for more complicated signing and sending operations. Deeplink UX _can_ be acceptable for simple one-off operations.

### 2. Wallet Selection Issues

On Android, wallet apps all register to handle MWA intents with `solana-wallet://` scheme. When an MWA intent is sent out by a dApp, the Android OS displays a _Chooser dialog_ that displays all the installed wallet apps that can implement MWA. This is known as _Intent disambiguation_. Once chosen, the dApp knows which wallet to establish communication with.

This is good UX that allows users to be in control of how they interact with your app.

On iOS, there is no _disambiguation_ step when handling a particular deeplink/scheme. While multiple iOS apps can register to handle a standard link like `solana-wallet://`, the system does not provide a _Chooser dialog_ equivalent to Android's. Instead, it default opens the wallet app that was installed first.

This is bad UX that can be unexpected, confusing, and frustrating behavior for the user.

##### Master Wallet List Solution?

A potential solution is for each wallet to designate their own custom deep link scheme to handle MWA requests on iOS (ie: `wallet-name://mwa/...`). Then the dApp would then fetch some _master list_ of all wallet links, check if they're available on the user's device, then show a UI that allows users to choose the wallet (essentially creating a _Chooser dialog_ UI for your dApp).

The master list should have 3 qualities:

1. Easily accessible to the dApp.
2. Easy for wallets to add themselves to the list.
3. Consistently up-to-date and include additions from new wallets.

**This solution seems promising at first, but runs into major pitfalls**.

The master wallet list solution introduces 2 UX issues:

**Cluttered Chooser UI**

Within this hypothetical Chooser UI, users would have to search through the entire master list of wallets to find their desired wallet. There isn't a way a dApp can narrow down the options to only installed wallets, while maintaining requirement 3. (\*\*See footnote 1, on why we can't narrow the selection). This is a bad user experience and this issue can be seen in the Ethereum ecosystem with the prevalent usage of WalletConnect.

**Manual Maintenance Burden**

There is a manual maintenance burden in keeping this master list of wallets up to date. In general, manually maintained lists of wallets is a pattern the Solana ecosystem is moving away from, exemplified by the deprecation of Wallet Adapter in favor of the generalized Wallet Standard on the web.

### 3. Hacky response handling

Deep links are not designed for back and forth communication of messages. Thus, attempting to create a request and response protocol on top of deep links will lead to hacky patterns and architectures to request and receive responses.

For example, lets say you have a Swift function `sendWalletConnectRequest` that initiates a deep link connect request. Usually, this is executed in some connect button view.

```swift
// Called within some ConnectButtonView/Screen
func sendWalletConnectRequest() {
	if let url = URL(string: walletConnectDeepLink) {
		UIApplication.shared.open(url, options: [:], completionHandler: nil)
	}
}
```

**Unlike with Android intents, there is no callback mechanism to "receive" the response from the URL/app you've opened.**

The only way to "receive" the response, is to detect when your app has been opened with your specific connect response scheme (ie: `your-dapp-scheme://connect-response`)

```swift
func application(_ app: UIApplication, open url: URL, options:
				 [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

	// Detect and handle connect response scheme.
    if url.scheme == "your-dapp-scheme" && url.host == "connect-response" {
		// Then parse the "response" from the url query params.
		let connectData = parseConnectResponse(url)

		// How do you send this data back to the component/screen/UI you
		// initially sent the request from?
    }

    return true
}
```

Detecting a "response" happens within your `AppDelegate` or `SceneDelegate`, which is completely disconnected from the call site of the initial request (ie `ConnectButtonView`).

You'll need to build a (most likely hacky) implementation to post/publish the response back to the call site of the request.

```swift
func application(_ app: UIApplication, open url: URL, options:
				 [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {

	// Detect and handle connect response scheme.
    if url.scheme == "your-dapp-scheme" && url.host == "connect-response" {
		// Then parse the "response" from the url query params.
		let connectData = parseConnectResponse(url)

		// Post this response data back to the callee
		NotificationCenter.default.post(name: .didReceiveConnectResponse,
			bject: nil, userInfo: ["connectData": connectData])
    }

    return true
}
```

Using deep links as a communication protocol between two apps is **fundamentally going against what they were designed for**. Although possible, it leads to precarious implementations and can even expose a risk during the Apple app review process. Apple cares about user experience and may be inclined to reject apps that heavily rely on this improper usage of deep links.

## Solutions

There is still a way forward to enable iOS transaction signing and custody while also delivering a good user experience.

As discussed above, iOS presents challenges in enabling inter-app communication. This is problematic for the _traditional model_ of key custody, where a wallet app stores the key pair. In the past year, we have seen dApps are exploring different models of key custody for product spaces where the traditional model have too much friction.

##### Traditional Key Custody Model

- Keypair is stored in the wallet app
- dApp needs to request approval for each action
- Born out of DeFi and NFT related use cases

##### Alternative Key Custody Model

- Keypair can be stored per app
- No inter-app communication required
- Enables newer use cases like Gaming

For these alternative key custody solutions, there is a viable solution forward for iOS dApps. Let's approach the solutions from two perspectives: dApp developers and wallet apps.

### Solutions for dApp developers

#### Wallet-as-a-service

A growing solution for native iOS apps is to use a _wallet-as-a-service_ provider.

In general, these services enable dApps to have a "per-app" wallet for each user, rather than relying on a user having a self-custody wallet app. The provider is involved managing/storing the keypair with their own implementation (ie: MPC-TSS, MPC-SSS).

The relevant advantages of this solution:

1. Users can onboard quicker, reducing the additional step of installing another app.
2. Uses patterns like Social and Email login that are familiar to Web2 users.
3. No inter-app communication required, so this model works on iOS.

There are many different provider services and each offer varying levels of security, decentralization, and UX. A dApp developer should research and evaluate the trade-offs of this solution and make the correct decision for their product space.

Further discussion about the technical implementation of wallet-as-a-service providers are out of scope for this blog post, but [this article from Particle Network](https://blog.particle.network/embedded-web3-wallets-how-to-choose-a-wallet-service) gives an in-depth comparison of the different providers, implementations, and tradeoffs.

#### Passkeys

Passkeys are an emerging solution for key custody across mobile and desktop devices. In short, passkeys use public key cryptography to securely store secrets for apps and websites. Passkeys are a generalized solution to store secrets like account passwords, but can be used for web3 purposes (ie: storing keypairs).

The advantages of passkeys:

1. Users do not need to remember a _password_ to access their secrets. Instead they use biometrics like FaceID or fingerprint scanning to unlock their secrets, which is arguably both more convenient and secure for users.
2. Phishing resistant. Passkeys are intrinsically linked with the app or website they were created for, so people can never be tricked into using their passkey to sign in to a fraudulent app or website.

For a more detailed understanding of how passkeys actually store and manage a secret on a device, read the official [Apple docs](https://support.apple.com/guide/iphone/use-passkeys-to-sign-in-to-apps-and-websites-iphf538ea8d0/ios) and [Android docs](https://developers.google.com/identity/passkeys).

### Solutions for Wallet apps

As discussed previously, iOS presents challenges in establishing the inter-app communication necessary for a wallet app. With Safari Web Extensions, however, a wallet app can provide a good UX for their iOS users browsing on _Mobile Web._

#### iOS Safari Web Extension

iOS users can request wallet signing in the iOS Safari browser through the use of a Solana wallet with a [_Safari Web Extension_](https://github.com/solana-mobile/SolanaSafariWalletExtension). The user can receive signing from their installed native iOS app all within the Safari browser. An example of this is [Glow iOS wallet](https://glow.app/). The Glow app is a native iOS wallet that also provides a Safari Web Extension for wallet signing while browsing Safari.

From the dApp perspective, no additional work needs to be done to be compatible with a Safari Web Extension. They work similarly to the typical desktop Chrome extension wallet, so as long as your web dApp uses standard Solana wallet adapter libraries, it will automatically detect a Safari Web Extension wallet on iOS.

Solana wallet teams need to adopt and integrate Safari Web Extensions into their wallets, and unlock iOS mobile browser signing for the whole ecosystem. To promote this, Solana Mobile has provided an [open-source example](https://github.com/solana-mobile/SolanaSafariWalletExtension) of an iOS wallet app that implements a Safari Web Extension.

## Concluding thoughts

Although, MWA in its current form does not work on iOS, there are a growing number of solutions in its place.

As a dApp developer, research the different types of solutions presented and decide which creates the best UX for your product space. Perhaps, deeplinks are simple enough to work for your use-case.

As a wallet developer, we urge you to implement a Safari Web Extension alongside your wallet app to unlock iOS signing on the mobile browser. As mentioned above, use the [open-source example wallet implementation](https://github.com/solana-mobile/SolanaSafariWalletExtension) as a reference and get in contact with the Solana Mobile team.

###### Footnotes

1. Even when a dApp has the master list of wallet universal links, iOS doesn't provide a reliable way to _narrow_ down the list to only installed wallet apps. There exists [`canOpenUrl`](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl#return_value), but to use it successfully you must declare the app's supported URL schemes within your Info.plist in advance. This means, if a new wallet is added to the global master list, the dApp can't use `canOpenUrl` to check for its existence until it builds and publishes a new version of the app with the new schemes declared!
