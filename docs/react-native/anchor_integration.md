# Anchor Integration Guide

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

This guide shows how to integrate an Anchor Program into your React Native dApp. For a complete working example, see the Cause Pots sample app.

<CTAButton label="Example App Repo" to="https://github.com/solana-mobile/react-native-samples/tree/main/cause-pots" />

## What you will learn

- How to set up Anchor with required polyfills
- How to import and instantiate an Anchor Program
- How to build and execute transactions with Mobile Wallet Adapter
- How to structure your code with the service/hook pattern

## Prerequisites

- [React Native setup](../react-native/setup) and [Anchor setup](https://www.anchor-lang.com/docs/installation)
- Basic understanding of [Anchor Programs](https://book.anchor-lang.com/) and IDL.
- An existing [deployed](https://www.anchor-lang.com/docs/quickstart/local#deploy-to-devnet) Anchor Program.

## Installation

Add the required dependencies to your React Native project:

<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @coral-xyz/anchor@^0.32.1 @solana/web3.js
yarn add expo-crypto buffer
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @coral-xyz/anchor@^0.32.1 @solana/web3.js
npm install expo-crypto buffer
```

</TabItem>
</Tabs>

### Crypto Polyfills (Required)

React Native lacks `crypto.getRandomValues()` which is required for generating transaction IDs. You must set up polyfills before importing any Solana packages.

Create a `polyfill.js` file:

```javascript
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto'
import { Buffer } from 'buffer'

global.Buffer = Buffer

class Crypto {
  getRandomValues = expoCryptoGetRandomValues
}

const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto()

;(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    })
  }
})()
```

Import it as the **first line** in your entry file (`index.js`):

```javascript
import './polyfill'
import 'expo-router/entry'
```

:::warning
Solana Web3.js checks for crypto on module load. If the polyfill is imported after Solana packages, the app will crash.
:::

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
        });

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
        });

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

## Anchor Framework & IDL

This guide uses Anchor 0.32.1. In Anchor 0.30+, the program ID is embedded directly in the IDL file, so you don't need to specify it separately when creating a Program instance.

### Generating an Anchor Program IDL

If you have an Anchor project in your local workspace, build the program to generate the IDL:

```shell
anchor build
```

This generates two files:
- `target/idl/contract.json` - Runtime IDL with embedded program address
- `target/types/contract.ts` - TypeScript types (camelCase)

Copy both files to your frontend project:

```shell
cp target/idl/contract.json ../frontend/idl/contract.json
cp target/types/contract.ts ../frontend/idl/idl.ts
```

If the Anchor program is already deployed, you can fetch the IDL using the [Anchor CLI](https://book.anchor-lang.com/anchor_references/cli.html?highlight=idl#idl):

```shell
anchor idl fetch GrAkKfEpTKQuVHG2Y97Y2FF4i7y7Q5AHLK94JBy7Y5yv
```

### Why Both Files?

- **contract.json**: Runtime IDL that Anchor's Program class uses to build transactions. Includes the deployed program's address.
- **idl.ts**: TypeScript type definitions for type-safe method calls and IntelliSense

Create an `index.ts` barrel export for convenient imports:

```typescript
// idl/index.ts
export { default as IDL } from './contract.json'
export type { Contract } from './idl'
```

### Instantiate your Anchor Program

Import the IDL and create a `Program` instance. The recommended pattern separates the program service from wallet integration:

<CTAButton label="See example" to="https://github.com/solana-mobile/react-native-samples/blob/main/cause-pots/frontend/services/pot-program.ts" />

```tsx
import { Contract, IDL } from '@/idl'
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

export class MyProgramService {
  private program: Program<Contract>
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
    // Wallet not needed for building transactions
    const provider = new AnchorProvider(
      connection,
      {} as any,
      { commitment: 'confirmed' }
    )
    this.program = new Program<Contract>(IDL as Contract, provider)
  }

  // Add methods for building transactions...
}
```

:::tip
Separating transaction building from execution makes your service testable without a wallet and keeps signing logic centralized.
:::

## Building Transactions with Anchor

### Service Pattern: Build Instructions

Extend your service class with methods that build transactions:

<CTAButton label="See example" to="https://github.com/solana-mobile/react-native-samples/blob/main/cause-pots/frontend/services/pot-program.ts" />

```typescript
import { BN } from "@coral-xyz/anchor";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export class MyProgramService {
  // Build a transaction using Anchor's methods API
  async buildCreateAccountTx(params: {
    authority: PublicKey
    name: string
    amount: number
  }): Promise<Transaction> {
    // Derive PDA addresses
    const [accountPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('account'), params.authority.toBuffer()],
      this.program.programId
    )

    // Use Anchor to generate the instruction
    const instruction = await this.program.methods
      .createAccount(
        params.name,
        new BN(params.amount * LAMPORTS_PER_SOL)
      )
      .accounts({
        account: accountPDA,
        authority: params.authority,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    const tx = new Transaction().add(instruction)
    tx.feePayer = params.authority
    return tx
  }
}
```

### Hook Pattern: Execute Transactions

Create a hook that handles signing and sending:

```typescript
export function useMyProgram() {
  const { connection, account } = useMobileWallet()
  const { executeTransaction } = useTransaction()
  const programService = useMemo(
    () => new MyProgramService(connection),
    [connection]
  )

  const createAccount = async (params: { name: string; amount: number }) => {
    // 1. Build the transaction
    const tx = await programService.buildCreateAccountTx({
      authority: account.publicKey,
      ...params,
    })

    // 2. Sign and send via MWA
    const signature = await executeTransaction(tx)

    return { signature }
  }

  return { createAccount, programService }
}
```

### Using Anchor's `.rpc()` Method

Alternatively, if you've set up an Anchor Wallet (see previous section), you can use Anchor's built-in `.rpc()` method to sign and submit in one call:

```tsx
const incrementCounter = async () => {
  const signature = await counterProgram.methods
    .increment(new BN(amount))
    .accounts({
      counter: counterPDA,
    })
    .rpc();

  return signature;
};
```

This uses the `signTransaction` and `signAllTransactions` methods from the Anchor Wallet you created earlier.

## Common Issues

### "crypto.getRandomValues() not supported"

**Cause**: Missing polyfill
**Solution**: Import polyfill as the FIRST line in `index.js`

### "Invalid instruction data"

**Cause**: Parameter types don't match IDL
**Solution**: Use `BN` for large numbers:

```typescript
// ❌ Wrong
program.methods.createAccount(100)

// ✅ Correct - use BN for u64/i64
program.methods.createAccount(new BN(100 * LAMPORTS_PER_SOL))
```

### "Account does not exist"

**Cause**: PDA not initialized or wrong seeds
**Solution**: Verify seeds match your contract exactly
