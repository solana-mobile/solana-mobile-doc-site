# Mobile Wallet Adapter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FeatureCards, FeatureCard } from '@site/src/components/FeatureCard';
import { Plug, Code, Users, Smartphone, Globe, FileCode, Palette, Layout, QrCode, List } from 'lucide-react';
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
      link="/docs/sdks/react-native" 
    />
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
  </SDKSelectionContainer>

  <SDKSelectionContainer title="Web" icon={<Globe size={16} />}>
    <SDKSelectionButton 
      title="Overview" 
      icon={<List size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
    <SDKSelectionButton 
      title="QR Code (Desktop)" 
      icon={<QrCode size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
    <SDKSelectionButton 
      title="Mobile Web" 
      icon={<Globe size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
  </SDKSelectionContainer>
</div>