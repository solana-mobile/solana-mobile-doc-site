# Publishing subsequent dApp releases

Publishing subsequent releases of your dApp to the Solana dApp Store involves the following steps:

## 1. Create an updated APK file

Each release of your dApp will require an updated APK file. It is important that each new APK file include the following updates:

- The `versionName` value in `build.gradle` must be updated from the previou release. This field can be set to arbitrary values.
- The `versionCode` value in `build.gradle` must be incremented by one monotonically between each update.

You can learn more about APK versioning in the [Android developer docs](https://developer.android.com/studio/publish/versioning).

## 2. Update your configuration file

Edit the `release` and `solana_mobile_dapp_publisher_portal` sections of your configuration file to reflect any changes. Be sure to include `new_in_version` details so users can know what to expect with the update!

## 3. Mint a new release NFT

The Solana dApp store requires each new release of your dApp to be minted as a release NFT with all the changes discussed in this section.

Run the same CLI command as the "Create the release NFT" step from the [Mint the NFTs](#mint-the-nfts) section in this documentation.

## 4. Submit an update to the Publisher Portal

Submit the update to the Solana dApp Publisher Portal, where the new release will enter a review queue for inclusion in the dApp store catalog. Use the following command:

   ```
   npx dapp-store publish update -k <path_to_your_keypair> -u <mainnet_beta_rpc_url> --requestor-is-authorized --complies-with-solana-dapp-store-policies
   ```
