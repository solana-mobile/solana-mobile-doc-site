# Solana Expo dApp Template

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CTAButton from "../../src/components/CTAButton";

This template is a ready-to-go Expo dApp that offers:

- Pre-installed standard SDKs like Mobile Wallet Adapter and `@solana/web3.js`
- Required polyfills like `react-native-get-random-values` and `Buffer` installed.
- Simple React UI Components like `ConnectWalletButton`, `RequestAirdropButton`, `SignMessageButton`.

<CTAButton label="View on GitHub" to="https://github.com/solana-mobile/solana-mobile-dapp-scaffold" />

## Prerequisites

- An [Expo](https://expo.dev/) account.
- React Native and Android Envrionment [setup](https://docs.solanamobile.com/getting-started/development-setup)
  - An Android device/emulator.
  - Install an MWA compliant wallet app on your device/emulator.

## Usage

### Initialize project

Initialize the template with:

```
npx create-expo-app --template @solana-mobile/solana-mobile-expo-template
```

### Build the APK

For Solana Mobile development, we need to use an Expo custom development build, rather than Expo Go.

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

After successfully building locally, the APK should be generated and outputted to the same directory you ran the command. Install that APK into your device/emulator (drag and drop APK file into emulator).

</TabItem>
<TabItem value="eas-build" label="EAS build">

#### Build with eas build

You can use Expo's build service to build your app. Make sure you have an Expo account and have logged in with `expo login`.

In the repo, run the command:

```shell
eas build
```

After it's finished building you should receive a QR code and download URL to the `apk` of your app. You can download this to your emulator/device.

</TabItem>
</Tabs>

### Run the app

At this point, the APK should be installed onto your emulator or device. You can launch the app and connect it to the development client with:

```shell
npx expo start --dev-client
```

This will launch the template app and you can select the newly created development server. Now you can edit your code and see changes reflected immediately!
