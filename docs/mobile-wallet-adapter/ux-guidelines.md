# Mobile Wallet Adapter UX Guidelines

This guide will cover the best practices for using Mobile Wallet Adapter (MWA) in your web app.

This guide assumes:
- You are using `@solana/wallet-adapter-react`
- The user is browsing on an **Android Web environment**, where MWA is usually the only available wallet.

## Call `connect()` directly

You should explicitly handle two scenarios:

1. If MWA is already selected, you should always directly call `connect`.

2. If it is not selected, but available, `select` it as early as possible in your UI flow. 

This will also fix connection related issues with Mobile Wallet Adapter.

### Example: Connect Button

```typescript
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function ConnectButton() {
    const { connected, wallet, wallets } = useWallet();
    const { setVisible: showWalletSelectionModal } = useWalletModal();

    // MWA is only available when user is on Android Web environments (e.g Android Chrome).
    const mobileWalletAdapter = wallets.find((wallet) => wallet.adapter.name === SolanaMobileWalletAdapterWalletName)

    const handleConnectClick = () => {
        if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
            // If already selected, immediately connect.
            await wallet?.adapter.connect();
        } else if (mobileWalletAdapter) {
            // If MWA is not selected, but available, select it instead of showing modal.
            select(SolanaMobileWalletAdapterWalletName)
        } else {
            // Else, show modal as usual.
            showWalletSelectionModal(true)
        }
    }
    return <Button disabled={connected} onClick={handleConnectClick} />;
}
```

## Connect and Sign in a single user action

If your app uses MWA and requires a user to *Sign-in-with-Solana* (e.g`connect` + `signMessage`), it needs to invoke both methods from a single user action.

### Why?

If `signMessage` is invoked programmatically (e.g in a `useEffect`), Android Chrome browser will block the navigation attempt in accordance with it's [trusted event policy](https://developer.chrome.com/docs/android/intents). 

### Solution

To `connect` + `signMessage` in a single user action, you should directly call the `signIn()` method

Mobile Wallet Adapter always supports the `signIn` method which invokes a `connect` and `signMessage` all within a single method.

### Example: Sign In Button

```typescript
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function SignInButton() {
    const { connected, wallet, wallets, signIn } = useWallet();
    const { setVisible: showWalletSelectionModal } = useWalletModal();

    // MWA is only available when user is on Android Web environments (e.g Android Chrome).
    const mobileWalletAdapter = wallets.find((wallet) => wallet.adapter.name === SolanaMobileWalletAdapterWalletName)

    const handleSignInButtonClick = () => {
        if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
            // If MWA is present, immediately sign in.
            const input: SolanaSignInInput = {
                domain: window.location.host,
                statement: "Sign in to My Web App",
                uri: window.location.origin,
            }
            const output = await signIn(input);
        } else {
            // Else, show modal as usual.
            showWalletSelectionModal(true)
        }
    }
    return <Button disabled={connected} onClick={handleSignInButtonClick} />;
}
```

## Change the displayed name

Throughout your UI, use the text `Use Installed Wallet` as the displayed name for the MWA option. 

This descriptive text helps your users understand that this option will allow them to connect to an installed mobile wallet app (via MWA).

### Example: Wallet List Item Component

```typescript
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function WalletListItem({ wallet, onPress }){
    // If we are showing MWA, use a descriptive display name.
    const displayName = (wallet.adapter.name === SolanaMobileWalletAdapterWalletName) 
                        ? `Use Installed Wallet` : wallet.adapter.name
    return (
    <Button onClick={onPress}>
        {displayName}
    </Button>
    );
};
```
