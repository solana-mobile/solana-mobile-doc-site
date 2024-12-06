# Seed Vault

The [**Seed Vault**](https://github.com/solana-mobile/seed-vault-sdk) is a system service providing secure key custody to _Wallet apps_. By integrating with secure execution environments available on mobile devices (such as secure operating modes of the processor and/or secure auxiliary coprocessors), Seed Vault helps to keep your secrets safe, by moving them to the highest privileged environment available on the device. Your keys, seeds, and secrets never leave the secure execution environment, while UI components built into Android handle interaction with the user to provide a secure transaction signing experience to users.

### Using the SDK

#### For dApps

The Seed Vault SDK is designed for usage by _wallet_ apps. If you are building a mobile dApp, you should just use Mobile Wallet Adapter for your usecase.

#### For Wallet Apps

To integrate and provide Seed Vault custody in a wallet app, follow this [integration guide](https://github.com/solana-mobile/seed-vault-sdk/blob/main/docs/integration_guide.md) for a deep dive into the SDK. The repo includes a Seed vault simulator, which can be used to simulate and test for Saga Seed Vault integration on emulators.

## Solana dApp Store

The [**Solana dApp Store**](https://github.com/solana-mobile/dapp-publishing#welcome-publishers) is an alternate app distribution system, well suited to distributing apps developed by the Solana ecosystem.

It will provide a distribution channel for apps that want to establish direct relationships with their customers, without other app stores’ rules restricting the relationship or seeking a large revenue share. The goal of the Solana dApp Store is to empower the Solana community to eventually play a key role in managing the contents of this app store.

If you are interested in submitting your app to the Solana dApp Store, follow our [publishing guide](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md#welcome-publishers) to learn about our publishing process.

## Other SDKs

### Solana Pay for Android

The [**Solana Pay protocol**](https://docs.solanapay.com/) was developed independently of the Solana Mobile Stack, but combining payments with a mobile device is a natural fit for Solana Pay.

To assist developers in integrating Solana Pay, we’ve developed a [**reference implementation**](https://github.com/solana-mobile/solana-pay-android-sample) demonstrating how Wallet apps can use the system features of Android devices to capture Solana Pay URLs via QR codes, NFC taps, messages, and web browser interactions to launch Solana Pay requests.

## Development community

#### Discord

Currently, most technical discussion around the Solana Mobile Stack happens in our offical [Solana Mobile Discord](https://discord.gg/solanamobile).
If you have any questions, are interested in contributing, or want to get in touch with the development community, come join and send a message!

#### Twitter

On Twitter, you can follow [@SolanaMobile](https://twitter.com/solanamobile).
