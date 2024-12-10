# Mobile Development Frameworks

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"


## Choose a development framework

Although, the Solana Mobile Stack is primarily written in native Android, we also have support for popular mobile
development frameworks.


### SDKs

These are SDKs that are maintained by the Solana Mobile team.


<CardLayout autoFitEnabled={true}>
    <Card
        to="/react-native/overview"
        header={{
            label: "React Native",
            translateId: "react-native",
        }}
        body={{
            label: "Quickly start building your mobile dApp with React Native, with access to a selection of familiar web libraries.",
            translateId: "react-native-body",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card
        to="/android-native/overview"
        header={{
            label: "Kotlin",
            translateId: "android-native",
        }}
        body={{
            label: "Develop a Kotlin Android app to utilize the full capabilities of the Android OS and build a performant native experience.",
            translateId: "android-native-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

### Community SDKs

These SDKs are actively maintained, supported, and used by members and developers of our community. Click to learn more about
the capabilities supported by each, the state of development, and how to get started.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/flutter/overview"
        header={{
            label: "Flutter",
            translateId: "flutter-headr",
        }}
        body={{
            label: "An actively maintained SDK for building Solana mobile dApps with Flutter.",
            translateId: "learn-programs",
        }}
        iconPath="img/flutter-icon.svg"
    />
    <Card
        to="/unity/unity_sdk"
        header={{
            label: "Unity",
            translateId: "unity-header",
        }}
        body={{
            label: "Integrate the Solana Mobile stack into your Unity mobile game.",
            translateId: "unity-setup-body",
        }}
        iconPath="img/unity-logo.png"
    />
    <Card
        to="/unreal/unreal_sdk"
        header={{
            label: "Unreal Engine",
            translateId: "unreal-header",
        }}
        body={{
            label: "An early stage SDK for integrating Solana Mobile into an Unreal Engine mobile game.",
            translateId: "unreal-header-body",
        }}
        iconPath="img/unreal-logo.png"
    />
</CardLayout>
