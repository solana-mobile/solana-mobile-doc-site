---
hide_table_of_contents: true
---

# MWA for Mobile Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoCarousel from '@site/src/components/VideoCarousel';
import SideBySideLayout from '@site/src/layouts/SideBySideLayout';
import { SDKSelectionContainer, SDKSelectionButton } from '@site/src/components/SDKSelectionContainer';
import { Smartphone, Code, FileCode, Palette, Globe } from 'lucide-react';

<SideBySideLayout
  rightContent={
    <VideoCarousel 
      videos={[
        {
          src: "/videos/phantom_mwa.mp4",
          label: "Phantom"
        },
        {
          src: "/videos/phantom_mwa.mp4",
          label: "Solflare"
        },
        {
          src: "/videos/phantom_mwa.mp4",
          label: "Seed Vault Wallet"
        },
      ]}
      autoPlay={true}
      muted={true}
    />
  }
  gap="4rem"
  verticalAlignment="center"
>

## Overview

Solana Mobile maintains an open-source **Android** SDK for Mobile Wallet Adapter that enables mobile apps to connect to wallet apps on the same device.

  <SDKSelectionContainer title="Developer Guides" icon={<Smartphone size={16} />}>
    <SDKSelectionButton 
      title="React Native" 
      icon={<Code size={20} />}
      link="/docs/sdks/react-native" 
    />
    <SDKSelectionButton 
      title="Kotlin" 
      icon={<FileCode size={20} />}
      link="/docs/sdks/kotlin" 
    />
    <SDKSelectionButton 
      title="Flutter" 
      icon={<Palette size={20} />}
      link="/docs/sdks/flutter" 
    />
    <SDKSelectionButton 
      title="Mobile Web" 
      icon={<Globe size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
  </SDKSelectionContainer>


:::note
These SDKs are only supported on Android because MWA is incompatible with iOS. View this [blog post](/blog/ios-wallet-signing) to learn why.
:::

### SDK Compatibility

| Mobile Platform                            | Is MWA Supported? | Notes                                                                 |
| ------------------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Android                                    | ✅                | Full support for dApps and Wallet apps.                               |
| Mobile Web - Chrome (Android)              | ✅                | Automatic integration if using `@solana/wallet-adapter-react`.        |
| iOS                                        | ❌                | MWA is not currently available for any iOS platform (app or browser). |
| Mobile Web - Safari, Firefox, Opera, Brave | ❌                | These browsers currently do not support MWA on Android or iOS.      |


</SideBySideLayout>

## Supported Wallets

These wallets support MWA and are compatible on Android with any dApp using the Mobile Wallet Adapter SDK.

- Seed Vault Wallet (Coming soon!)
- Solflare
- Phantom