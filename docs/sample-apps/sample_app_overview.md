--- 
title: Sample App Collection
hide_table_of_contents: true
---

import SampleAppCardLayout from "../../src/layouts/SampleAppCardLayout"
import SampleAppCard from "../../src/components/SampleAppCard"

A list of open-source sample apps in different languages/frameworks to help you get started! 
- If you're new to using the mobile wallet adapter SDK or looking for a reference point for your own implementation, explore these sample apps.
- By exploring these sample apps, you can get a better understanding of the capabilities of the Mobile Wallet Adapter SDK and how it can be integrated into a project.


### Hello World Apps
These are simple mobile dApps that show basic usage of Mobile Wallet Adapter and send a message to the Solana blockchain with the Memo program.

<SampleAppCardLayout>
    <SampleAppCard 
        title="Hello World: React Native" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="This is a simple Hello World React Native App" 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "MWA",
                "web3.js",
            ]}
    />
    <SampleAppCard 
        title="Hello World: Android" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="This is a simple Hello World React Native App" 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "MWA",
                "web3.js",
            ]}
    />
    <SampleAppCard 
        title="Hello World: Android (RxJava)" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="This is a simple Hello World React Native App" 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "MWA",
                "web3.js",
            ]}
    />
    <SampleAppCard 
        title="Anchor Counter Program dApp" 
        sampleAppLink="https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app"
        description="This is a simple Hello World React Native App" 
        imageUrl="img/solana-mobile-stack-social-card.png" 
        tags={[
                "React Native", 
                "MWA",
                "web3.js",
            ]}
    />
</SampleAppCardLayout>




| Name | Description | Technologies |
| ------ | -----------| -----------|
| [example-react-native-app](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-react-native-app) | An example dApp that showcases usage of the MWA Javascript SDK to connect to a wallet, request an airdrop, and write a message to Solana. | React Native, `@solana-mobile/mobile-wallet-adapter-protocol` |
| [example-client-lib-ktx-app](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-clientlib-ktx-app) | An example Kotlin dApp displaying usage of Mobile Wallet Adapter `clientlib-ktx`. | Kotlin, `clientlib-ktx` |
| [example-client-lib-rxjava-app](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/examples/example-clientlib-rxjava-app) | An example Kotlin dApp that showcases usage of the Mobile Wallet Adapter `clientlib-rxjava`. | Kotlin, `clientlib-rxjava` |
|[Kotlin Fake dApp](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakedapp) | An example Kotlin dApp that demonstrates integration with Mobile Wallet Adapter for signing and sending messages/transactions to the Solana Network | Kotlin, `clientlib-ktx` |
| [Minty Fresh](https://github.com/solana-mobile/Minty-fresh) | A full fledged Kotlin Android dApp that enables users to mint NFTs directly from images on your phone  | Kotlin, NFT, `clientlib-ktx` |
| [Fake Wallet App](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakewallet) | A Kotlin wallet app that can be used to test integration with Mobile Wallet Adapter | Kotlin, `walletlib` |




