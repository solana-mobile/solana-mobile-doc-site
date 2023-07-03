---
title: MWA Kotlin Reference
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CardLayout from "../../../src/layouts/CardLayout";
import CTAButton from "../../../src/components/CTAButton";

Connect to wallet apps and sign transactions and messages with the Mobile Wallet Adapter API.

<CTAButton label="API Reference" to="https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/index.html" />

<br/>

### Install dependencies

- [**`mobile-wallet-adapter-clientlib-ktx`**](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/android/clientlib-ktx)

    - A Kotlin library that provides a [Mobile Wallet Adapter](../../getting-started/overview#mobile-wallet-adapter) client implemented in Kotlin.

Add the library as a dependency in your project's `build.gradle` file:
<Tabs>
<TabItem value="kotlin" label="Kotlin">

```
dependencies {
    implementation 'com.solanamobile:mobile-wallet-adapter-clientlib-ktx:1.0.5'
}
```

</TabItem>
</Tabs>

### Import into a file
```kotlin
import com.solana.mobilewalletadapter.clientlib.*
```

<br/><br/>
