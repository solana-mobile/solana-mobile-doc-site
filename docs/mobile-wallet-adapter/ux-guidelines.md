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
