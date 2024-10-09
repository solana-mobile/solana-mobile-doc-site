# Saga Genesis Token

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

The Saga Genesis Token is a unique, non-transferable NFT that represents a verified owner of a Saga device.
It is minted only once per device through the dApp Store after initial device setup.

## NFT Details

The Saga Genesis Token NFT adheres to the Metaplex [Token Standard](https://developers.metaplex.com/token-metadata/token-standard) and is part of a [Verified Collection](https://developers.metaplex.com/token-metadata/collections).

### Soulbound NFT

Every Saga Genesis Token is a Soulbound NFT that is non-transferable from the wallet that it was minted to.

Although likely, this does not mean that every Genesis Token user is interacting from a Saga device. This is because the user's wallet (more specifically, secret key) can be exported/imported from/into the device.

### Collection NFT address

The Saga Genesis Token Collection NFT address is `46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC`. Each Saga Genesis Token NFT metadata will
have a `collection` field with this address, along with the `verified` flag set to `true`.

To better understand how Collection NFTs verify a normal NFT, read the official Metaplex [documentation](https://docs.metaplex.com/programs/token-metadata/certified-collections#collection-nfts).

### View on an explorer

You can view a real Saga Genesis Token on-chain with an explorer by querying an [individual NFT mint address](https://solscan.io/token/DMcJLbYGT9UAiYXMoHMjsoLCW1MRJ12YDnU967pAvByg) or filtering by
[collection NFT address](https://solscan.io/collection/4a2d96b22ab0c8f01cb5ce5bc960b627c2a8271529ae5132d5352b7c86b3b54d).

## Verify a Saga Genesis Token holder

For certain use cases, like rewards claiming or token gated content for Saga users, you will need to verify ownership of the Saga Genesis Token NFT.

### Verifying individual ownership

For token gated content and rewards, the user can explicitly claim their Saga Genesis Token reward. The user should prove
ownership of a Saga Genesis Token and only then should they receive the rewards/content.

#### Sign in with Solana

To receive token gated content and rewards, a user first needs to prove that they own a Saga Genesis Token.
You should use _Sign in with Solana_ to verify that the connecting user truly owns the wallet that contains the Saga Genesis Token.

If you are implementing this flow on web, you can use the standard Solana web libraries like `wallet-adapter-react`, following
this [integration guide](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#dapp-integration).

If you are implementing this flow within a mobile app, you will need to manually implement SIWS using [Mobile Wallet
Adapter](/react-native/quickstart#signing-messages) (`authorize` + `signMessage`).

#### Verify the Saga Genesis Token

After proving that the user owns the wallet, you need to verify that the user's wallet actually contains a Saga Genesis Token. There are different ways to do this, but the simplest is to query an RPC provider that supports the [_DAS (Digital Asset Standards)_ API](https://github.com/metaplex-foundation/digital-asset-standard-api).

Given the user's wallet address you can use the _searchAssets_ DAS API method to check ownership of a Saga Genesis Token NFT.

<Tabs>
<TabItem value="Javascript" label="Javascript">

```javascript
const url = `https://your.rpc.com/?api-key=<api_key>`;

const searchAssets = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "searchAssets",
      params: {
        ownerAddress: "<user-wallet-address>", // user's wallet address
        grouping: [
          "collection",
          "46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC", // Genesis Token Collection NFT Address
        ],
        page: 1, // Starts at 1
        limit: 1000,
      },
    }),
  });
  const { result } = await response.json();
  if (result?.total === 1) {
    console.log("Wallet contains a Saga Genesis Token!");
  } else {
    console.log("Wallet does not contain a Saga Genesis Token.");
  }
};
searchAssets();
```

</TabItem>
</Tabs>

The above is a modification of the example from the [Helius DAS API documentation](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/search-assets).

## Fetching a mint list of holders

For use cases like snapshots and airdropping, you can query for the entire list of current holders.

To fetch the entire collection list of Saga Genesis Token holders, you can use the `getAssetsByGroup` DAS API method. In the following example,
the paginated response is a list of Saga Genesis Token Assets and metadata.

<Tabs>
<TabItem value="Javascript" label="Javascript">

```javascript
const url = "https://your.rpc.com/?api-key=<api-key>";

const getAssetsByGroup = async () => {
  const response = await fetch(url, {
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
        groupValue: "46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC", // Genesis Token Collection NFT Address
        page: 1, // Starts at 1
        limit: 1000,
      },
    }),
  });
  const { result } = await response.json();
  console.log("Page 1 of Saga Genesis Token Assets: ", result.items);
};
getAssetsByGroup();
```

</TabItem>
</Tabs>

The above is a modification of the example from the [Helius DAS API documentation](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/get-assets-by-group).

Alternatively, there are many [third-party/community created tools](https://docs.metaplex.com/guides/mint-lists) to generate a mint list.
