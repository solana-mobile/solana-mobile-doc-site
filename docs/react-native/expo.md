# Developing with Expo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

[Expo](https://expo.dev/) is a popular open-source platform that simplifies the development, building, and deployment process for React Native applications. Expo apps have their own managed development flow with Expo Go, and utilize the Expo SDK.



:::tip
The [Expo Go](https://github.com/expo/fyi/blob/main/whats-in-the-sdk.md) development flow is limited to certain hand-picked modules and does not support further customized native code, like our React Native SDK. 

Instead, we'll need to use a [custom development build](https://docs.expo.dev/develop/development-builds/create-a-build) which makes our React Native SDK fully compatible with Expo.

The steps below walkthrough how to get the Expo example running!
:::

## Expo MWA Proof of Concept

Check out this [repo](https://github.com/solana-mobile/expo-react-native-mwa-proof-of-concept) to see a custom Expo development build configured with `@solana-mobile/mobile-wallet-adapter-protocol`.

## Installation

This guide will walkthrough how to set up and build an Expo app with a custom development build. 

### Clone the Expo Proof of Concept repo

```shell
git clone https://github.com/solana-mobile/expo-react-native-mwa-proof-of-concept.git
```

### Build the Expo app

You can use the Expo `eas build` command to build your custom development build APK and install it on device/emulator. 


#### Local vs EAS builds

The `eas build` command deploys a job to the EAS Build service that builds your APK using Expo's build infrastructure. 

You can also run the build process locally by adding the `--local` flag that runs, which builds and generates the APK on your computer. You'll need Android Studio and Java correctly setup for this step.

See the Expo official documentation for [`eas build`](https://docs.expo.dev/build-reference/android-builds/) and [local builds](https://docs.expo.dev/build-reference/local-builds/).

<Tabs>
<TabItem value="build-local" label="Build locally">

#### Configure `eas.json`

Ensure your development profile has the `developmentClient` field set to true.
```json
"development": {
    "developmentClient": true,
    "distribution": "internal"
},
```
#### Build locally
Run the build locally with the specified profile and `--local` flag.
```shell
npx eas build --profile development --platform android --local
```
<details>
<summary>Troubleshooting:</summary>

#### Incorrect JDK version or Missing Android SDK

Follow the [React Native CLI setup instructions](https://reactnative.dev/docs/environment-setup) to make sure your local environment is setup for Android development.
You'll need:
- JDK version 11
- Android SDK installed and configured through Android Studio SDK Manager
- ANDROID_HOME environment variable

#### Missing Android NDK
If you are seeing errors about missing Android NDK, make sure you've installed Android NDK in Android Studio. You can do this following:
`File -> Project Structure -> SDK Location -> "Android NDK Location" -> Download Android NDK`

![ndk-download](/img/ndk-download.png)

</details>

#### Install the custom development build APK

After successfully building locally, the APK should be generated and outputted to the same directory you ran the command. Install that APK into your device/emulator.

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

After you have installed the custom development build on your device/emulator, you need to start and connect an Expo dev client to the app. 

Run:
```shell
npx expo start --dev-client
```

On your emulator/device, launch your app and select the newly created development server. Now you can edit your code and see changes reflected immediately!









