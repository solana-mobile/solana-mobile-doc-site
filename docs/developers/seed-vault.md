# Seed Vault

The [**Seed Vault**](https://github.com/solana-mobile/seed-vault-sdk) is a system service providing secure key custody to _Wallet apps_. By integrating with secure execution environments available on mobile devices (such as secure operating modes of the processor and/or secure auxiliary coprocessors), Seed Vault helps to keep your secrets safe, by moving them to the highest privileged environment available on the device. Your keys, seeds, and secrets never leave the secure execution environment, while UI components built into Android handle interaction with the user to provide a secure transaction signing experience to users.

### Using the SDK

#### For dApps

The Seed Vault SDK is designed for usage by _wallet_ apps. If you are building a mobile dApp, you should just use Mobile Wallet Adapter for your usecase.

#### For Wallet Apps

To integrate and provide Seed Vault custody in a wallet app, follow this [integration guide](https://github.com/solana-mobile/seed-vault-sdk/blob/main/docs/integration_guide.md) for a deep dive into the SDK. The repo includes a Seed vault simulator, which can be used to simulate and test for Saga Seed Vault integration on emulators.

