# Marketing & Partnerships

import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

This section of the site serves as a resource hub for all things related to marketing and partnerships with Solana Mobile.

# Quickstart

Whether you're just beginning your publishing journey or about to publish an app, read through the resources
here to ensure a successful launch.

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/promoting-your-app"
        header={{
            label: "Promoting Your App",
            translateId: "promoting-your-app-card-header",
        }}
        body={{
            label: "Explore the best practices for promoting your app on the dApp Store.",
            translateId: "promoting-your-app-card-body",
        }}
        emoji="📣"
    />
    <Card
        to="/marketing/targeting-seeker-users"
        header={{
            label: "Targeting Seeker & Saga users",
            translateId: "targeting-seeker-users-card-header",
        }}
        body={{
            label: "Run a campaign for Seeker and Saga users using the soulbound Preorder and Genesis NFTs.",
            translateId: "targeting-seeker-users-card-body",
        }}
        iconPath="img/chapter2-logo.svg"
    />
</CardLayout>

<CardLayout autoFitEnabled={true}>
    <Card
        to="/marketing/partnership-inquiries"
        header={{
            label: "Partnership Inquiries",
            translateId: "preorder-tokens-card-header",
        }}
        body={{
            label: "Learn about Solana Mobile's partnership policies and practices",
            translateId: "preorder-tokens-card-body",
        }}
        emoji="💼"
    />
    <Card
        to="/dapp-publishing/faq"
        header={{
            label: "FAQ",
            translateId: "dapp-store-card-header",
        }}
        body={{
            label: "See our a quick overview of common questions around marketing and partnerships.",
            translateId: "dapp-store-card-body",
        }}
        emoji="❓"
    />
</CardLayout>

<br/>
