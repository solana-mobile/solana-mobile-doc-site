# Submitting your dApp for review

### Create a keypair for your dapp

**IMPORTANT: this keypair is a critical secret for your dApp. Whomever possesses it is able to create new releases of your dApp and submit them to the Solana dApp Store. It should be safeguarded with appropriate technical measures.**

See the [File System Wallet](https://docs.solana.com/wallet-guide/file-system-wallet) instructions to create a new keypair for publishing your dApp. You'll need to fund your account with some SOL to mint the necessary publisher, dApp, and release NFTs. For testing purposes, you can use devnet or testnet, and airdrop some SOL to this wallet.

### Validate your configuration

To validate the details you have provided in your configuration file, use:

```
npx dapp-store validate -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools>
```

On success, you should see output similar to:

```
Publisher JSON valid!
App JSON valid!
Release JSON valid!
```

### Mint the NFTs

#### 1. Create the publisher NFT

   ```
   npx dapp-store create publisher -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
   ```
_NOTE: this is a one-time operation. Once you have created your publisher, the mint address is recorded in your configuration file_.

#### 2. Create the dApp NFT
   ```
   npx dapp-store create app -k <path_to_your_keypair> [-u <mainnet_beta_rpc_url>]
   ```

_NOTE: this is a one-time operation. Once you have created your dApp, the mint address is recorded in your configuration file_.

#### 3. Create the release NFT

   ```
   npx dapp-store create release -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools> [-u <mainnet_beta_rpc_url>]
   ```

_NOTE: this will be repeated each time you have a new version of your dApp to release. The mint address of the latest release is recorded in your configuration file_.
   > **Warning**: on this step make sure your network is reliable and has a minimum upload speed of 0.25 megabytes per second.

### Submit your dApp

After minting a complete set of NFTs (publisher, dApp, and release) to represent your dApp on-chain, you may choose to submit them to the Solana dApp Publisher Portal, as a candidate for inclusion in the Solana dApp Store catalog.

```
npx dapp-store publish submit -k <path_to_your_keypair> -u <mainnet_beta_rpc_url> --requestor-is-authorized --complies-with-solana-dapp-store-policies
```

The two flags for this command (`--requestor-is-authorized` and `--complies-with-solana-dapp-store-policies`) are attestations from the requestor that this dApp is compliant with Solana dApp Store policies, and that they are authorized to submit this request to the Solana dApp Publisher Portal.

After submitting, please check the email address specified in the `publisher` section of your configuration file; you will receive correspondence from the Solana dApp Publisher Portal to that account.

