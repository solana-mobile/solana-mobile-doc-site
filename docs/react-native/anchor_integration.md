# Anchor Integration Guide

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

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
Add the Anchor library to your React Native Project:

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

To create an `AnchorWallet`, use Mobile Wallet Adapter `transact` to implement the required signing functions. 

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/components/providers/CounterProgramProvider.tsx#L39" />

```tsx
import * as anchor from '@coral-xyz/anchor';
import { transact, Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {useAuthorization} from './AuthorizationProvider';

const {authorizeSession, selectedAccount} = useAuthorization();
const anchorWallet = useMemo(() => {
    if (!authorizeSession || !selectedAccount) {
        return null;
    }

    return {
        signTransaction: async (transaction: Transaction) => {
            return transact(async (wallet: Web3MobileWallet) => {
                await authorizeSession(wallet);
                const signedTransactions = await wallet.signTransactions({
                    transactions: [transaction],
                });
                return signedTransactions[0];
            });
        },
        signAllTransactions: async (transactions: Transaction[]) => {
            return transact(async (wallet: Web3MobileWallet) => {
                await authorizeSession(wallet);
                const signedTransactions = await wallet.signTransactions({
                    transactions: transactions,
                });
                return signedTransactions;
            });
        },
        get publicKey() {
            return selectedAccount.publicKey;
        },
    } as anchor.Wallet;
}, [authorizeSession, selectedAccount]);
```

## Importing an Anchor Program in Typescript

### Generating an Anchor Program IDL

If you have an Anchor project in your local workspace, build the program and generate the Typescript IDL with:

```shell
anchor build
```

If the IDL is stored on chain and you know its address, you can use the [Anchor CLI](https://book.anchor-lang.com/anchor_references/cli.html?highlight=idl#idl) to fetch it:

```shell
anchor idl fetch GrAkKfEpTKQuVHG2Y97Y2FF4i7y7Q5AHLK94JBy7Y5yv
```

### Instantiate your Anchor Program

Once your IDL has been generated, you can import it and create an instance of your `Program` in Typescript. 

- Import your generated IDL file, in this case from `/target/types/basic_counter.ts`
- Use the `anchorWallet` from the previous step to create an `AnchorProvider`.

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/components/providers/CounterProgramProvider.tsx#L96" />

```tsx
import {BasicCounter as BasicCounterProgram} from '../../basic-counter/target/types/basic_counter';
import {AnchorProvider, Program} from '@coral-xyz/anchor';

// Address of the devnet-deployed Counter Program
const counterProgramId = useMemo(() => {
    return new PublicKey('5tH6v5gyhxnEjyVDQFjuPrH9SzJ3Rvj1Q4zKphnZsN74');
}, []);

// Create an AnchorProvider with the anchorWallet.
const provider = useMemo(() => {
    if (!anchorWallet) {
        return null;
    }
    return new AnchorProvider(connection, anchorWallet, {
        preflightCommitment: 'confirmed',
        commitment: 'processed',
    });
}, [anchorWallet, connection]);

// Create an instance of your Program.
const basicCounterProgram = useMemo(() => {
    if (!provider) {
        return null;
    }

    return new Program<BasicCounterProgram>(
        idl as BasicCounterProgram,
        counterProgramId,
        provider,
    );
}, [counterProgramId, provider]);
```

## Signed Transactions from your Anchor Program

With an instantiated `Program`, you can now:
- Generate serialized program instructions.
- Construct a `Transaction` with the generated instructions.
- Sign the `Transaction` with Mobile Wallet Adapter.

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/components/SignIncrementTxButton.tsx" />

```tsx
import {BasicCounter} from '../basic-counter/target/types/basic_counter';
import {useAuthorization} from './providers/AuthorizationProvider';
import {useCounterProgram} from './providers/CounterProgramProvider';

const {counterProgram, counterAccountPubkey} = useCounterProgram();
const signIncrementTransaction = useCallback(
    async (program: Program<BasicCounter>) => {
        return await transact(async (wallet: Web3MobileWallet) => {
            const [authorizationResult, latestBlockhash] = await Promise.all([
                authorizeSession(wallet),
                connection.getLatestBlockhash(),
            ]);

            // Generate the increment ix from the Anchor program
            const incrementInstruction = await program.methods
                .increment()
                .accounts({
                    counter: counterAccountPubkey,
                    authority: selectedAccount?.publicKey,
                })
                .instruction();

            // Build a transaction containing the instruction
            const incrementTransaction = new Transaction({
                ...latestBlockhash,
                feePayer: authorizationResult.publicKey,
            }).add(incrementInstruction);

            // Request a signed transaction from user's wallet
            const signedTransactions = await wallet.signTransactions({
                transactions: [incrementTransaction],
            });

            return signedTransactions[0];
        });
    },
    [
        authorizeSession,
        connection,
        counterAccountPubkey,
        selectedAccount?.publicKey,
    ],
);

const signedTransaction = await signIncrementTransaction(counterProgram)
```

## Submit Transactions from your Anchor Program

To submit a `Transaction` to RPC, you can:
- Use the Anchor provided `rpc()` function to sign and submit a `Transaction`.
- Create a signed transaction (like above) and manually submit to an RPC.

### Using the Anchor rpc() function:

<CTAButton label="See example" to="https://github.com/solana-mobile/tutorial-apps/blob/main/AnchorCounterDapp/components/IncrementCounterButton.tsx#L23" />

```tsx
const incrementCounter = useCallback(
    async (program: Program<BasicCounter>) => {
        // Submit an increment method Transaction to RPC.
        const signature = await program.methods
        .increment()
        .accounts({
            counter: counterAccountPubkey,
            authority: selectedAccount?.publicKey,
        })
        .rpc();

        return signature;
    },
    [counterAccountPubkey, selectedAccount?.publicKey],
);
const signature = await incrementCounter(counterProgram)
```

### Manually submitting to an RPC:

```tsx
// Construct a signed Transaction like from the previous section, then submit to RPC
// using web3.js `connection` client.
const signedTransaction = await signIncrementTransaction(counterProgram)
connection.sendTransaction(signedTransaction)
```















