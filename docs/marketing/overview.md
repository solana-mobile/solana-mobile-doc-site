# Developer Marketing

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

This section of the site serves as a resource hub for all things related to marketing your app to the Solana Mobile community.

# Quickstart

Whether you're just beginning your publishing journey or about to publish an app, read through the resources
here to ensure a successful launch.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/comarketing-guidelines"
        header={{
            label: "Co-marketing with Solana Mobile",
            translateId: "comarketing-guidelines-card-header",
        }}
        body={{
            label: "Learn how you can co-market with Solana Mobile and reach the Solana Mobile community.",
            translateId: "comarketing-guidelines-card-body",
        }}
        emoji="📣"
    />
    <Card
        to="/marketing/engaging-seeker-users"
        header={{
            label: "Engaging Seeker & Saga users",
            translateId: "engaging-seeker-users-card-header",
        }}
        body={{
            label: "Run a campaign for Seeker and Saga users using the soulbound Preorder and Genesis NFTs.",
            translateId: "engaging-seeker-users-card-body",
        }}
        iconPath="img/chapter2-logo.svg"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/faq"
        header={{
            label: "Partnership Inquiries",
            translateId: "partnership-inquiries-card-header",
        }}
        body={{
            label: "Common questions and requests about collaboration with Solana Mobile.",
            translateId: "partnership-inquiries-card-body",
        }}
        emoji="❓"
    />
    <Card
        to="/dapp-publishing/intro"
        header={{
            label: "Solana dApp Store",
            translateId: "dapp-store-card-header",
        }}
        body={{
            label: "Learn about the Solana dApp Store and how to publish mobile and web apps.",
            translateId: "dapp-store-card-body",
        }}
        iconPath="img/dappstore-logo.png"
    />
</CardLayout>

<br/>
