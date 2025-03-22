# MWA for Web Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoCarousel from '@site/src/components/VideoCarousel';
import SideBySideLayout from '@site/src/layouts/SideBySideLayout';
import { SDKSelectionContainer, SDKSelectionButton } from '@site/src/components/SDKSelectionContainer';
import { Smartphone, Code, Github, BookOpen, QrCode, ArrowDownToLine } from 'lucide-react';


## Overview

Mobile Wallet Adapter works on both Desktop Web and Mobile Web applications through two different connection methods:

- **Desktop Web Apps** connect remotely to wallet apps via QR code scanning
- **Mobile Web Apps**, including PWAs, connect locally to wallet apps on the same device

## SDK

Use the **Mobile Wallet Standard** library to register MWA as a wallet option in your web app for both desktop and mobile users.

The library handles both connection types automatically and presents the correct user experience based on the user's platform. It is compatible with any web app using the `@anza/wallet-adapter` libraries.

  <SDKSelectionContainer title="Reference" icon={<BookOpen size={20} />}>
    <SDKSelectionButton 
      title="Installation" 
      icon={<ArrowDownToLine size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
    <SDKSelectionButton 
      title="Demo" 
      icon={<QrCode size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
    <SDKSelectionButton 
      title="Github" 
      icon={<Github size={20} />}
      link="/docs/sdks/mobile-wallet-standard" 
    />
  </SDKSelectionContainer>

## Wallet Compatibility

| Wallet | QR Code (Remote) | Mobile Web (Local) |
| ------ | ---------------- | ------------------ |
| Seed Vault Wallet | ✅ | ✅ |
| Solflare | ✅ | ✅ |
| Phantom | ❌ | ✅ |

