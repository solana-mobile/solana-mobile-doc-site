
# Publishing to the Solana dApp Store

## Overview

Publishing a dApp to the Solana dApp Store involves the following:

1. Create a set of NFTs describing the dApp, publisher, and release on-chain.
1. Submit a request to the Solana dApp Store publisher portal requesting that Solana Mobile team review the dApp's release NFT.

The publishing tool is designed for CI/CD usage - all steps, including submitting publish portal requests, can be integrated into your dApp release workflows. All files used during the NFT creation and publishing request submission steps can be committed to source control.

## RPC endpoints

By default, the `dapp-store` CLI interacts with **Devnet**. This facilitates experimentation and testing, before you are ready to publish your dApp on Mainnet Beta. To publish to Mainnet Beta, add the `-u <mainnet_beta_rpc_url>` parameter to all commands below.

If you have a private RPC URL, it is **strongly** recommended that you use it. If you do not yet have a private RPC URL, you can make use of the [public endpoint](https://docs.solana.com/cluster/rpc-endpoints#mainnet-beta) (but be cognizant of the rate and usage limits).

