
# Mint & Submit your dApp for review

## Create a Solana keypair for your dapp

See the [File System Wallet](https://docs.solana.com/wallet-guide/file-system-wallet) instructions to create a new keypair for publishing your dApp. You'll need to fund your account with some SOL to mint the necessary publisher, dApp, and release NFTs. For testing purposes, you can use devnet or testnet, and airdrop some SOL to this wallet.

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

## Mint your NFTs

### 1. Create your publisher NFT

```shell
npx dapp-store create publisher -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
```

:::info
This is a **one-time** operation. Once you have created your publisher, the mint address is recorded in your configuration file.
:::

### 2. Create your app NFT

```shell
npx dapp-store create app -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
```

:::info
This is a **one-time** operation per app. Once you have created your dApp, the mint address is recorded in your configuration file.
:::

### 3. Create you release NFT

```shell
npx dapp-store create release -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools> [-u <mainnet_beta_rpc_url>]
```

:::info
You will repeat this step for each new version of your dApp you want to release. The mint address of the latest release is recorded in your configuration file.
:::

:::caution
Please make sure your network connection is reliable and has a minimum upload speed of 0.25 megabytes per second.
:::

## Submit your app

After minting a complete set of on-chain NFTs (publisher, dApp, and release), you may choose to submit them to the Solana dApp Publisher Portal, as a candidate for inclusion in the Solana dApp Store catalog:

```shell
npx dapp-store publish submit -k <path_to_your_keypair> -u <mainnet_beta_rpc_url> --requestor-is-authorized --complies-with-solana-dapp-store-policies
```

The two flags for this command (`--requestor-is-authorized` and `--complies-with-solana-dapp-store-policies`) are attestations from the requestor that this dApp is compliant with Solana dApp Store policies, and that they are authorized to submit this request to the Solana dApp Publisher Portal.

After submitting, please check the email address specified in the `publisher` section of your configuration file; you will receive correspondence from the Solana dApp Publisher Portal to that account.


## 4. Wait for a decision on your app

After submitting, we’ll review your app based on our policies. Please make sure to provide a valid email address, so that we can reach out to you with any questions about your submission.

