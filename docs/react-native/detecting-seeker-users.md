---
displayed_sidebar: reactNativeSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

# Detecting Seeker Users

This guide outlines the two primary methods for identifying Seeker users within your React Native application. Choose the appropriate method based on your security requirements and use case.

## Overview

There are two main approaches to detect Seeker users:

1. **Platform Constants Check**: A lightweight client-side check using React Native's Platform API
2. **Seeker Genesis Token Verification**: A secure on-chain verification method

## Method 1: Platform Constants Check

The Platform Constants method checks device information using React Native's built-in [Platform API](https://reactnative.dev/docs/platform). This is a quick, lightweight check suitable for UI treatments and non-critical features.

:::warning Security Consideration
The Platform Constants API can be spoofed and should **not** be used for use cases where you need a guaranteed Seeker user.

For use cases where you need a guarantee that you are interacting with a Seeker user, see [Method 2: Seeker Genesis Token Verification](#method-2-seeker-genesis-token-verification) instead.
:::

### Checking Platform Constants

```tsx
import { Platform } from 'react-native';

console.log(JSON.stringify(Platform.constants, null, 2));
```

When running on a Seeker device, the above code outputs something like:

```json
{
  "uiMode": "normal",
  "reactNativeVersion": {
    "minor": 79,
    "prerelease": null,
    "major": 0,
    "patch": 5
  },
  "isTesting": false,
  "ServerHost": "localhost:8081",
  "Brand": "solanamobile",
  "Manufacturer": "Solana Mobile Inc.",
  "Release": "15",
  "Fingerprint": "solanamobile/seeker/seeker:15/AP3A.250103.524.A2/mp1V912:userdebug/release-keys",
  "Serial": "unknown",
  "Model": "Seeker",
  "Version": 35
}
```

To check if the user on a Seeker, you can check the `Model` constant:

```ts
const isSeekerDevice = (): boolean => {
  return Platform.constants.Model === 'Seeker';
};
```

### Use Cases

- **UI Treatments**: Show special welcome messages, themes, or layouts for Seeker users
- **Feature Flags**: Enable/disable certain features based on device type
- **Analytics**: Track usage patterns by device type
- **Marketing**: Display device-specific promotional content

### Limitations

**The main limitation is that this method is spoofable** - rooted devices or modified apps can change the Platform constants to mimic a Seeker device. 

See the next method for a guaranteed way to check for interaction with a Seeker user.


## Method 2: Seeker Genesis Token Verification

For use cases where you need a guarantee that you are interacting with a Seeker user, verify that the user's wallet contains the Seeker Genesis Token (SGT). 

The SGT is a unique NFT that is minted to a user's wallet only *once* per Seeker device. Owning an SGT represents verified ownership of a Seeker device.

Learn more about the [Seeker Genesis Token](/getting-started/seeker-genesis-token).

### Genesis Token Verification Process

The verification process has **two main steps**:

1. **SIWS to prove wallet ownership**: Use Sign-in-with-Solana to prove the user owns the wallet
2. **Check the wallet contains an SGT**: Once wallet ownership is proven, verify that the wallet contains a Seeker Genesis Token

#### Step 1: Prove Wallet Ownership with SIWS

**Client-side: Sign the SIWS Payload**

Use Mobile Wallet Adapter to request the user to sign the SIWS payload:

```tsx
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

const APP_IDENTITY = {
  name: 'Your React Native dApp',
  uri: 'https://yourdapp.com',
  icon: 'favicon.ico',
};

async function signSIWSPayload() {
  const result = await transact(async (wallet) => {
    const authorizationResult = await wallet.authorize({
      cluster: 'solana:mainnet',
      identity: APP_IDENTITY,
      sign_in_payload: {
        domain: 'yourdapp.com',
        statement: 'Sign in to verify Seeker ownership',
        uri: 'https://yourdapp.com',
      },
    });

    return {
      walletAddress: authorizationResult.accounts[0].address,
      signInResult: authorizationResult.sign_in_result,
    };
  });

  return result;
}
```

**Server-side: Verify the SIWS signature**

The `signInResult` from the MWA response needs to be verified on your backend server:

```tsx
// This happens on your backend server
import { verifySignIn } from "@solana/wallet-standard-util";

async function verifySIWS(signInPayload, signInResult): Promise<boolean> {
  const serialisedOutput = {
    account: {
      publicKey: new Uint8Array(signInResult.account.publicKey),
      ...signInResult.account,
    },
    signature: new Uint8Array(signInResult.signature),
    signedMessage: new Uint8Array(signInResult.signedMessage),
  };
  
  // Verify the signature against the original payload
  return verifySignIn(signInPayload, serialisedOutput);
}
```

For complete SIWS verification details, see the [Phantom SIWS spec](https://github.com/phantom/sign-in-with-solana).

#### Step 2: Check SGT Ownership

**Server-side: Query an RPC to verify SGT ownership**

On your backend, make an RPC query to check if the user's wallet contains a Seeker Genesis Token.

- Reference this [**example script**](/marketing/engaging-seeker-users#verifying-seeker-genesis-token-ownership) that uses the Helius `getTokenAccountsByOwnerV2` API.

#### Step 3: Combine SIWS Verification and SGT Check

On your backend server, combine the SIWS verification and SGT ownership check together to confirm the user is a verified Seeker owner:

```tsx
// On your backend server
async function verifySeekerUser(signInResult) {
    // Verify SIWS signature
    const siwsVerified = await verifySIWS(signInResult);

    // Check SGT ownership
    const hasSGT = await checkWalletForSGT(signInResult.walletAddress);

    // If both true, user is a verified owner of a Seeker device.
    return siwsVerified && hasSGT;
}
```

### Use Cases

:::warning
SGTs are transferrable between a user's wallet, so you must verify uniqueness by checking the SGT's unique mint address. 

For full details and best practices, see the [Transferability](/marketing/engaging-seeker-users#transferability) documentation.
:::

- **Gated Content**: Restrict certain features or content to verified Seeker users.
- **Rewards Programs**: Distribute exclusive rewards to Seeker owners.
- **Anti-Sybil Measures**: Prevent multiple claims or actions per device.