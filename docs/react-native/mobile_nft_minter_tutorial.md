# Mobile NFT Minter Tutorial

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial, you will learn how to build a React Native dApp that can mint NFTs from your phone photos.

<p float="left">
  <img src="/tutorial_imgs/nftminter1.png" alt="Saga Photo 3" width="33%" style={{width: '33%', padding: '1%'}} />
  <img src="/tutorial_imgs/nftminter2.gif" alt="Saga Photo 3" width="33%" style={{width: '33%', padding: '1%'}} />
  <img src="/tutorial_imgs/nftminter3.png" alt="Saga Photo 3" width="33%" style={{width: '33%', padding: '1%'}} />
</p>


## What you will learn
- Integrate the Metaplex JS in a React Native project.
- Use an MWA Identity Signer with Metaplex.
- How to read image files from the OS file system.
- How to upload image and metadata files to IPFS, through NFT.storage.
- Create and mint a Metaplex NFT on-chain.

## Prerequisites
- Complete [prerequisite setup](../getting-started/development-setup) for a ready dev environment.
- An Android device/emulator to build and launch a React Native app
- An MWA-compatible wallet installed on the same device/emulator.
- Basic understanding of MWA.

## Project Setup

### 1. Initialize Scaffold

This tutorial builds off the [dApp Scaffold template](https://github.com/solana-mobile/solana-mobile-dapp-scaffold). This template
comes setup with the essential packages like MWA and web3.js.

Initialize the scaffold with:

```shell
npx react-native init MobileNFTMinter --template @solana-mobile/solana-mobile-dapp-scaffold --npm
cd MobileNFTMinter
```

Then install the dependencies:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
rm package-lock.json
yarn install
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install
```

</TabItem>
</Tabs>

### 2. Install Metaplex JS SDK

Next step is to install the `@metaplex-foundation/js` package. This is the Metaplex JS SDK that provides
a developer friendly API to interact with onchain programs.

Carefully follow the [Metaplex installation](../react-native/metaplex_integration#installation) steps
here to make sure you install the package along with all the necessary polyfill libraries.

### 3. Launch the app

```shell
npx react-native run-android
```

At this point, your app should build, install into your device, and launch automatically. If you are seeing errors
about missing/undefined methods, double check you installed the polyfills correctly.

## Creating an MWA Identity Signer



## Reading in your photo files


## Uploading to IPFS

### Uploading the photo

### Uploading the metadata 

## Minting the NFT!
