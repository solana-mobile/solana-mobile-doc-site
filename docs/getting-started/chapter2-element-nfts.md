---
title: Chapter 2 Element NFTs
description: An article explaning the distribution and technical details of the Chapter 2 Element NFTs.
slug: chapter2-element-nfts
authors:
  - name: Mike Sulistio
    title: Developer Relations @ Solana Mobile
    url: https://twitter.com/MikeSulistio
    image_url: /blog_profile_pics/mikesulistio.png
tags: [saga, chapter-2, leaderboard, tanzanite, diamond, emerald, NFT]
hide_table_of_contents: false
---

import BlogImageRow from "../../src/components/BlogImageRow/"

# Chapter 2 Element NFTs

<BlogImageRow>
  <img src="/blog_imgs/emerald-nft.jpeg" alt="Emerald NFT" width="33%" />
  <img src="/blog_imgs/tanzanite-nft.jpeg" alt="Tanzanite NFT" width="33%" /> 
  <img src="/blog_imgs/diamond-nft.jpeg" alt="Diamond NFT" width="33%" />
</BlogImageRow>

## Introduction

This article provides information about the Solana Mobile Chapter 2 Element NFTs. The non-transferrable Chapter 2 Element NFTs allow for the identification of wallets of referrers with the highest number of successful referrals on the Chapter 2 Leaderboard.

Solana Mobile does not currently have a rewards program in connection with the Chapter 2 Element NFTs. Ecosystem teams are entirely free to decide if (and if so, how) they wish to interact with the holders of these non-transferrable NFTs.

## Element NFT holders

The Chapter 2 preorder phase launched with a referral system where users could refer others to make a deposit toward the future purchase of the Chapter Two device. The top 1500 people on the [Chapter 2 Leaderboard](https://two.solanamobile.com/leaderboard) were able to claim a soulbound, non-transferrable Element NFT.

The leaderboard rankings were determined by the referrers with the highest number of successful referrals, specifically through people preordering Chapter 2 via their unique referral links.

There were 2 snapshots taken that captured the top 1500 leaderboard ranks at a given time.

## Element NFT Collections

3 sets of Element NFTs were created to award top 1500 leaderboard users during each snapshot. Additionally,
they were required to be claimed by the recipient.

- The _Emerald NFT_ was available to claim by the top 1500 during the **first snapshot**.
- The _Tanzanite NFT_ was available to claim by the top 1500 during the **second snapshot**.
- The _Diamond NFT_ was available to claim by the top 1500 with most referrals of **all time**.

Within each set, the NFTs are separated by tiers of ranking `1-50`, `51-500`, and `501-1500`. For example, a user can own both an Emerald NFT that is rank `501-1500` and also
a Tanzanite NFT that has rank `51-500`.

## NFT Details

### Collection Address

Each Element NFT contains a reference to its verified collection address.

- Emerald NFT Collection Address: `7MMBHN5nXK1pEgK3AzaMTcSiDrXdb5AFfcQ6JGGdUGcp`
- Tanzanite NFT Collection Address: `6SfWQ7bN8JkWbqxAsdnB9N24wSNshdMjGvmArFptQScC`
- Diamond NFT Collection Address: `DN2eswVVvF3r3gKTPwyXic6QgRcYaMBa52j3FqQswqYd`

### Metadata

Each Element NFT adheres to the Metaplex [Token Standard](https://developers.metaplex.com/token-metadata/token-standard) and is part of a [Verified Collection](https://developers.metaplex.com/token-metadata/collections).

Each NFT also contains a rank tier embedded in the NFT metadata `Rank` attribute with value of either `"1-50"`, `"51-500"`, or `"501-1500"`.

## Querying for Element NFT holders

You can follow these steps to query an Element NFT collection and save the list into a JSON file:

### 1. Access your RPC provider

Any RPC provider with the DAS (Digital Asset Standard) APIs should work. If you don't have one, the Helius Free plan (helius.dev/pricing) should be sufficient for this query.

### 2. Add your API Key to the following query

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

### 3. Specify the NFT collection

Insert the desired collection address as listed in place of the “Add address here”

```js
const NFT_COLLECTION_ADDRESS = "ADD ADDRESS HERE";
```

### 4. Perform the query

Run the script to perform the query and you can find the results in the output file `out.json`.
