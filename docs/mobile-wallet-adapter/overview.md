# Mobile Wallet Adapter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FeatureCards, FeatureCard } from '@site/src/components/FeatureCard';
import { Plug, Code, Users, Smartphone, Globe, ArrowDownToLine, QrCode, List } from 'lucide-react';
import { SDKSelectionContainer, SDKSelectionButton } from '@site/src/components/SDKSelectionContainer';



**Mobile Wallet Adapter (MWA)** is a generic protocol specification that enables dApps to connect with mobile wallet apps for Solana transaction and message signing.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/diagrams/mwa_hero_diagram.svg" alt="Mobile Wallet Adapter" width="auto" height="auto" />
</div>

## Features

<FeatureCards>
  <FeatureCard 
    icon={<Plug />}
    title="Unified Wallet Integration" 
    description="Integrate the SDK once and your dApp is compatible with all MWA-compliant wallets." 
  />
  <FeatureCard 
    icon={<Code />}
    title="Simple User Onboarding" 
    description="Users connect and choose a familiar wallet with no additional sign-up steps required." 
  />
  <FeatureCard 
    icon={<Users />}
    title="User Wallet Choice" 
    description="Give users the freedom to connect with their preferred mobile wallet app." 
  />
</FeatureCards>


## Client SDKs

<div>
  <SDKSelectionContainer title="Mobile" icon={<Smartphone size={16} />}>
    <SDKSelectionButton 
      title="Overview" 
      icon={<List size={20} />}
      emphasized={true}
      link="/mobile-wallet-adapter/mobile-apps" 
    />
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
  </SDKSelectionContainer>

  <SDKSelectionContainer title="Web" icon={<Globe size={16} />}>
    <SDKSelectionButton 
      title="Overview" 
      icon={<List size={20} />}
      link="/mobile-wallet-adapter/web-apps" 
    />
    <SDKSelectionButton 
      title="Installation" 
      icon={<ArrowDownToLine size={20} />}
      link="/mobile-wallet-adapter/web-installation" 
    />
    <SDKSelectionButton 
      title="Demo" 
      icon={<QrCode size={20} />}
      link="https://solana-mobile.github.io/mobile-wallet-adapter/example-web-app/" 
    />
  </SDKSelectionContainer>
</div>