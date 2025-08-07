# Seeker Genesis Token

## Overview

The Seeker Genesis Token is a unique, non-transferable NFT that represents a verified owner of a Seeker device. It can only be minted once per device.

## NFT Details

The Seeker Genesis Token implements Token Extensions (formerly Token-2022). 

### Token Extensions

Seeker Genesis Token implements several extensions, notably:
- Metadata Pointer
- NonTransferable
- Token Group Member and Pointer

### Key Addresses
- **Mint Authority**: `GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4`
- **Metadata Address**: `GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te`

#### View on an Explorer
- An individual [Seeker Genesis Token](https://explorer.solana.com/address/5mXbkqKz883aufhAsx3p5Z1NcvD2ppZbdTTznM6oUKLj/token-extensions) and its extensions
- Seeker Genesis Token [Metadata Account](https://explorer.solana.com/address/5mXbkqKz883aufhAsx3p5Z1NcvD2ppZbdTTznM6oUKLj/token-extensions)

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

## Querying a mint list of holders 

You can query an RPC and fetch a mint list of all Seeker Genesis Token holders.

This script can be prone to rate limit, so consider lowering the batch sizes or upgrading your RPC plan.

```js
import { Connection, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';

async function fetchAllHolders() {
  const connection = new Connection('replace-with-rpc-url');
  const GROUP = 'GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te'; 
  
  console.log('Fetching SGT holder signatures...');
  
  // Fetch all signatures with pagination 
  let sigs = [];
  let before = undefined;
  const limit = 1000; 
  
  while (true) {
    const options = { limit };
    if (before) options.before = before;
    
    const batch = await connection.getSignaturesForAddress(
      new PublicKey('GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4'), 
      options
    );
    
    if (batch.length === 0) break; // No more signatures
    
    sigs.push(...batch);
    before = batch[batch.length - 1].signature;
    
    console.log(`Fetched ${sigs.length} signatures so far...`);
  }
  
  console.log(`Found ${sigs.length} signatures to process`);
  
  const holders = [];

  // Process in larger batches for speed
  for (let i = 0; i < sigs.length; i += 20) {
    const batch = sigs.slice(i, i + 20);
    console.log(`Processing batch ${Math.floor(i / 20) + 1}/${Math.ceil(sigs.length / 20)}`);
    
    const txs = await Promise.all(batch.map(s => 
      connection.getParsedTransaction(s.signature, { maxSupportedTransactionVersion: 0 })
    ));
    
    for (const tx of txs) {
      if (!tx?.meta?.postTokenBalances) continue;
      
      const hasGroup = tx.transaction.message.accountKeys.some(a => a.pubkey.toBase58() === GROUP);
      if (!hasGroup) continue;
      
      for (const b of tx.meta.postTokenBalances) {
        if (b.mint && b.owner && b.uiTokenAmount.uiAmount === 1) {
          holders.push({ mint: b.mint, owner: b.owner });
        }
      }
    }
  }

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate timestamped filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `sgt-holders-fast-${timestamp}.json`;
  const filepath = path.join(outputDir, filename);

  // Write holders to file
  fs.writeFileSync(filepath, JSON.stringify(holders, null, 2));
  
  console.log(`Found ${holders.length} holders`);
  console.log(`Output written to: ${filepath}`);
}

// Run the script
fetchAllHoldersFast().catch(console.error); 
```