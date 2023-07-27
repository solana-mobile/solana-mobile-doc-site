---
title: Client Library API
displayed_sidebar: referenceSidebar
---

import SmallCard from "../../src/components/SmallCard"
import Card from "../../src/components/Card"
import CardLayout from "../../src/layouts/CardLayout"

Explore the API references for the various libraries that are used in the Solana Mobile Stack.

## Mobile Wallet Adapter
See the API for the various client libraries implemented for [Mobile Wallet Adapter](/getting-started/overview#mobile-wallet-adapter).

<CardLayout autoFitEnabled={false}>
    <SmallCard
        to="/reference/typescript/mobile-wallet-adapter"
        header={{
            label: "Typescript",
            translateId: "typescript-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
    <SmallCard
        to="/reference/kotlin/mobile-wallet-adapter"
        header={{
            label: "Kotlin",
            translateId: "kotlin-reference",
        }}
        iconPath="img/kotlin-icon.png"
    />
    <SmallCard
        to="/flutter/overview"
        header={{
            label: "Flutter",
            translateId: "flutter-reference",
        }}
        iconPath="img/flutter-icon.svg"
    />
</CardLayout>

## Solana RPC Clients

These clients provide a library to interact with Solana nodes through the Solana [JSON RPC API](https://docs.solana.com/api).

<CardLayout autoFitEnabled={false}>
    <SmallCard
        to="/reference/typescript/web3js"
        header={{
            label: "web3.js",
            translateId: "typescript-reference",
        }}
        iconPath="img/typescript-icon.png"
    />
</CardLayout>