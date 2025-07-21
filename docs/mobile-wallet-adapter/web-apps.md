# MWA for Web Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MediaCarousel from '@site/src/components/MediaCarousel';
import SideBySideLayout from '@site/src/layouts/SideBySideLayout';
import { SDKSelectionContainer, SDKSelectionButton } from '@site/src/components/SDKSelectionContainer';
import { Smartphone, Code, Github, BookOpen, QrCode, ArrowDownToLine } from 'lucide-react';


<MediaCarousel 
  videos={[
    {
      src: "/videos/svw_mwa.mp4",
      label: "Mobile Web"
    },
    {
      src: "/img/RemoteModal.png",
      label: "Desktop Web"
    },
  ]}
  autoPlay={true}
  muted={true}
/>

## Overview

Mobile Wallet Adapter works on both Desktop Web and Mobile Web applications through two different connection methods:

- **Desktop Web Apps** connect remotely to wallet apps via QR code scanning.
- **Mobile Web Apps**, including PWAs, connect locally to wallet apps on the same device.

## SDK

Use the **Mobile Wallet Standard** library to register MWA as a wallet option in your web app for both desktop and mobile users.

The library handles both connection types automatically and presents the correct user experience based on the user's platform. It is compatible with any web app using the `@anza/wallet-adapter` libraries.

  <SDKSelectionContainer title="Reference" icon={<BookOpen size={20} />}>
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
    <SDKSelectionButton 
      title="Github" 
      icon={<Github size={20} />}
      link="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/wallet-standard-mobile" 
    />
  </SDKSelectionContainer>

## Wallet Compatibility 

| Wallet (Android only) | QR Code (Remote) | Mobile Web (Local) |
| ------ | ---------------- | ------------------ |
| Seed Vault Wallet | ✅ | ✅ |
| Solflare | ✅ (Planned) | ✅ |
| Phantom | ❌ | ✅ |

## Browser Compatibility

| Platform                                  | QR Code (Remote) | Mobile Web (Local) | Notes                                                          |
| ----------------------------------------- | ---------------- | ------------------ | -------------------------------------------------------------- |
| Desktop - All Browsers                    | ✅               | N/A                | QR Code display works on all desktop browsers.                 |
| Android - Chrome                          | N/A              | ✅                 | Primary Android browser; also works with Chrome PWAs.          |
| Android - Other Browsers                  | N/A              | ❌                 | Firefox, Opera, Brave, etc. do not support MWA.                |
| iOS - All Browsers                        | N/A              | ❌                 | MWA is not available on any iOS browser.                       |

