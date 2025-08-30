# Seeker Genesis Token

## Overview

The Seeker Genesis Token is a unique NFT that represents a verified owner of a Seeker device. It can only be minted once per device and is minted into the primary account in a user's Seed Vault Wallet.

## NFT Details

The Seeker Genesis Token implements Token Extensions (formerly Token-2022). 

### Transferability

The Seeker Genesis Token can only be transferred between a user's wallet accounts on a permissioned basis within the Seed Vault Wallet.
A transfer occurs when a user changes their primary account in the Seed Vault Wallet.

The **mint address** of the SGT remains the same when it is transferred.

#### Anti-Sybil Example: In-App Rewards Claim

Even with transferability, the Seeker Genesis Token is still useful as an anti-sybil measure. 

As an example, imagine an in-app rewards claim that wants to use the Seeker Genesis Token to limit the claim to once per Seeker device.

To implement this, the app should check for 3 properties:

1. The connected wallet owns a Seeker Genesis Token.
2. The user proves ownership of the wallet via [signing a message](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#dapp-integration).
3. The Seeker Genesis Token has not been previously used to claim a reward (i.e check that its **mint address** has not been seen before).

Step 3 is crucial to exclude wallets that have previously claimed the reward on another wallet (and then transferred the SGT to a new wallet).

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



## Verifying Seeker Genesis Token Ownership

### Option 1: Use the `searchAssets` API.

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

### Option 2: Use the `getTokenAccountsByOwner` API (Better performance and more efficient).

To verify a wallet owns a Seeker Genesis Token ownership, you can use the `getTokenAccountsByOwner` API.

Here's an example script using Helius RPC:

```js
import { Connection, PublicKey } from '@solana/web3.js';
import { unpackMint, getMetadataPointerState, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

async function walletHasToken(walletAddress) {
  const SGT_METADATA_AUTHORITY = 'GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4';
  const SGT_METADATA_ADDRESS = 'GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te';
  const SOLANA_RPC_MAINNET = "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY";

  try {
    const connection = new Connection(SOLANA_RPC_MAINNET);
    const owner = new PublicKey(walletAddress);
    
    // 1. Find all Token-2022 token accounts for the wallet
    const tokenAccounts = await connection.getTokenAccountsByOwner(owner, {
      programId: TOKEN_2022_PROGRAM_ID
    });
    if (tokenAccounts.value.length === 0) {
      console.log("No Token-2022 accounts found for this wallet.");
      return false;
    }
    // 2. Extract the mint addresses from each token account
    const mintPubkeys = tokenAccounts.value.map((accountInfo) => {
      // The mint public key is the first 32 bytes of the token account data
      return new PublicKey(accountInfo.account.data.slice(0, 32));
    });
    // 3. Fetch all mint account data in a single batch call for efficiency
    const mintAccountInfos = await connection.getMultipleAccountsInfo(mintPubkeys);
    // 4. Iterate through the mint accounts to find a match
    for (let i = 0; i < mintAccountInfos.length; i++) {
      const mintInfo = mintAccountInfos[i];
      if (mintInfo) {
        const mintPubkey = mintPubkeys[i];
        
        // Unpack the raw mint account data
        const mint = unpackMint(mintPubkey, mintInfo, TOKEN_2022_PROGRAM_ID);
        
        // Use the helper function to get the Metadata Pointer extension state
        const metadataPointer = getMetadataPointerState(mint);
        // Check if the extension exists and if its values match our target SGT
        if (metadataPointer &&
            metadataPointer.authority?.toBase58() === SGT_METADATA_AUTHORITY &&
            metadataPointer.metadataAddress?.toBase58() === SGT_METADATA_ADDRESS) {
          
          console.log("MATCH FOUND: Wallet holds a verified SGT.");
          return true; // We found it, exit early
        }
      }
    }
    // No verified SGT found in wallet.
    return false;
  } catch (error) {
    //Error verifying SGT ownership
    return false;
  }
}
```