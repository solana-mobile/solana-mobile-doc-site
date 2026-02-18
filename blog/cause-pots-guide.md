---
title: "Building Cause Pots"
description: A concise guide to how Cause Pots works, a decentralized group savings demo app built with Anchor, React Native, and Mobile Wallet Adapter. Full repository [here](https://github.com/solana-mobile/react-native-samples/tree/main/cause-pots).
slug: cause-pots-guide
authors:
  - name: Anmol Arora
    url: https://twitter.com/0xanmol
    image_url: /blog_profile_pics/0xanmol.jpg
tags:
  [
    anchor,
    mobile-wallet-adapter,
    react-native,
    PDAs,
  ]
hide_table_of_contents: false
---

# Building Cause Pots: A Group Savings dApp on Solana Mobile

A concise guide to how Cause Pots works, a decentralized group savings app built with Anchor, React Native, and Mobile Wallet Adapter.

<!-- truncate -->

## What is Cause Pots?

Cause Pots is a collaborative savings pots on Solana. Friends pool funds into a shared pot that's **time-locked** (can't withdraw early) and **multi-sig protected** (M-of-N contributors must approve before funds are released).

**Key features:**
- **Time-locked pots**: funds locked on-chain until a set date
- **Multi-signature release**: configurable threshold of contributors must sign before withdrawal
- **SOL & USDC support**: contribute in either token
- **Friend management**: add friends via public key or `.skr` domain
- **Full audit trail**: every action viewable on Solana Explorer

**Example scenario:** Three friends create a "Vacation Fund" pot targeting 5 SOL, locked for 180 days. 2 out of 3 must sign to release. Each contributes over time, and once the lock expires and the required number of people sign, the funds go to the chosen recipient (the pot creator in our case for simplicity).

---

## Frontend/Backend Architecture

Cause Pots uses a three-layer architecture: a React Native frontend, an Express/SQLite backend, and an Anchor smart contract on Solana.

![Cause Pots Architecture](/blog_imgs/cause-pots-architecture.svg)

**What lives where:**

| On-Chain (Blockchain) | Off-Chain (Backend) |
|---|---|
| Fund custody (vault PDAs hold SOL) | Pot metadata (names, descriptions) |
| Time-lock enforcement | User profiles |
| Multi-sig signatures & threshold | Activity feed / history |
| Contributor validation | Fast UI queries |

The idea behind this split is simple: the blockchain is the source of truth for anything involving money and rules, while the backend handles everything the UI needs to be fast and responsive. Querying on-chain data for every screen load would be slow and expensive, so the backend mirrors metadata and serves it through a REST API.

### Auth Flow: MWA + Sign In With Solana

Authentication combines Mobile Wallet Adapter with a backend user registry. The flow works in four steps:

1. **User taps "Connect"** and MWA does its magic.
2. **User approves** the connection in the wallet, which returns their public key back to the app.
3. **App sends the public key** to the backend via `POST /api/users/auth`.
4. **Backend creates or retrieves the user** record and the app is now authenticated.

The `AuthProvider` component ties this together. It listens for a wallet connection and automatically triggers backend authentication:

```typescript
// components/auth/auth-provider.tsx
export function AuthProvider({ children }: PropsWithChildren) {
  const { account, connect, disconnect } = useMobileWallet()
  const { user, authenticate, logout } = useWalletAuth()

  useEffect(() => {
    if (account?.publicKey && !hasAuthenticated && !user) {
      authenticate({
        pubkey: account.publicKey.toString(),
        address: account.publicKey.toString(),
      })
      setHasAuthenticated(true)
    }
  }, [account, hasAuthenticated, user])

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!account && !!user, ... }}>
      {children}
    </AuthContext.Provider>
  )
}
```

The key thing to notice here is that the `useEffect` fires when `account` changes (i.e., when the wallet connects), and the `hasAuthenticated` flag prevents it from running more than once per session. This avoids duplicate backend calls if the component re-renders.

At the root level, the MWA provider wraps the entire app to make wallet state available everywhere:

```typescript
// components/app-providers.tsx
import { MobileWalletProvider } from '@wallet-ui/react-native-web3js'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <MobileWalletProvider chain="devnet" endpoint={DEVNET_ENDPOINT}>
      <AuthProvider>{children}</AuthProvider>
    </MobileWalletProvider>
  )
}
```

We use `@wallet-ui/react-native-web3js` here instead of raw MWA protocol calls. This wrapper handles session token management and provides a cleaner `useMobileWallet()` hook that gives you `connection`, `account`, `signAndSendTransaction`, and other essentials.

---

## Anchor On-Chain

The smart contract is built with Anchor 0.32 and deployed to devnet. It has five instructions and two account types.

### Instructions

| Instruction | What it does |
|---|---|
| `create_pot` | Creates a pot PDA + vault PDA, sets time-lock and multi-sig config |
| `add_contributor` | Adds a contributor PDA linked to a pot |
| `contribute` | Transfers SOL from contributor to vault PDA |
| `sign_release` | Records a contributor's signature for release approval |
| `release_funds` | Transfers vault funds to recipient (requires time-lock expired + enough signatures) |

### Account Structures

The program uses two account types. `PotAccount` holds all the state for a savings pot, and `ContributorAccount` tracks each individual contributor's participation:

```rust
#[account]
pub struct PotAccount {
    pub authority: Pubkey,           // Creator
    pub vault: Pubkey,               // Vault PDA holding SOL
    pub name: String,                // max 32 chars
    pub description: String,         // max 200 chars
    pub target_amount: u64,
    pub total_contributed: u64,
    pub unlock_timestamp: i64,
    pub signers_required: u8,
    pub signatures: Vec<Pubkey>,     // Who has signed (max 10)
    pub contributors: Vec<Pubkey>,   // Allowed contributors (max 20)
    pub is_released: bool,
    pub recipient: Option<Pubkey>,
    pub bump: u8,
    pub vault_bump: u8,
}

#[account]
pub struct ContributorAccount {
    pub pot: Pubkey,
    pub contributor: Pubkey,
    pub total_contributed: u64,
    pub contribution_count: u32,
    pub bump: u8,
}
```

The `signatures` vector is worth calling out. It accumulates public keys as contributors sign for release, and the program checks its length against `signers_required` before allowing a withdrawal.

For production apps, consider using [Squads Multisig](https://squads.so/) instead of rolling your own multi-sig logic. We implemented it from scratch here to showcase more Anchor instruction calls from React Native.

### PDA Design

Every account is a Program Derived Address (PDA), which means it's derived deterministically from a set of seeds. No private keys are needed, and you can always recalculate the address from the same inputs:

| Account | Seeds | Purpose |
|---|---|---|
| Pot | `["pot", authority, name]` | One pot per creator per name |
| Vault | `["vault", pot]` | One vault per pot (holds the SOL) |
| Contributor | `["contributor", pot, contributor]` | One record per contributor per pot |

This design means that if you know the creator's public key and the pot name, you can always find the pot's on-chain address without needing to store it separately.

### Key Constraints

**Time-lock** uses blockchain time (`Clock::get()`) instead of client clocks, which prevents users from manipulating their device time to bypass the lock:

```rust
pub fn create_pot(ctx: Context<CreatePot>, unlock_days: i64, ...) -> Result<()> {
    let clock = Clock::get()?;
    pot.unlock_timestamp = clock.unix_timestamp + (unlock_days * 86400);
    Ok(())
}

pub fn release_funds(ctx: Context<ReleaseFunds>, recipient: Pubkey) -> Result<()> {
    let clock = Clock::get()?;
    require!(
        clock.unix_timestamp >= pot.unlock_timestamp,
        ErrorCode::TimeLockNotExpired
    );
    // ...
}
```

**Multi-signature** prevents double-signing and enforces the approval threshold. A contributor can only sign once, and the `release_funds` instruction won't execute until the required number of unique signatures have been collected:

```rust
pub fn sign_release(ctx: Context<SignRelease>) -> Result<()> {
    let pot = &mut ctx.accounts.pot;
    let signer = ctx.accounts.signer.key();

    require!(pot.contributors.contains(&signer), ErrorCode::NotAContributor);
    require!(!pot.signatures.contains(&signer), ErrorCode::AlreadySigned);

    pot.signatures.push(signer);
    Ok(())
}

pub fn release_funds(ctx: Context<ReleaseFunds>, recipient: Pubkey) -> Result<()> {
    require!(
        pot.signatures.len() >= pot.signers_required as usize,
        ErrorCode::InsufficientSignatures
    );
    // Transfer funds from vault to recipient
}
```

---

## Anchor on Client (React Native)

### IDL Setup

Anchor generates two files when you build the contract: a JSON IDL (used at runtime to construct transactions) and a TypeScript type file (used for type-safe method calls). Both need to be copied into the frontend:

```bash
cd contract
anchor build

# Copy runtime IDL + TypeScript types
cp target/idl/contract.json ../frontend/idl/contract.json
cp target/types/contract.ts ../frontend/idl/idl.ts
```

Then you initialize the Anchor `Program` instance, which gives you typed methods matching each instruction in the contract:

```typescript
import { Contract, IDL } from '@/idl'

const provider = new AnchorProvider(connection, {} as any, { commitment: 'confirmed' })
const program = new Program<Contract>(IDL as Contract, provider)
```

The `{} as any` for the wallet parameter is intentional. Since the service only *builds* transactions (it doesn't sign them), we don't need a real wallet here. Signing happens later through MWA.

### PotProgram Service: Building Transactions

The core architectural pattern in the frontend is separating transaction **building** from **execution**. The `PotProgramService` class handles building only. It derives PDA addresses and constructs unsigned transactions:

```typescript
// services/pot-program.ts
export class PotProgramService {
  private program: Program<Contract>

  // PDA derivation
  getPotPDA(authority: PublicKey, potName: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('pot'), authority.toBuffer(), Buffer.from(potName)],
      this.program.programId
    )
  }

  getVaultPDA(pot: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), pot.toBuffer()],
      this.program.programId
    )
  }

  // Build a create pot transaction
  async buildCreatePotTx(params: {
    authority: PublicKey
    name: string
    description: string
    targetAmount: number
    unlockDays: number
    signersRequired: number
  }): Promise<Transaction> {
    const [potPDA] = this.getPotPDA(params.authority, params.name)
    const [vaultPDA] = this.getVaultPDA(potPDA)

    const instruction = await this.program.methods
      .createPot(
        params.name,
        params.description,
        new BN(params.targetAmount * LAMPORTS_PER_SOL),
        new BN(params.unlockDays),
        params.signersRequired
      )
      .accounts({
        pot: potPDA,
        potVault: vaultPDA,
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

Notice how `this.program.methods.createPot(...)` uses camelCase even though the Rust contract uses snake_case. Anchor automatically converts between the two when generating the IDL.

### Hook Layer: Connecting to MWA

The hook layer sits between the service and the UI. It takes the unsigned transaction from the service, sends it through MWA for signing, and returns the result:

```typescript
// hooks/use-pot-program.ts
export function usePotProgram() {
  const { connection, account } = useMobileWallet()
  const { executeTransaction } = useTransaction()
  const programService = useMemo(
    () => new PotProgramService(connection), [connection]
  )

  const createPot = async (params) => {
    // 1. Build transaction
    const tx = await programService.buildCreatePotTx({
      authority: account.publicKey,
      ...params,
    })

    // 2. Sign and send via MWA
    const signature = await executeTransaction(tx)

    // 3. Return on-chain references
    const [potPDA] = programService.getPotPDA(account.publicKey, params.name)
    return { signature, potPubkey: potPDA.toBase58() }
  }

  return { createPot, programService }
}
```

### Transaction Execution: The useTransaction Hook

This hook handles the mechanics of getting a transaction onto the blockchain. It fetches a fresh blockhash, converts the transaction to the versioned format that MWA expects, signs it through the wallet, and waits for confirmation:

```typescript
// hooks/use-transaction.ts
export function useTransaction() {
  const { connection, signAndSendTransaction } = useMobileWallet()

  const executeTransaction = async (transaction: Transaction): Promise<string> => {
    // Fresh blockhash (expires after ~60-75 seconds)
    const { context: { slot: minContextSlot }, value: latestBlockhash } =
      await connection.getLatestBlockhashAndContext()

    // Convert to VersionedTransaction (required by MWA)
    const messageV0 = new TransactionMessage({
      payerKey: transaction.feePayer!,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: transaction.instructions,
    }).compileToLegacyMessage()

    const versionedTransaction = new VersionedTransaction(messageV0)

    // Sign via wallet and send to network
    const signature = await signAndSendTransaction(versionedTransaction, minContextSlot)

    // Wait for confirmation
    await connection.confirmTransaction(
      { signature, ...latestBlockhash }, 'confirmed'
    )

    return signature
  }

  return { executeTransaction }
}
```

We use `'confirmed'` commitment level here, which settles in less than 2 seconds. This is a good balance between speed and reliability for mobile. The `'finalized'` level takes ~10-12 seconds, which is too slow for a good mobile UX.

### The Full Flow

When a user taps "Create Pot," here is what happens end to end:

1. **UI layer**: User fills the form and taps create
2. **Hook layer** (`usePotProgram.createPot`): Calls the service to build an unsigned transaction
3. **Service layer** (`PotProgramService.buildCreatePotTx`): Derives PDAs, constructs the Anchor instruction, returns a `Transaction` object
4. **Execution hook** (`useTransaction.executeTransaction`): Fetches blockhash, converts to `VersionedTransaction`, sends to MWA for signing, submits to Solana, waits for confirmation
5. **Backend sync**: App sends the pot metadata + transaction signature to `POST /api/pots`
6. **UI update**: Zustand store is updated and the screen refreshes with the new pot

---

## Common Issues

Here are some of the issues you are likely to run into when building with this stack, and how Cause Pots handles them.

### Crypto polyfills in React Native

React Native does not ship with `crypto.getRandomValues()`, which Solana's web3.js library needs for generating transaction IDs and blockhashes. Without the polyfill, you will see `crypto.getRandomValues() not supported` on app launch.

The fix is to polyfill it using `expo-crypto` and make sure it loads **before** any Solana imports:

```javascript
// polyfill.js (must be imported first in index.js)
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

```javascript
// index.js - polyfill MUST be the first import
import './polyfill'
import 'expo-router/entry'
```

If the polyfill loads after web3.js, the module will fail at import time before your polyfill even runs. Import order matters here.

### Expo Go vs Development Builds

MWA requires native Android bridge code that is not available in the Expo Go sandbox. You must use a development build:

```bash
npx expo prebuild --clean
npx expo run:android
```

If you see wallet connection timeouts or MWA-related crashes, this is almost always the cause.

### Transaction Expiration

Solana blockhashes expire after about 150 blocks (~60-75 seconds). If your user takes too long to approve in the wallet, or if there is network latency, the transaction will fail with a "blockhash not found" error.

The solution is to always fetch a fresh blockhash right before signing, which is why the `useTransaction` hook calls `getLatestBlockhashAndContext()` immediately before `signAndSendTransaction()`. Never cache or reuse blockhashes.

### IDL Sync Issues

If you modify the smart contract and rebuild without copying the new IDL files to the frontend, you will get "Unknown instruction" or "Invalid instruction data" errors. The fix:

```bash
cd contract
anchor build
cp target/idl/contract.json ../frontend/idl/contract.json
cp target/types/contract.ts ../frontend/idl/idl.ts
```

Both files need to be updated. The JSON file is the runtime IDL, and the TypeScript file provides type definitions. If only one is updated, you can get type mismatches that are hard to debug.

### PDA "Already in use"

PDAs are deterministic, meaning the same seeds always produce the same address. If you try to create a pot with the same name from the same wallet twice, Anchor will throw an "already in use" error because that PDA was already initialized. Use a different name, or add a unique identifier to the seeds.

---

## Wrapping Up

That's about it for this breakdown. We kept it concise and focused on the key pieces: how auth works with MWA, what the on-chain program looks like, and how the React Native app talks to it through Anchor's IDL.

If you want to dive deeper into the implementation details, code walkthroughs, and best practices, check out the [TECHNICAL-GUIDE.md](https://github.com/solana-mobile/react-native-samples/tree/main/cause-pots/frontend/TECHNICAL-GUIDE.md) in the repo.

