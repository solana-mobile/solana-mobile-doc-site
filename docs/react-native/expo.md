# Developing with Expo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

[Expo](https://expo.dev/) is a popular open-source platform that simplifies the development, building, and deployment process for React Native applications. Expo apps have their own managed development flow with Expo Go, and utilizes the Expo SDK.

## Expo Development for Solana Mobile

The React Native resources, guides, and tutorials for Solana Mobile development **are all applicable for Expo as well**! After the initial setup, the development of an Expo app and a React Native app are very similar.

### Custom Development Build

The traditional [Expo Go](https://github.com/expo/fyi/blob/main/whats-in-the-sdk.md) development flow is limited to certain hand-picked modules and does not support further customized native code, which Solana Mobile SDKs need.

Instead, we'll need to use a [custom development build](https://docs.expo.dev/develop/development-builds/create-a-build) which makes Solana Mobile React Native libraries (i.e Mobile Wallet Adapter) fully compatible with Expo.

## Expo dApp Template

The first option to get started with Expo development is using the [Solana Mobile Expo dApp Template](/react-native/expo-template-app). Run a single command to download and initialize a Solana Expo dApp with pre-installed libraries and UI components.
