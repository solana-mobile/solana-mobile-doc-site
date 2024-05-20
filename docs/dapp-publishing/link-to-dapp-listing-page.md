# Linking to your dApp listing page

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The dApp Store provides a deep-linking scheme that you can use to directly link users to your app's listing page, where users can see the description, preview media, and more, and then install the app.

## Deep-link scheme

To create the link, you need to know the app's fully qualified _package name_, which is declared in the app's manifest file (e.g `com.solanamobile.mintyfresh`). For Expo apps, it can be found in the `android` field of your `app.json`.

```
solanadappstore://details?id=<package_name>
```

An example:

```
solanadappstore://details?id=com.solanamobile.mintyfresh
```

## Linking from an Android app

You can also link to your dApp Store listing page from an Android app.

This can be useful, for example, when your user's app is out-of-date and you want to link them to the listing page to update the app.

<Tabs>
<TabItem value="React Native" label="React Native">

```ts
import { Linking } from "react-native";

// Use the React Native `Linking` library to open the URL
const linkToListing = () => {
  const url = "solanadappstore://details?id=com.solanamobile.mintyfresh";
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error("Unable to link to dApp Store");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
```

</TabItem>
<TabItem value="Kotlin" label="Kotlin">

```kotlin
// Create an Android intent to navigate to the listing page
val intent = Intent(Intent.ACTION_VIEW).apply {
    data = Uri.parse("solanadappstore://details?id=com.solanamobile.mintyfresh")
    // Make sure there's an activity that can handle this intent
    resolveActivity(packageManager)?.let {
        startActivity(this)
    }
}
```

</TabItem>
</Tabs>
