---
title: Chapter 2 Preorder Tokens and Element NFTs
description: An article explaning the distribution and technical details of the Chapter 2 NFTs.
slug: chapter2-nfts
authors:
  - name: Mike Sulistio
    title: Developer Relations @ Solana Mobile
    url: https://twitter.com/MikeSulistio
    image_url: /blog_profile_pics/mikesulistio.png
tags: [saga, chapter-2, leaderboard, tanzanite, diamond, emerald, NFT]
hide_table_of_contents: false
---

import BlogImageRow from "../src/components/BlogImageRow/"

# Chapter 2 Preorder Tokens and Element NFTs

## Introduction

This article provides information about the Solana Mobile Chapter 2 Preorder Tokens and Element NFTs.

While the non-transferrable Chapter 2 Preorder Tokens and non-transferable Element NFTs allow for the identification of wallets that have participated in supporting Chapter 2, Solana Mobile does not currently have a rewards program in connection with the Chapter 2 Preorder Token or the Element NFT.

Ecosystem teams are entirely free to decide if (and if so, how) they wish to interact with the holders of these non-transferrable tokens and NFTs.

## Preorder Phase

During the preorder phase of Chapter 2, Solana Mobile distributed various _soulbound NFTs_ to customers who had preordered.

1. Chapter 2 Preorder Token NFT
2. Chapter 2 Leaderboard Element NFTs

Let's dive into how each NFT is distributed and their technical details.

## Chapter 2 Preorder Token

<BlogImageRow>
  <img src="/blog_imgs/chapter2-preorder-token.jpeg" alt="Preorder Token" width="300" />
</BlogImageRow>

### Chapter 2 Preorder Token holders

The Chapter 2 Preorder Token NFT is a non-transferable NFT distributed to the wallets of anyone who has preordered Chapter 2.

As of the time this article was written, there are 110,000+ holders of the Preorder Token, but preorder phase is still active and new Tokens are issued in waves.

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

### Querying for Chapter 2 Preorder Token holders

You can follow these steps to query the Chapter 2 Preorder Token list and save it into a JSON file:

#### 1. Access your RPC provider.

Any RPC provider with the [DAS (Digital Asset Standard)](https://github.com/metaplex-foundation/digital-asset-standard-api) APIs should work. If you don't have one, the Helius Free plan (helius.dev/pricing) should be sufficient for this query.

#### 2. Add your API Key to the following query:

```js
import { writeFileSync } from "fs";

const DAS_API_URL = "https://mainnet.helius-rpc.com/?api-key=<API_KEY>";
const TOKEN_MINT_ADDRESS = "2DMMamkkxQ6zDMBtkFp8KH7FoWzBMBA1CGTYwom4QH6Z";
const OUTPUT_FILE = `out.json`;

let tokens = [];

let page = 0;
while (true) {
  page++;
  console.log(`Fetching page ${page}`);
  const response = await fetch(DAS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getTokenAccounts",
      params: {
        mint: `${TOKEN_MINT_ADDRESS}`,
        page: page, // Starts at 1
        limit: 1000,
      },
    }),
  });
  const { result } = await response.json();
  if (result.total === 0) {
    console.log("Done!");
    break;
  }
  for (const item of result.token_accounts) {
    tokens.push({ owner: item.owner, count: item.amount });
  }
}

console.log(`Writing to ${OUTPUT_FILE}`);
writeFileSync(OUTPUT_FILE, JSON.stringify(tokens, null, 2));
```

#### 3. Perform the Query

Run the script to perform the query and you can find the results in the outputfile `out.json`.

#### 4. Further querying (optional)

In order to query a subset of the Preorder Token Holders, you may write a script to fetch wallet activity data using blockchain explorers and analytics tools based on the subset criteria. You can use their APIs to retrieve transaction history, token balances, and other relevant information, such as:

- Length of their engagement with the applicable protocol (i.e. The date of the first transaction)
- Participation in applications within the ecosystem that are adjacent or complementary to your project

## Chapter 2 Leaderboard NFTs

<BlogImageRow>
  <img src="/blog_imgs/emerald-nft.jpeg" alt="Emerald NFT" width="33%" />
  <img src="/blog_imgs/tanzanite-nft.jpeg" alt="Tanzanite NFT" width="33%" /> 
  <img src="/blog_imgs/diamond-nft.jpeg" alt="Diamond NFT" width="33%" />
</BlogImageRow>

### Element NFT holders

The Chapter 2 preorder phase launched with a referral system where users could refer others to purchase a preorder. The top 1500 people on the Leaderboard were able to claim a soulbound, non-transferrable Element NFT.

The leaderboard rankings were determined by the referrers with the highest number of successful referrals, specifically through people preordering Chapter 2 via their unique referral links.

with the most referrals are displayed and ranked on the [Chapter 2 Leaderboard](https://two.solanamobile.com/leaderboard). There were 2 snapshots taken that captured the top 1500 leaderboard ranks at a given time.

### Element NFT Collections

3 sets of Element NFTs were created to award top 1500 leaderboard users during each snapshot. Additionally,
they were required to be claimed by the recipient.

- The _Emerald NFT_ was available to claim by the top 1500 during the **first snapshot**.
- The _Tanzanite NFT_ was available to claim by the top 1500 during the **second snapshot**.
- The _Diamond NFT_ was available to claim by the top 1500 with most referrals of **all time**.

Within each set, the NFTs are separated by tiers of ranking `1-50`, `51-500`, and `501-1500`. For example, a user can own both an Emerald NFT that is rank `501-1500` and also
a Tanzanite NFT that has rank `51-500`.

### NFT Details

#### Collection Address

Each Element NFT contains a reference to its verified collection address.

- Emerald NFT Collection Address: `7MMBHN5nXK1pEgK3AzaMTcSiDrXdb5AFfcQ6JGGdUGcp`
- Tanzanite NFT Collection Address: `6SfWQ7bN8JkWbqxAsdnB9N24wSNshdMjGvmArFptQScC`
- Diamond NFT Collection Address: `DN2eswVVvF3r3gKTPwyXic6QgRcYaMBa52j3FqQswqYd`

#### Metadata

Each Element NFT adheres to the Metaplex [Token Standard](https://developers.metaplex.com/token-metadata/token-standard) and is part of a [Verified Collection](https://developers.metaplex.com/token-metadata/collections).

Each NFT also contains a rank tier embedded in the NFT metadata `Rank` attribute with value of either `"1-50"`, `"51-500"`, or `"501-1500"`.

### Querying for Element NFT holders

You can follow these steps to query an Element NFT collection and save the list into a JSON file:

#### 1. Access your RPC provider

Any RPC provider with the DAS (Digital Asset Standard) APIs should work. If you don't have one, the Helius Free plan (helius.dev/pricing) should be sufficient for this query.

#### 2. Add your API Key to the following query

```javascript
import { writeFileSync } from "fs";

const DAS_API_URL = "https://mainnet.helius-rpc.com/?api-key=API_KEY_HERE";
const NFT_COLLECTION_ADDRESS = "ADD ADDRESS HERE";
const OUTPUT_FILE = out.json;

let nfts = {};

let page = 0;
while (true) {
  page++;
  console.log(`Fetching page ${page}`);
  const response = await fetch(DAS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByGroup",
      params: {
        groupKey: "collection",
        groupValue: NFT_COLLECTION_ADDRESS,
        page: page, // Starts at 1
        limit: 100,
      },
    }),
  });
  const { result } = await response.json();
  if (result.total === 0) {
    console.log("Done!");
    break;
  }
  for (const item of result.items) {
    if (item.burnt) {
      console.log(`Skipping burnt token ${item.id}`);
      continue;
    }

    let rank = undefined;
    for (const attribute of item.content.metadata.attributes) {
      if (attribute.trait_type === "Rank") {
        rank = attribute.value;
      }
    }
    if (rank === undefined) {
      throw Error(`Rank attribute not found for ${item.id}`);
    }
    if (nfts[rank] === undefined) {
      nfts[rank] = [];
    }
    nfts[rank].push(item.ownership.owner);
  }
}

console.log(`Writing to ${OUTPUT_FILE}`);
writeFileSync(OUTPUT_FILE, JSON.stringify(nfts, null, 2));
```

#### Specify the NFT collection

Insert the desired collection address as listed in place of the “Add address here”

```js
const NFT_COLLECTION_ADDRESS = "ADD ADDRESS HERE";
```

#### 4. Perform the query

Run the script to perform the query and you can find the results in the outputfile `out.json`.
