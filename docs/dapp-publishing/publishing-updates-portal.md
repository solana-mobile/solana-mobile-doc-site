# Submit an Update

When you're ready to publish an updated release of your dApp, follow these steps.

## 1. Create an updated APK file

Each release of your dApp will require an updated release APK file, signed with the same signing key you used for your initial release.

It is **very** important that each new APK file include the following updates:

- The `versionName` value in `build.gradle` must be updated from the previous release. This field can be set to arbitrary values.
- The `versionCode` value in `build.gradle` must be incremented by one monotonically between each update.

:::tip
You can learn more about APK versioning in the [Android developer docs](https://developer.android.com/studio/publish/versioning).
:::

## 2. Navigate to the Publisher Portal

Log into the [Solana dApp Publisher Portal](https://dapp-portal.solanamobile.com) and navigate to your published app.

## 3. Submit your update

Upload your updated APK file and fill in the release details, including:

- Version information (`versionName` and `versionCode`)
- Release notes and "What's new" description
- Any updated screenshots or media (if applicable)

:::tip
Be sure to include detailed release notes so users can know what to expect with the update!
:::

## 4. Review and Submit

Review your submission details and submit the update. The new release will enter a review queue for inclusion in the dApp store catalog.

By submitting your update, you agree to, and represent that you have read, (i) the [Solana Mobile dApp Store Developer Agreement](https://docs.solanamobile.com/dapp-publishing/agreement), including the arbitration clause linked [here](https://docs.solanamobile.com/dapp-publishing/agreement#:~:text=force%20and%20effect.-,16.6.%20Arbitration.,-The%20parties%20agree), meaning that, where enforceable, any dispute related to the dApp Store will be resolved through BINDING ARBITRATION on an individual, non-class basis, and (ii) the [Solana Mobile Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy).

