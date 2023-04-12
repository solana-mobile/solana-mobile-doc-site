# Developing with Expo

## Overview

[Expo](https://expo.dev/) is a popular open-source platform that simplifies the development, building, and deployment process for React Native applications. Expo apps have their own managed development flow with Expo Go, and utilize the Expo SDK.

However, the [Expo SDK](https://github.com/expo/fyi/blob/main/whats-in-the-sdk.md) is limited to certain hand-picked modules and the default Expo project does not support further customized native code, like our React Native SDK. 

If you want to use our React Native SDK in an Expo project, you'll need to use a [custom Expo development build](https://docs.expo.dev/develop/development-builds/create-a-build/?redirected).

## Expo MWA Proof of Concept

Check out this [repo](https://github.com/solana-mobile/expo-react-native-mwa-proof-of-concept) to see a custom Expo development build configured with `@solana-mobile/mobile-wallet-adapter-protocol`.
