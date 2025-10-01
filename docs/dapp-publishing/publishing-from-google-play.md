---
displayed_sidebar: dappPublishingSidebar
---

# Publishing from Google Play to the dApp Store

import { FrameworkSwitcher } from '@site/src/components/FrameworkSwitcher';
import NativeAndroidInstructions from './_snippets/buildSignedApkNativeAndroid.mdx';
import ExpoInstructions from './_snippets/buildSignedApkExpo.mdx';

## Overview

Publishing your existing Google Play app to the dApp Store requires:
1. A release APK file signed with a **new, unique signing key** (different from Google Play)
2. Following the standard dApp Store publishing workflow

Key differences from Google Play:
- **File Format**: dApp Store submission requires APK files (Google Play uses AAB)
- **Signing Key**: Must use a completely separate signing key from Google Play
- **In-App Purchases**: No 30% tax on in-app purchases or transactions

:::warning Critical Requirement
You cannot use the same signing key for both Google Play and the dApp Store.
:::

## Build Your APK

### 1. Create New Signing Key
Generate a new signing key exclusively for the dApp Store:

```bash
keytool -genkey -v -keystore dappstore.keystore \
  -alias dappstore \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Store the keystore file and passwords securely** - losing them means you cannot update your app.

For reference, view the [Android app signing guide](https://developer.android.com/studio/publish/app-signing).

### 2. Build Signed APK

<FrameworkSwitcher
  frameworks={[
    { id: 'native', label: 'Native Android', icon: '/img/android_icon.svg' },
    { id: 'expo', label: 'Expo', icon: '/img/expo-sdk-icon.svg' }
  ]}
>
  {{
    native: <NativeAndroidInstructions />,
    expo: <ExpoInstructions />
  }}
</FrameworkSwitcher>

### 3. Verify APK
Confirm your APK is properly signed before submission:

```bash
apksigner verify --print-certs app-release.apk
```

For reference, view the [apksigner documentation](https://developer.android.com/studio/command-line/apksigner#usage-verify).

## Next Steps

With your signed APK ready, follow the standard dApp Store publishing process:

1. **[Set up publishing tools](/dapp-publishing/setup)** - Install the dApp Store CLI
2. **[Prepare your submission](/dapp-publishing/prepare)** - Gather assets and configure app details  
3. **[Complete publishing guide](/dapp-publishing/overview)** - Submit your app

## Additional Resources

- [Publisher Policy](/dapp-publishing/publisher-policy) - Review dApp Store requirements
- [Asset Requirements](/dapp-publishing/prepare#asset-requirements) - Icon, banner, and screenshot specifications
- [Support](/dapp-publishing/support) - Get help with publishing issues
