# Publishing subsequent dApp releases

When you're ready to publish additional releases of your dApp, follow these steps.

## 1. Create an updated APK file

Each release of your dApp will require an updated release APK file, signed with the same signing key you used for your initial release.

It is **very** important that each new APK file include the following updates:

- The `versionName` value in `build.gradle` must be updated from the previous release. This field can be set to arbitrary values.
- The `versionCode` value in `build.gradle` must be incremented by one monotonically between each update.

:::tip
You can learn more about APK versioning in the [Android developer docs](https://developer.android.com/studio/publish/versioning).
:::

## 2. Update your configuration file

Edit the `release` and `solana_mobile_dapp_publisher_portal` sections of your configuration file to reflect any changes.

:::tip
Be sure to include `new_in_version` details so users can know what to expect with the update!
:::

## 3. Mint a new release NFT

The Solana dApp store requires each new release of your dApp to be minted as a release NFT with all the changes discussed in this section.

Run the same CLI command as the "Create the release NFT" step from the [Mint your NFTs](submit#mint-your-nfts) section in these docs.

## 4. Submit an update to the Publisher Portal

Submit the update to the Solana dApp Publisher Portal, where the new release will enter a review queue for inclusion in the dApp store catalog:

```
npx dapp-store publish update -k <path_to_your_keypair> --requestor-is-authorized --complies-with-solana-dapp-store-policies
```
