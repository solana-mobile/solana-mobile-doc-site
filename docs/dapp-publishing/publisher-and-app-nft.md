# Mint your Publisher and App NFT

If this is your first time publishing an app on the dApp Store, then you will need to mint a **Publisher NFT** and an **App NFT**.

:::tip
If you are looking to publish an update version of an existing app, then skip to [this step](/dapp-publishing/publishing_releases).
:::

A Publisher NFT:

- Contains metadata that describes you, the publisher of the dApp.
- **Created only once** and is re-used for publishing other apps under the same publisher.

An App NFT:

- Contains metadata that describes this specific app as a whole
- **Created only once per app**. Subsequent app updates will instead rely on the _Release NFT_.

## Create a Solana keypair for your dapp

See the [File System Wallet](https://docs.anza.xyz/cli/wallets/file-system) instructions to create a new keypair for publishing your dApp. You'll need to fund your account with some SOL to mint the necessary publisher, dApp, and release NFTs. For testing purposes, you can use devnet or testnet, and airdrop some SOL to this wallet.

:::danger Keep Your Keypair Safe
This keypair is a critical secret for your dApp. Whomever possesses it is able to create new releases of your dApp and submit them to the Solana dApp Store. It should be safeguarded with appropriate technical measures.
:::

## RPC endpoints

By default, the dApp store CLI interacts with **Devnet**. This facilitates experimentation and testing, before you are ready to publish your dApp on Mainnet Beta. To publish to Mainnet Beta, add the `-u <mainnet_beta_rpc_url>` parameter to all commands below.

:::tip
We **strongly** recommend you use a private RPC URL, as this will make the NFT minting process **much** more reliable as compared to the Solana public RPC.
:::

## Validate your configuration

First, you should validate the details you have provided in your configuration file:

```shell
npx dapp-store validate -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools>
```

On success, you should see output similar to:

```shell
Publisher JSON valid!
App JSON valid!
Release JSON valid!
```

:::info
If you have `.mp4` video assets in your publishing, make sure you have `ffmpeg` utility library [installed](/dapp-publishing/setup#ffmpeg).
:::

## Mint your NFTs

:::tip
When using CLI version >= `0.8.0`, the following commands will submit a Solana transaction that includes a default priority fee of `500000` lamports.

To customize this value, use param `-p` or `--priority-fee-lamports <priority-fee-lamports>`
:::

### 1. Create your publisher NFT

```shell
npx dapp-store create publisher -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
```

:::info
This is a **one-time** operation. Once you have created your publisher, the mint address is recorded in your configuration file.

If you have already published an app, you should not mint a new Publisher NFT and instead, reuse your existing NFT.
:::

### 2. Create your app NFT

```shell
npx dapp-store create app -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
```

:::info
This is a **one-time** operation per app. Once you have created your dApp, the mint address is recorded in your configuration file.
:::
