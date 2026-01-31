# Anchor Integration Guide

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

:::caution Content may be out of date
Some of the content in this guide may be outdated. For an updated example of Anchor integration with an Expo app, see our [Cause Pots sample app](https://github.com/solana-mobile/react-native-samples/blob/main/cause-pots/frontend/services/pot-program.ts).
:::

This guide will show you how to integrate an Anchor Program into your React Native dApp, using the [Anchor Counter dApp](https://github.com/solana-mobile/tutorial-apps/tree/main/AnchorCounterDapp) as reference.

<CTAButton label="Example App Repo" to="https://github.com/solana-mobile/tutorial-apps/tree/main/AnchorCounterDapp" />

## What you will learn

- How to import an Anchor Program into a React Native project
- How to create an Anchor Wallet and Provider with Mobile Wallet Adapter
- How to sign and submit transactions with an Anchor Program IDL
- How to generate instructions with an Anchor Program IDL

## Prerequisites

- [React Native setup](../react-native/setup) and [Anchor setup](https://book.anchor-lang.com/getting_started/installation.html)
- Basic understanding of [Anchor Programs](https://book.anchor-lang.com/) and IDL.
- An existing [deployed](https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html#deployment) Anchor Program.

## Installation

Add the Anchor library to your React Native project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @coral-xyz/anchor
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @coral-xyz/anchor
```

</TabItem>
</Tabs>

## Create an Anchor Wallet with Mobile Wallet Adapter

:::tip
The Anchor Counter Program example app shows how to create an Anchor wallet that is integrated
with a more complex state management framework.

<CTAButton label="View sample" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/src/utils/useAnchorWallet.tsx#L23" />

<div />

:::

To create an `AnchorWallet`, use Mobile Wallet Adapter `transact` to implement the required signing functions.

A simple implementation:

```tsx
import * as anchor from "@coral-xyz/anchor";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

const anchorWallet = useMemo(() => {
  return {
    signTransaction: async (transaction: Transaction) => {
      return transact(async (wallet: Web3MobileWallet) => {
        const authorizationResult = await wallet.authorize({
              cluster: RPC_ENDPOINT,
              identity: APP_IDENTITY,
        }));

        const signedTransactions = await wallet.signTransactions({
          transactions: [transaction],
        });
        return signedTransactions[0];
      });
    },
    signAllTransactions: async (transactions: Transaction[]) => {
      return transact(async (wallet: Web3MobileWallet) => {
        const authorizationResult = await wallet.authorize({
              cluster: RPC_ENDPOINT,
              identity: APP_IDENTITY,
        }));

        const signedTransactions = await wallet.signTransactions({
          transactions: transactions,
        });
        return signedTransactions;
      });
    },
    get publicKey() {
      return userPubKey;
    },
  } as anchor.Wallet;
}, []);
```

## Importing an Anchor Program in Typescript

### Generating an Anchor Program IDL

If you have an Anchor project in your local workspace, build the program and generate the Typescript IDL with:

```shell
anchor build
```

If the Anchor program is already deployed and you know its address, you can use the [Anchor CLI](https://book.anchor-lang.com/anchor_references/cli.html?highlight=idl#idl) to fetch it:

```shell
anchor idl fetch GrAkKfEpTKQuVHG2Y97Y2FF4i7y7Q5AHLK94JBy7Y5yv
```

### Instantiate your Anchor Program

Once your IDL has been generated, you can import it and create an instance of your `Program` in Typescript.

- Import your generated IDL file, in this case from `/target/types/basic_counter.ts`
- Use the `anchorWallet` from the previous step to create an `AnchorProvider`.

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/src/components/counter/counter-data-access.tsx#L15" />

```tsx
import { BasicCounter as BasicCounterProgram } from "../../basic-counter/target/types/basic_counter";
import { AnchorProvider, Program } from "@coral-xyz/anchor";

const COUNTER_PROGRAM_ID = "ADraQ2ENAbVoVZhvH5SPxWPsF2hH5YmFcgx61TafHuwu";

// Address of the devnet-deployed Counter Program
const counterProgramId = useMemo(() => {
  return new PublicKey(COUNTER_PROGRAM_ID);
}, []);

// Create an AnchorProvider with the anchorWallet.
const provider = useMemo(() => {
  if (!anchorWallet) {
    return null;
  }
  return new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: "confirmed",
    commitment: "processed",
  });
}, [anchorWallet, connection]);

// Create an instance of your Program.
const counterProgram = useMemo(() => {
  if (!provider) {
    return null;
  }

  return new Program<BasicCounterProgram>(
    idl as BasicCounterProgram,
    counterProgramId,
    provider
  );
}, [counterProgramId, provider]);
```

## Sign transactions manually with Mobile Wallet Adapter

With an instantiated `Program`, you can:

- Generate serialized program instructions.
- Construct a `Transaction` with the generated instructions.
- Manually sign the `Transaction` with Mobile Wallet Adapter.

In the following example, we generate an `incrementInstruction` from the program then sign it within a Mobile Wallet Adapter
session.

```tsx
const {counterProgram, counterPDA} = useCounterProgram();

const signIncrementTransaction = async () => {
  return await transact(async (wallet: Web3MobileWallet) => {
    const authorizationResult = wallet.authorize({
      cluster: RPC_ENDPOINT,
      identity: APP_IDENTITY,
    }));

    const latestBlockhash = await connection.getLatestBlockhash();

    // Generate the increment ix from the Anchor program
    const incrementInstruction = await counterProgram.methods
        .increment(new anchor.BN(amount))
        .accounts({
          counter: counterPDA,
        })
        .instruction();

    // Build a transaction containing the instruction
    const incrementTransaction = new Transaction({
      ...latestBlockhash,
      feePayer: authorizationResult.publicKey,
    }).add(incrementInstruction);

    // Sign a transaction and receive
    const signedTransactions = await wallet.signTransactions({
      transactions: [incrementTransaction],
    });

    return signedTransactions[0];
  });
}
```

This approach is flexible and allows you to fully utilize the Mobile Wallet Adapter session.

## Sign transactions using a Mobile Wallet Adapter signer

With an instantiated `Program`, you can also use the Anchor provided `rpc()` function to sign and submit an Anchor transaction to an RPC.

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/src/components/counter/counter-data-access.tsx#L89" />

```tsx
const { counterProgram, counterPDA } = useCounterProgram();

const incrementCounter = async () => {
  // Submit an increment transaction to the RPC endpoint
  const signature = await counterProgram.methods
    .increment(new anchor.BN(amount))
    .accounts({
      counter: counterPDA,
    })
    .rpc();

  return signature;
};
```

Calling the `rpc()` will generate and sign the transaction using the interface methods (`signTransaction`, `signAllTransactions`) of the Anchor Wallet that the program was instantiated with.
