import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Android dApp Setup

## Android Project Setup

### Prerequisites

- Download [Android Studio](https://developer.android.com/studio) for development and device management.

- Follow the [prerequisite setup](../getting-started/development-setup#prerequisite-setup) guide to set up your [Android Device/Emulator](../getting-started/development-setup#2-setup-deviceemulator) and install a MWA-compatible wallet, like [fakewallet](../getting-started/development-setup#3-install-a-wallet-app).


### Setting up an Android Project 

Follow these steps to install the Mobile Wallet Adapter library into a new or existing Android project.

#### Step 1: Navigate to your Android project's build.gradle file
In Android Studio, navigate to your Android project's module `build.gradle` file.

#### Step 2. Add MWA dependencies
The Mobile Wallet Adapter SDK is hosted on [Maven repository](https://mvnrepository.com/artifact/com.solanamobile/mobile-wallet-adapter-clientlib), so you just need to add the appropriate library to the dependencies section in your `build.gradle:

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```language-kotlin
dependencies {
    // other dependencies here
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib-ktx:1.0.5'
}
```

</TabItem>
<TabItem value="java" label="Java">


```groovy
dependencies {
    // other dependencies here
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib:1.0.5'
}
```

</TabItem>
</Tabs>

#### Step 3. Build and run your app

Your project's dependencies should be set up and you can try building and run the app!

## Next Steps

Congrats! At this point, you have installed the Mobile Wallet Adapter SDK into your project and are ready to start building to interact with the Solana network.

To learn more about how to integrate Mobile Wallet Adapter into your Android Native app, you can reference our [Kotlin sample dApp](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/fakedapp/src/main/java/com/solana/mobilewalletadapter/fakedapp).