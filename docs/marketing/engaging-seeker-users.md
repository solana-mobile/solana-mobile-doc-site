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
- **Group Address**: `GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te`

#### View on an Explorer
- An individual [Seeker Genesis Token](https://explorer.solana.com/address/5mXbkqKz883aufhAsx3p5Z1NcvD2ppZbdTTznM6oUKLj/token-extensions) and its extensions
- Seeker Genesis Token [Metadata Account](https://explorer.solana.com/address/GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te/)


## Verifying Seeker Genesis Token Ownership

To verify a wallet owns a Seeker Genesis Token, you can use the [`getTokenAccountsByOwnerV2` API call](https://www.helius.dev/docs/api-reference/rpc/http/gettokenaccountsbyownerv2) provided by Helius.

Here's an example script:

```js
const { Connection, PublicKey } = require('@solana/web3.js');
const { unpackMint, getMetadataPointerState, getTokenGroupMemberState, TOKEN_2022_PROGRAM_ID } = require('@solana/spl-token');

async function checkWalletForSGT(walletAddress) {
  const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

  const SGT_MINT_AUTHORITY = 'GT2zuHVaZQYZSyQMgJPLzvkmyztfyXg2NJunqFp4p3A4';

  // The metadata mint and group mint address are intentionally the same.
  const SGT_METADATA_ADDRESS = 'GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te';
  const SGT_GROUP_MINT_ADDRESS = 'GT22s89nU4iWFkNXj1Bw6uYhJJWDRPpShHt4Bk8f99Te';

  try {
    const connection = new Connection(HELIUS_RPC_URL);
    
    // Use getTokenAccountsByOwnerV2 with pagination
    let allTokenAccounts = [];
    let paginationKey = null;
    let pageCount = 0;

    console.log(`Starting paginated fetch for wallet: ${walletAddress}`);

    do {
      pageCount++;
      console.log(`Fetching page ${pageCount}...`);

      const requestPayload = {
        jsonrpc: '2.0',
        id: `page-${pageCount}`,
        method: 'getTokenAccountsByOwnerV2',
        params: [
          walletAddress,
          { "programId": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb" }, // Token-2022 program
          {
            encoding: 'jsonParsed', 
            limit: 1000, // Maximum accounts per request
            ...(paginationKey && { paginationKey })
          }
        ]
      };

      const response = await fetch(HELIUS_RPC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`RPC error: ${data.error.message}`);
      }

      const pageResults = data.result?.value.accounts || [];
      console.log(`Page ${pageCount}: Found ${pageResults.length} token accounts`);
      
      if (pageResults.length > 0) {
        allTokenAccounts.push(...pageResults);
      }
      paginationKey = data.result?.paginationKey;
      
      // Log pagination info
      if (data.result.totalResults) {
        console.log(`Total results available: ${data.result.totalResults}`);
      }
      
    } while (paginationKey); // Continue until no more pages

    console.log(`\nCompleted pagination: ${pageCount} pages, ${allTokenAccounts.length} total token accounts`);

    if (allTokenAccounts.length === 0) {
      console.log("No Token-2022 accounts found for this wallet.");
      return false;
    }

    // Extract mint addresses from token accounts 
    const mintPubkeys = allTokenAccounts.map((accountInfo) => {
      return new PublicKey(accountInfo.account.data.parsed.info.mint);
    });

    console.log(`Extracted ${mintPubkeys.length} mint addresses`);

    // Fetch all mint account data in batches of 100 to avoid RPC limits
    const BATCH_SIZE = 100; 
    const mintAccountInfos = [];

    for (let i = 0; i < mintPubkeys.length; i += BATCH_SIZE) {
      const batch = mintPubkeys.slice(i, i + BATCH_SIZE);
      console.log(`Fetching mint info batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(mintPubkeys.length / BATCH_SIZE)}`);
      
      const batchResults = await connection.getMultipleAccountsInfo(batch);
      mintAccountInfos.push(...batchResults);
    }

    // Check each mint for SGT verification
    console.log(`Checking ${mintAccountInfos.length} mints for SGT verification...`);
    
    for (let i = 0; i < mintAccountInfos.length; i++) {
      const mintInfo = mintAccountInfos[i];
      if (mintInfo) {
        const mintPubkey = mintPubkeys[i];
        
        try {
          // Unpack the raw mint account data
          const mint = unpackMint(mintPubkey, mintInfo, TOKEN_2022_PROGRAM_ID);
          const mintAuthority = mint.mintAuthority?.toBase58();

          const hasCorrectMintAuthority = mintAuthority === SGT_MINT_AUTHORITY;

          // Check for correct SGT Metadata
          const metadataPointer = getMetadataPointerState(mint);
          const hasCorrectMetadata = metadataPointer &&
              metadataPointer.authority?.toBase58() === SGT_MINT_AUTHORITY &&
              metadataPointer.metadataAddress?.toBase58() === SGT_METADATA_ADDRESS;

          // Check for correct SGT Group Member
          const tokenGroupMemberState = getTokenGroupMemberState(mint);
          const hasCorrectGroupMember = tokenGroupMemberState &&
              tokenGroupMemberState.group?.toBase58() === SGT_GROUP_MINT_ADDRESS;

          // If all extensions match and mint authority is correct, then it is an SGT
          if (hasCorrectMintAuthority && hasCorrectMetadata && hasCorrectGroupMember) {
            console.log(`\nVERIFIED SGT FOUND: Wallet holds a verified SGT (${mint.address.toBase58()}).`);
            return true; 
          }
        } catch (mintError) {
          // Skip this mint if we can't unpack it
          console.log(`Warning: Could not unpack mint ${mintPubkey.toBase58()}: ${mintError.message}`);
          continue;
        }
      }
    }

    // No verified SGT found in wallet
    console.log("\nNo verified SGT found in wallet.");
    return false;

  } catch (error) {
    console.error("Error verifying SGT ownership:", error.message);
    return false;
  }
}
```