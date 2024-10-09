# Marketing & Partnerships

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

This section of the site serves as a resource hub for all things related to marketing and partnerships with Solana Mobile.

# Quickstart

Teams or individual developers that are interested in publishing can find answers to their questions
with these quick links:

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/overview"
        header={{
            label: "Marketing & Partnerships FAQ",
            translateId: "faq-card-header",
        }}
        body={{
            label: "See the list of common questions we receive from developers and teams.",
            translateId: "faq-card-body",
        }}
        emoji="❓"
    />
    <Card
        to="/marketing/marketing-guidelines"
        header={{
            label: "Marketing Guidelines",
            translateId: "marketing-guidelines-card-header",
        }}
        body={{
            label: "Read the guidelines, restrictions, and best practices around marketing for the dApp Store.",
            translateId: "marketing-guidelines-card-body)",
        }}
        emoji="📜"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/chapter2-preorder-token"
        header={{
            label: "Chapter 2 Preorder Token",
            translateId: "preorder-tokens-card-header",
        }}
        body={{
            label: "Learn about the Chapter 2 Preorder Token NFT and how to query for its holders.",
            translateId: "preorder-tokens-card-body",
        }}
        iconPath="img/chapter2-logo.svg"
    />
    <Card
        to="/dapp-publishing/intro"
        header={{
            label: "dApp Store Documentation",
            translateId: "dapp-store-card-header",
        }}
        body={{
            label: "Learn about the dApp Store and how to publish your app.",
            translateId: "dapp-store-card-body",
        }}
        iconPath="img/dappstore-logo.png"
    />
</CardLayout>

<br/>
