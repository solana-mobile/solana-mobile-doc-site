# Developing with Expo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

[Expo](https://expo.dev/) is a popular open-source platform that simplifies the development, building, and deployment process for React Native applications. Expo apps have their own managed development flow with Expo Go, and utilize the Expo SDK.

However, the [Expo SDK](https://github.com/expo/fyi/blob/main/whats-in-the-sdk.md) is limited to certain hand-picked modules and the default Expo project does not support further customized native code, like our React Native SDK. 

If you want to use our React Native SDK in an Expo project, you'll need to use a [custom Expo development build](https://docs.expo.dev/develop/development-builds/create-a-build/?redirected).

## Expo MWA Proof of Concept

Check out this [repo](https://github.com/solana-mobile/expo-react-native-mwa-proof-of-concept) to see a custom Expo development build configured with `@solana-mobile/mobile-wallet-adapter-protocol`.

## Installation

This guide will walkthrough how to set up and build an Expo app with a custom development build. 

### Clone the Expo Proof of Concept repo

```shell
git clone https://github.com/solana-mobile/expo-react-native-mwa-proof-of-concept.git
```

### Build the Expo app

You can use the standard Expo build process with `eas build` or build the Expo app locally. See the Expo official documentation for [local builds](https://docs.expo.dev/build-reference/local-builds/) and [eas build](https://docs.expo.dev/develop/development-builds/create-a-build/).

<Tabs>
<TabItem value="build-local" label="Build locally">

#### Build locally

To run the build locally run:
```shell
npx expo run:android
```

If you are seeing errors about missing Android NDK, make sure you've installed Android NDK in Android Studio. You can do this following:
`File -> Project Structure -> SDK Location -> "Android NDK Location" -> Download Android NDK`

![ndk-download](/img/ndk-download.png)

</TabItem>
<TabItem value="eas-build" label="eas build">

#### Build with eas build

You can use Expo's build service to build your app. Make sure you have an Expo account and have logged in with `expo login`.

In the repo, run the command:
```shell
eas build
```

After it's finished building you should receive a QR code and download URL to the `apk` of your app. You can download this to your emulator/device.

</TabItem>
</Tabs>

### Start Expo dev client

After you have installed the custom development build on your device/emulator, you can launch an Expo dev client. You can connect
your custom development build to the dev client and make changes to your app in real time!

Run:
```shell
expo start --dev-client
```

Then select the newly created dev client server, in your custom development build app. Now you should be able to see the proof of concept app load, and make changes to it!









