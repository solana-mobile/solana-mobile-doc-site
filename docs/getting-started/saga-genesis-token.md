# Saga Genesis Token

## Introduction

The Saga Genesis Token is a unique, non-transferable NFT that aims to represent a verified owner of a Saga device.
It is minted only once per device through the Saga dApp Store after initial device setup.

The Genesis Token is a Soulbound NFT, meaning that it cannot be transfered out of the wallet that it was initially minted to.

## NFT Details

The Saga Genesis Token NFT adheres to the Metaplex [Token Standard](https://developers.metaplex.com/token-metadata/token-standard) and is part of a [Verified Collection](https://developers.metaplex.com/token-metadata/collections).

### Soulbound NFT

Every Saga Genesis Token is a Soulbound NFT that is non-transferable from the wallet that it was minted to.

Although likely, this does not mean that every Genesis Token user is interacting from a Saga device. This is because the user's wallet (more specifically, secret key) can be exported/imported from/into the device.

### Collection NFT address

The Saga Genesis Token Collection NFT address is `46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC`. Each Saga Genesis Token NFT metadata will
have a `collection` field with this address.

To learn more about Collection NFTs read the official Metaplex [documentation](https://docs.metaplex.com/programs/token-metadata/certified-collections#collection-nfts).

### View on an explorer

You can view a real Saga Genesis Token on-chain [with an explorer](https://solscan.io/collection/4a2d96b22ab0c8f01cb5ce5bc960b627c2a8271529ae5132d5352b7c86b3b54d) by querying the collection NFT address.

## Verify a Saga Genesis Token holder

For certain use cases, like airdrops or token gated content for Saga users, you will want to verify the Saga Genesis Token NFT.

### Verifying individual ownership

To verify a user (or public key address) owns a Genesis Token NFT, there are two parts:

1. Verify that the wallet owns a Saga Genesis Token NFT
2. Verify the the user actually owns the wallet by signing a message.

### Fetching master list of holders
