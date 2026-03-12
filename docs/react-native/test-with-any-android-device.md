import SideBySideLayout from '@site/src/layouts/SideBySideLayout';
import VideoCarousel from '@site/src/components/VideoCarousel';

# Test with any Android device

Seeker is an Android phone at its core. For 99% of development and testing, you can use:

- Any Android device
- Android emulator from Android Studio
- Any standard Android API

Your app will behave the same way on Seeker as it does on any other Android device. 

<SideBySideLayout
  rightContent={
    <VideoCarousel 
      videos={[
        {
          src: "/videos/mock_mwa_wallet.mp4",
          label: "Mock MWA Wallet"
        },
      ]}
      autoPlay={true}
      muted={true}
    />
  }
  gap="4rem"
  verticalAlignment="center"
>

## Mock MWA Wallet

If your app uses Mobile Wallet Adapter, we recommend testing against the [Mock MWA Wallet](https://github.com/solana-mobile/mock-mwa-wallet) - a testing wallet that simulates Seed Vault Wallet functionality.

Mock MWA Wallet features:
- Mobile Wallet Adapter support for `authorize`, `signIn`, `signAndSendTransactions`, and `signMessage`.
- Apple pay-like transaction signing (Bottom sheet approval, no app switch)
- Biometric authentication
- Configurable Ed25519 private key importing

For installation, view the [**Github repository**](https://github.com/solana-mobile/mock-mwa-wallet).

</ SideBySideLayout>