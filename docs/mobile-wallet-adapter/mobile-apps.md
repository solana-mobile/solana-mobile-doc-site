---
hide_table_of_contents: true
---

# MWA for Mobile Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoCarousel from '@site/src/components/VideoCarousel';
import SideBySideLayout from '@site/src/layouts/SideBySideLayout';
import { SDKSelectionContainer, SDKSelectionButton } from '@site/src/components/SDKSelectionContainer';
import {Code, ArrowDownToLine, Globe } from 'lucide-react';

<SideBySideLayout
  rightContent={
    <VideoCarousel 
      videos={[
        {
          src: "/videos/phantom_mwa.mp4",
          label: "Phantom"
        },
        {
          src: "/videos/solflare_mwa.mp4",
          label: "Solflare"
        },
        {
          src: "/videos/mock_mwa_wallet.mp4",
          label: "Mock Wallet"
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

  <SDKSelectionContainer title="Installation" icon={<ArrowDownToLine size={20} />}>
    <SDKSelectionButton 
      title="React Native" 
      icon={
        <img
          src={"/img/react-native-96.svg"}
          alt=""
          width={20}
          height={20}
        />
      }
      link="/react-native/using_mobile_wallet_adapter" 
    />
    <SDKSelectionButton 
      title="Kotlin" 
      icon={
        <img
          src={"/img/kotlin-icon-32.svg"}
          alt=""
          width={20}
          height={20}
        />
      }
      link="/android-native/using_mobile_wallet_adapter" 
    />
    <SDKSelectionButton 
      title="Mobile Web" 
      icon={<Globe size={20} />}
      link="/mobile-wallet-adapter/web-installation" 
    />
    <SDKSelectionButton 
      title="Flutter" 
      icon={
        <img
          src={"/img/flutter-icon.svg"}
          alt=""
          width={20}
          height={20}
        />
      }
      link="/flutter/overview" 
    />
    <SDKSelectionButton 
      title="Unity" 
      icon={
        <img
          src={"/img/unity-logo.png"}
          alt=""
          width={20}
          height={20}
        />
      }
      link="/unity/unity_sdk" 
    />
    <SDKSelectionButton 
      title="Unreal" 
      icon={
        <img
          src={"/img/unreal-logo.png"}
          alt=""
          width={20}
          height={20}
        />
      }
      link="/unreal/unreal_sdk" 
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