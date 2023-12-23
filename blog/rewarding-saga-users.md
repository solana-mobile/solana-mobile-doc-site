---
title: Rewarding Saga Users
description: An in-depth guide recommending best practices for distributing rewards to Saga users
slug: rewarding-saga-users
authors:
  - name: Mike Sulistio
    title: Developer Relations @ Solana Mobile
    url: https://twitter.com/MikeSulistio
    image_url: https://pbs.twimg.com/profile_images/1678828535514038272/6HR0mgOd_400x400.jpg
tags:
  [
    mobile-wallet-adapter,
    Saga,
    MWA,
    Saga Genesis Token,
    NFT,
    Signing,
    Sign in with Solana,
    bonk,
    airdrop,
    claim,
  ]
hide_table_of_contents: false
---

# Rewarding Saga Users

## Introduction

In the wake of the rapid, complete buy-out of the Solana Saga, ecosystem teams have jumped on this opportunity
and are beginning to distribute rewards to Saga users through airdrops and reward claims.

While exciting, teams that are distributing rewards should remember to prioritize user safety and security.
This article will recommend the best practices that teams should follow to provide a trustworthy and secure UX when rewarding Saga users.

## Saga Genesis Token

The _Saga Genesis Token_ is a unique, non-transferable NFT that is minted by a Saga user. It is minted only once per device through the dApp Store after initial device setup.

The Genesis Token is a Soulbound NFT, meaning that it cannot be transferred out of the wallet that it was initially minted to.

Although likely, this does not mean that every Genesis Token user is interacting from a Saga device. This is because the user's wallet (more specifically, secret key) can be exported/imported from/into the device, so you should account for this in your implementation.

If you want to target Saga users, the best way is to identify and verify wallets that own a Saga Genesis NFT.

For complete details, view the full [Saga Genesis Token documentation](/getting-started/saga-genesis-token).

## Choosing a distribution method

It is important to evaluate trade-offs when choosing a distribution method for rewards and make the right choice for your
usecase.

### Airdrop rewards

With airdrops, the dApp snapshots and collects all the wallets of current owners of Saga Genesis Tokens. Then the rewards can be immediately distributed to these owners, with no additional friction from the user end.

If you are choosing to airdrop rewards, keep in mind that, as of the time this article was written, not all Saga owners have minted their Genesis Tokens yet!

### Reward Claims

With _reward claims_, the dApp implements a flow where users navigate to some platform, verify their ownership of a Saga Genesis Token, and claim the reward. This way, rewards can be received on a rolling basis.

Although there is a setup cost to implement this flow, the dApp can also use the opportunity to drive traffic to their platform, whether that is a website or even better -- their newly launched Saga mobile app!

Now we'll discuss how to to implement a rewards claim with best practices that help keep users safe.

## Verify a Saga Genesis Token holder

For certain use cases, like rewards claiming or token-gated content for Saga users, you will need to verify ownership of the Saga Genesis Token NFT. This
verification flow can happen on a webpage or a mobile app, and it is crucial to implement this in a trustworthy and secure manner.

Roughly, these are the steps to verify a valid claim by a Saga user:

1. User uses _Sign in with Solana_ to prove ownership of a wallet.
2. The Sign in output is verified on the dApp's backend server.
3. The server verifies that the user's wallet owns a Saga Genesis Token.
4. Now user-verified, the dApp can distribute rewards accordingly.

Let's dive deeper into the best practices to implement this flow.

### Sign in with Solana

You should use _Sign in with Solana_ to verify that the connecting user truly owns the wallet that contains the Saga Genesis Token. With
SIWS, the user will be prompted by their wallet to sign a message, and the response will be verified on your server.

#### Mobile web

Naturally, the majority of users will be claiming on their Saga mobile device, so you must design and thoroughly test this
flow on mobile web.

SIWS is supported by the standard Solana web libraries like `wallet-adapter-react`. Follow
this [integration guide](https://github.com/phantom/sign-in-with-solana?tab=readme-ov-file#dapp-integration) by Phantom
to understand the full implementation.

:::tip

During testing, you may run into a [navigation blocked issue](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/wallet-adapter-mobile#android-chrome-browser-issues) when using the fallback `connect` + `signMessage` flow on mobile web.

To fix this, you will
need to separate your `connect` and `signMessage` actions into two separate user actions (i.e: User click Connect button -> User click Sign Message button).

:::

#### Mobile app

If you are implementing this flow within a mobile app, you will need to manually implement the SIWS protocol using [Mobile Wallet
Adapter](/react-native/quickstart#signing-messages) (`authorize` + `signMessage`).

First class support for a `signInWithSolana` MWA method will arrive when MWA 2.0 is complete.

### Verify the Saga Genesis Token

After proving that the user owns the wallet with _SIWS_, you need to verify that the user's wallet actually contains a Saga Genesis Token. This step
also occurs on the server side.

There are different ways to do this, but the simplest is to query an RPC provider that supports the [_DAS (Digital Asset Standards)_ API](https://github.com/metaplex-foundation/digital-asset-standard-api).

For code snippet and an implementation example, view [this section of the Saga Genesis Token documentation](/getting-started/saga-genesis-token#verify-the-saga-genesis-token).

## Fetching a mint list of holders

For use cases like snapshots and airdropping, you can query for the entire list of current holders.

To fetch the entire collection list of Saga Genesis Token holders, you can use the `getAssetsByGroup` DAS API method.

For code snippets and implementation examples, view [this section of Saga Genesis Token documentation](/getting-started/saga-genesis-token#fetching-complete-mint-list-of-holders).

Alternatively, there are many [third-party/community created tools](https://docs.metaplex.com/guides/mint-lists) to generate a mint list.

## Get in touch

Amidst the hype and excitement of rewards, we believe that it is increasingly important to provide an experience that is
secure and inspires confidence for the user.

If you are a team interested in distributing rewards to Saga users, you can get in touch with the Solana Mobile team directly
through [Discord](https://discord.gg/solanamobile) to ask questions and understand best practices.
