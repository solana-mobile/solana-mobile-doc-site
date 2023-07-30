--- 
title: Sample App Collection
hide_table_of_contents: true
---

import SampleAppCardLayout from "../../src/layouts/SampleAppCardLayout"
import SampleAppCard from "../../src/components/SampleAppCard"

A list of open-source sample apps in different languages/frameworks to help you get started! 
- If you're new to using the mobile wallet adapter SDK or looking for a reference point for your own implementation, explore these sample apps.
- By exploring these sample apps, you can get a better understanding of the capabilities of the Mobile Wallet Adapter SDK and how it can be integrated into a project.


## React Native

<SampleAppCardLayout>
    <SampleAppCard 
        title="Hello World: React Native" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A React Native app that writes a message on the blockchain." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
            ]}
    />
    <SampleAppCard 
        title="Anchor Counter Program" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="Creating and interacting with an on-chain Anchor Counter program." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "Anchor",
            ]}
    />
    <SampleAppCard 
        title="Mobile NFT Minter" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A React Native app interacting with an on-chain Anchor Counter program." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native",
                "Metaplex",
                "IPFS",
            ]}
    />
    <SampleAppCard 
        title="Advanced Hello World Example" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A reference app with MWA Auth Token persistent storage, using the SWR library." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "SWR",
            ]}
    />
</SampleAppCardLayout>

## Android

<SampleAppCardLayout>
    <SampleAppCard 
        title="Hello World: Android" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A Kotlin app that writes a message on the blockchain." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
            ]}
    />
    <SampleAppCard 
        title="Hello World: Android (RxJava)" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A Kotlin app showcasing MWA with the RxJava library."
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
                "RxJava",
            ]}
    />
    <SampleAppCard 
        title="MintyFresh"
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A full fledged production dApp. Mint NFTs directly from your phone." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
                "Metaplex",
                "Jetpack Compose",
            ]}
    />

</SampleAppCardLayout>

## Testing Apps

These are reference apps that also serve as development tools to test MWA integration.

<SampleAppCardLayout>
    <SampleAppCard 
        title="fake dapp" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="A Kotlin app with UI to simulate MWA methods." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
            ]}
    />
    <SampleAppCard 
        title="fake wallet" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="An unsafe, reference Kotlin wallet supporting MWA."
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
                "walletlib",
            ]}
    />
    <SampleAppCard 
        title="Example RN wallet"
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="An unsafe RN wallet with MWA bottom sheet signing." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "walletlib",
            ]}
    />

</SampleAppCardLayout>
