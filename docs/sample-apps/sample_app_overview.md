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
        sampleAppLink="https://github.com/solana-mobile/tutorial-apps/tree/main/first-mobile-dapp"
        description="A React Native app that writes a message on the blockchain." 
        imageUrl="sample_app_imgs/hello_world_react_native.png" 
        tags={[
                "React Native", 
            ]}
    />
    <SampleAppCard 
        title="Anchor Counter Program" 
        sampleAppLink="https://github.com/solana-mobile/tutorial-apps/tree/main/AnchorCounterDapp"
        description="Generate an IDL and interact with an on-chain Anchor program." 
        imageUrl="sample_app_imgs/anchor_counter_program.png" 
        tags={[
                "React Native", 
                "Anchor",
            ]}
    />
    <SampleAppCard 
        title="Mobile NFT Minter" 
        sampleAppLink="https://github.com/solana-mobile/tutorial-apps/tree/main/MobileNFTMinter"
        description="Mint photos as NFTs with Metaplex SDK and IPFS hosting." 
        imageUrl="sample_app_imgs/mobile_nft_minter.png" 
        tags={[
                "React Native",
                "Metaplex",
                "IPFS",
            ]}
    />
     <SampleAppCard 
        title="Idle Farming Game" 
        sampleAppLink="https://github.com/solana-mobile/tutorial-apps/tree/main/FarmingIdleGame"
        description="A fully on-chain idle game with a global leaderboard, upgrades, and burner wallet." 
        imageUrl="sample_app_imgs/idle_farming_game.jpg" 
        tags={[
                "Expo", 
                "Zustand", 
                "Expo Router", 
                "Anchor", 
            ]}
    />
    <SampleAppCard 
        title="Simple Storage dApp" 
        sampleAppLink="https://github.com/solana-mobile/tutorial-apps/tree/main/SimpleStorageDapp"
        description="Basic MWA Auth Token persistence with AsyncStorage." 
        imageUrl="sample_app_imgs/simple_storage_dapp.jpg" 
        tags={[
                "React Native", 
                "AsyncStorage",
            ]}
    />
    <SampleAppCard 
        title="Advanced Hello World Example" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="MWA persistence with AsyncStorage and the SWR library." 
        imageUrl="sample_app_imgs/advanced_hello_world_react_native.png" 
        tags={[
                "React Native", 
                "AsyncStorage",
                "SWR",
            ]}
    />

</SampleAppCardLayout>

## Android

<SampleAppCardLayout>
    <SampleAppCard 
        title="Hello World: Android" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-clientlib-ktx-app"
        description="A Kotlin app that writes a message on the blockchain." 
        imageUrl="sample_app_imgs/hello_world_android.png" 
        tags={[
                "Kotlin", 
            ]}
    />
    <SampleAppCard 
        title="Hello World: Android (RxJava)" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-clientlib-rxjava-app"
        description="A Kotlin app showcasing MWA with the RxJava library."
        imageUrl="sample_app_imgs/hello_world_rxjava.png" 
        tags={[
                "Kotlin", 
                "RxJava",
            ]}
    />
    <SampleAppCard 
        title="MintyFresh"
        sampleAppLink="https://github.com/solana-mobile/Minty-fresh/tree/main"
        description="A full fledged production dApp. Mint NFTs directly from your phone." 
        imageUrl="sample_app_imgs/mintyfresh.png" 
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
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakedapp"
        description="A Kotlin app with UI to simulate MWA methods." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
            ]}
    />
    <SampleAppCard 
        title="fake wallet" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet"
        description="An unsafe, reference Kotlin wallet supporting MWA."
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "Kotlin", 
                "walletlib",
            ]}
    />
    <SampleAppCard 
        title="Example RN wallet"
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-wallet"
        description="An unsafe RN wallet with MWA bottom sheet signing." 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "walletlib",
            ]}
    />

</SampleAppCardLayout>
