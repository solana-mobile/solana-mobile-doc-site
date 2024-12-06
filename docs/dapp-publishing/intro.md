# Solana dApp Store

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"
import { FAQ, FAQSection } from '@site/src/components/FAQ';

The Solana dApp Store is the crypto-friendly app store for the Solana Mobile phones, Saga and the upcoming [Seeker](https://solanamobile.com/).

## Getting Started

Wherever you are in your publishing journey, you can find resources here to get started.

<FAQ>
  <FAQSection title="What apps can be published to the dApp Store?" expanded={true}>

    Both Android apps and web apps!

    If you:
    - Have an existing Android app, you're ready to start publishing now!
    - Have a web app, you can convert a PWA into an Android app and generate an APK for app submission!

    Before publishing, ensure your dApp complies with the Solana dApp Store [publisher policy](/dapp-publishing/policy).

    <CardLayout autoFitEnabled={true}>

        <Card
            to="/dapp-publishing/overview"
            header={{
                label: "Publish your dApp",
                translateId: "publish-card-header",
            }}
            body={{
                label: "Follow the step-by-step guide to publish your app to the Solana dApp Store.",
                translateId: "publish-card-body",
            }}
            iconPath="img/rocket-icon2.png"
        />

        <Card
            to="/dapp-publishing/publishing-a-pwa"
            header={{
                label: "Convert a PWA to an APK",
                translateId: "pwa-card-header",
            }}
            body={{
                label: "Learn how to convert a PWA to an Android app and publish on the dApp Store.",
                translateId: "pwa-card-body",
            }}
            iconPath="img/pwa-icon.png"
        />

    </CardLayout>

  </FAQSection>
  <FAQSection title="Do I need a Seeker or Saga to build an app for the dApp Store?">
    You do not need a Seeker or Saga to develop Android apps for the dApp Store.

    Developers **already** have all the tools necessary to start building apps for the dApp Store today!


    <CardLayout autoFitEnabled={true}>
        <Card
            to="/getting-started/development-setup"
            header={{
                label: "Development Setup",
                translateId: "develop-card-header",
            }}
            body={{
                label: "A guide to setup an Android device or emulator and start building for the dApp Store.",
                translateId: "develop-card-body",
            }}
        iconPath="img/solana-mobile-stack-logo.png"
        />
    </CardLayout>

  </FAQSection>
  <FAQSection title="I've published my app! How can I promote it?">
    You can find resources related to App Promotion by viewing our Marketing & Partnerships documentation

    <CardLayout autoFitEnabled={true}>
        <Card
            to="/marketing/overview"
            header={{
                label: "Marketing & Promotion Resources",
                translateId: "marketing-card-header",
            }}
            body={{
                label: "See the Marketing & Partnership documentation for resources around launching on the dApp Store.",
                translateId: "marketing-card-body",
            }}
            emoji="📣"
        />
    </CardLayout>

  </FAQSection>
</FAQ>

## More resources

<CardLayout autoFitEnabled={true}>
    <Card
        to="/dapp-publishing/checklist"
        header={{
            label: "Publishing Checklist",
            translateId: "publishing-cheklist-card-header",
        }}
        body={{
            label: "An overview of the publishing process and what to expect before you begin.",
            translateId: "publishing-cheklist-card-body",
        }}
        emoji="✅"
    />
    <Card
        to="/dapp-publishing/listing-page-guidelines"
        header={{
            label: "dApp Listing Page",
            translateId: "listing-page-card-header",
        }}
        body={{
            label: "Visualize how your app listing will be presented within the dApp Store.",
            translateId: "listing-page-card-body",
        }}
        emoji="📱"
    />
    <Card
        to="/dapp-publishing/policy"
        header={{
            label: "Publisher Policy",
            translateId: "policy-card-header",
        }}
        body={{
            label: "See the dApp Store mission statement and publisher policy.",
            translateId: "policy-card-body",
        }}
        emoji="📜"
    />
</CardLayout>
