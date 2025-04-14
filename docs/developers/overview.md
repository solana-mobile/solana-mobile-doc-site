import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"
import Card2 from "../../src/components/Card2"
import { Terminal, Rocket, Code, BookOpen, Home} from "lucide-react";


# Developer Documentation

## Getting Started

Start developing apps for the Solana dApp Store on **any** Android device or emulator.

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/react-native/quickstart"
        header={{
            label: "Quickstart",
            translateId: "quickstart-header",
        }}
        body={{
            label: "Launch a mobile app using the Solana Mobile Expo Template.",
            translateId: "quickstart-body",
        }}
        iconComponent={<Rocket size={24} />}
    />
    <Card2
        to="/developers/development-setup"
        header={{
            label: "Development Setup",
            translateId: "development-setup-header",
        }}
        body={{
            label: "Set up your environment for Solana mobile development.",
            translateId: "development-setup-body",
        }}
        iconComponent={<Terminal size={24} />}
    />
</CardLayout>

## Development Guides

Official guides and resources for building Solana mobile apps with our fully supported frameworks.

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/react-native/overview"
        header={{
            label: "React Native",
            translateId: "react-native",
        }}
        body={{
            label: "Build mobile apps with JavaScript and reuse familiar Solana web libraries.",
            translateId: "react-native-body",
        }}
        iconPath="img/react-native-96.svg"
    />
    <Card2
        to="/android-native/overview"
        header={{
            label: "Kotlin",
            translateId: "android-native",
        }}
        body={{
            label: "Create high-performance native apps with full Android capabilities.",
            translateId: "android-native-body",
        }}
        iconPath="img/kotlin-icon-32.svg"
    />
</CardLayout>

### Community Supported Frameworks

Third-party development guides and resources for additional frameworks created by the ecosystem members.

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/flutter/overview"
        header={{
            label: "Flutter",
            translateId: "flutter-headr",
        }}
        body={{
            label: "Third-party resources and SDKs for Solana Flutter development.",
            translateId: "learn-programs",
        }}
        iconPath="img/flutter-icon.svg"
    />
    <Card2
        to="/unity/unity_sdk"
        header={{
            label: "Unity",
            translateId: "unity-header",
        }}
        body={{
            label: "Third-party resources and SDKs for Solana Unity development.",
            translateId: "unity-setup-body",
        }}
        iconPath="img/unity-logo.png"
    />
    <Card2
        to="/unreal/unreal_sdk"
        header={{
            label: "Unreal Engine",
            translateId: "unreal-header",
        }}
        body={{
            label: "Third-party resources and SDKs for Solana Unreal development.",
            translateId: "unreal-header-body",
        }}
        iconPath="img/unreal-logo.png"
    />
</CardLayout>


## Resources

Additional resources for building mobile apps on the Solana dApp Store.

<CardLayout autoFitEnabled={true}>
    <Card2
        to="/sample-apps/sample_app_overview"
        header={{
            label: "Sample Apps",
            translateId: "mobile-wallet-adapter-header",
        }}
        body={{
            label: "Browse reference apps to jumpstart your development.",
            translateId: "mobile-wallet-adapter-body",
        }}
        iconComponent={<Code size={24} />}
    />
    <Card2
        to="/dapp-publishing/overview"
        header={{
            label: "dApp Store",
            translateId: "dapp-store-card-header",
        }}
        body={{
            label: "Publish your app on the Solana dApp Store.",
            translateId: "dapp-store-card-body",
        }}
        iconComponent={<Home size={24} />}
    />
    <Card2
        to="/reference/overview"
        header={{
            label: "API Reference",
            translateId: "api-reference-header",
        }}
        body={{
            label: "Explore comprehensive SDK and API documentation.",
            translateId: "api-reference-body",
        }}
        iconComponent={<BookOpen size={24} />}
    />
</CardLayout>