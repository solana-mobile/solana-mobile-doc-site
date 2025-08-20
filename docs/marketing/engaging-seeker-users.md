# Seeker Genesis Token

## Overview

The Seeker Genesis Token is a unique NFT that represents a verified owner of a Seeker device. It can only be minted once per device and is minted into the primary account in a user's Seed Vault Wallet.

## NFT Details

The Seeker Genesis Token implements Token Extensions (formerly Token-2022). 

### Token Extensions

Seeker Genesis Token implements several extensions, notably:
- Metadata Pointer
- Token Group Member and Pointer

### Key Addresses
- **Mint Authority**: `GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4`
- **Metadata Address**: `GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te`

#### View on an Explorer
- An individual [Seeker Genesis Token](https://explorer.solana.com/address/5mXbkqKz883aufhAsx3p5Z1NcvD2ppZbdTTznM6oUKLj/token-extensions) and its extensions
- Seeker Genesis Token [Metadata Account](https://explorer.solana.com/address/GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te/)

### Transferability

The Seeker Genesis Token can be transferred between a user's wallet accounts on a permissioned basis via the Mint Authority. 

A transfer occurs when a user changes their primary account in the Seed Vault Wallet.

## Verifying Seeker Genesis Token Ownership

To verify a wallet owns a Seeker Genesis Token ownership, you can use the `searchAssets` API.

Here's an example script using Helius RPC with pagination:

```js
async function checkSgtOwnership(walletAddress: string): Promise<boolean> {
  const SGT_METADATA_AUTHORITY = 'GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4';
  const SGT_METADATA_ADDRESS = 'GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te';
  
  let page = 1;
  
  while (true) {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'searchAssets',
        params: {
          ownerAddress: walletAddress,
          tokenType: 'all',
          limit: 1000,
          page: page
        }
      })
    });

    const data = await response.json();
    const assets = data.result?.items || [];
    
    if (assets.length === 0) break;
    
    for (const asset of assets) {
      const metadataPointer = asset.mint_extensions?.metadata_pointer;
      
      if (metadataPointer && 
          metadataPointer.authority === SGT_METADATA_AUTHORITY &&
          metadataPointer.metadata_address === SGT_METADATA_ADDRESS) {
        return true; // SGT found
      }
    }
    
    page++;
  }
  
  return false; // No SGT found
}
```
