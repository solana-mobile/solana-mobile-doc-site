---
title: Chapter 2 Leaderboard NFTs
description: An explanation of the Element NFT collections distributed to Chapter 2 Leaderboard users.
slug: chapter2-leaderboard-nfts
authors:
  - name: Mike Sulistio
    title: Developer Relations @ Solana Mobile
    url: https://twitter.com/MikeSulistio
    image_url: /blog_profile_pics/mikesulistio.png
tags: [saga, chapter-2, leaderboard, tanzanite, diamond, emerald, NFT]
hide_table_of_contents: false
---

import BlogImageRow from "../src/components/BlogImageRow/"

# Chapter 2 NFTs

After the sellout of the Saga, Solana Mobile announced [Chapter 2](https://two.solanamobile.com) and launched a storefront where users can purchase preorders.

In this preorder phase, Solana Mobile distributed various _soulbound NFT_ collections, similar in concept to the Saga Genesis token, to customers of Chapter 2.

1. Chapter 2 Preorder Token NFT
2. Chapter 2 Leaderboard Element NFTs

Let's dive into how each NFT collection is distributed and their technical details.

## Chapter 2 Preorder Token

<BlogImageRow>
  <img src="/blog_imgs/chapter2-preorder-token.jpeg" alt="Preorder Token" width="300" />
</BlogImageRow>

### Distribution

The Chapter 2 Preorder Token NFT is a non-transferable NFT distributed to the wallets of customers who had preordered within the Founder Window.

The Founder Window was the first preorder window that spanned the initial ~100,000 preorders of Chapter 2.

### NFT Details

The Chapter 2 Preorder Tokens are NFTs built with the new [Token Extensions](https://solana.com/developers/guides/token-extensions/getting-started) program (also known as Token-2022). This is different from the Saga Genesis Token, which adheres to the Metaplex Token standard.

#### Mint Address

The Chapter 2 Preorder Token mint address is:

- `2DMMamkkxQ6zDMBtkFp8KH7FoWzBMBA1CGTYwom4QH6Z`

This mint address is shared by all token accounts of the Chapter 2 Preorder Token.

#### Soulbound NFT

Every Chapter 2 Preorder Token is a non-transferable NFT that was minted to the wallet the user provided during preorder.

This non-transferability is enabled by the [_NonTransferable_ extension](https://solana.com/developers/guides/token-extensions/non-transferable).

#### Metadata

Each Chapter 2 Preorder Token NFT utilizes the [Metadata and Metadata Pointer](https://solana.com/developers/guides/token-extensions/metadata-pointer) extension to define
its NFT metadata.

```
Metadata
    Uri: https://arweave.net/WHyy5Fo8vUC7FqFfzqkuYAmDi-BfOMBjZSXIwwO7P6g
    Mint: 2DMMamkkxQ6zDMBtkFp8KH7FoWzBMBA1CGTYwom4QH6Z
    Name: Chapter 2 Preorder Token
    Symbol: CHAPTER2
    Update Authority: GRR6BquJZYWgUqWpNJekBZHDHgxVQ56iZ2P2nWjDFRSn
    Additional Metadata
Metadata Pointer
    Authority: GRR6BquJZYWgUqWpNJekBZHDHgxVQ56iZ2P2nWjDFRSn
    Metadata Address: 2DMMamkkxQ6zDMBtkFp8KH7FoWzBMBA1CGTYwom4QH6Z
```

### Querying for Chapter 2 Preorder Tokens

The simplest way to query for holders is to use an RPC provider that supports the _[DAS (Digital Asset Standard) API](https://github.com/metaplex-foundation/digital-asset-standard-api)_.

You can provide the mint address in a [_getTokenAccounts_](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/get-token-accounts) method call to query for all the token accounts of Chapter 2 Preorder Tokens. In the response, the `owner` field of each token account is the wallet of the NFT holder.

## Chapter 2 Leaderboard NFTs

<BlogImageRow>
  <img src="/blog_imgs/emerald-nft.jpeg" alt="Emerald NFT" width="33%" />
  <img src="/blog_imgs/tanzanite-nft.jpeg" alt="Tanzanite NFT" width="33%" /> 
  <img src="/blog_imgs/diamond-nft.jpeg" alt="Diamond NFT" width="33%" />
</BlogImageRow>

### Distribution

The Chapter 2 preorder phase also launched with a referral system where users could refer others to purchase a preorder. The top 1500 users with the most referrals are displayed and ranked on the [Chapter 2 Leaderboard](https://two.solanamobile.com/leaderboard). There were 2 snapshots taken that captured the top 1500 leaderboard ranks at a given time.

The 3 collections of Element NFTs were created to be distributed to these top 1500 leaderboard users at each snapshot.

- The _Emerald NFT_ was available to claim by the top 1500 during the **first snapshot**.
- The _Tanzanite NFT_ was available to claim by the top 1500 during the **second snapshot**.
- The _Diamond NFT_ was available to claim by the top 1500 of **all time**.

Within each collection, the NFTs are separated by tiers of ranking `1-50`, `51-500`, and `501-1500`. For example, a user can own an Emerald NFT that is rank `501-1500` and also
own a Tanzanite NFT that has rank `51-500`.

### NFT Details

### Emerald NFT

#### Distribution

### Emerald NFT

### Emerald NFT
