# Prepare your dApp for publishing

To prepare for publishing, you must
1. Collect your publishing assets into a folder
2. Build and sign your Android APK
3. Populate the `config.yaml`

It is recommended that you colocate app publishing files with your dApp and source control them together.

## Example

For reference, view these two apps with dApp Store Publishing Repos:
- [Solana Mobile Example Repo](https://github.com/solana-mobile/dapp-publishing/tree/main/example)
- [Gem Wallet Open Source Repo](https://github.com/gemwalletcom/solana-mobile-publishing/blob/main/config.yaml)

## 1. Collect publishing assets

Once your publishing folder is initialized, place your publishing assets (e.g., APK file, icons, screenshot images, videos) in a sub-folder (e.g `/media`, `/files`).

### Asset Requirements

Your submission must meet the following requirements to pass app review:

- **Icon(s)** must be 512px by 512px dimensions.
  - Follow the [Google Play icon design spec](https://developer.android.com/distribute/google-play/resources/icon-design-specifications) for best practices.
- **Banner Graphic** image of size 1200px by 600px is required.
- (optional) **Feature Graphic** image of size 1200x1200px is required to be featured in Editor's choice carousel
- Provide a minimum of **4 screenshot images or videos** of your app.
  - We recommend preview images and videos to be 1080p resolution (1920px by 1080px).
- Image Requirements
  - All images provided must be at least 1080px in width and height.
  - All images provided must have consistent orientation (landscape or portrait).
  - All images provided must have equal aspect ratio.
- Videos Requirements
  - All videos provided must be at least 720px in width and height.
  - All videos provided must be `.mp4` video file format.
      - If you have `.mp4` videos included, make sure you have `ffmpeg` utility library [installed](/dapp-publishing/setup#ffmpeg).
- A release build of your **Android APK** signed with a unique signing key.


## 2. Build and sign your APK

To submit your app, you will need to include an APK.

It must be:
- A release build version of your APK. Debug builds cannot be accepted. 
- Signed with a new [signing key](https://developer.android.com/studio/publish/app-signing#opt-out) solely for the dApp Store. If signed by an existing Google Play Store signing key, the app cannot be accepted.

If you're publishing an Expo app, view this [APK building and signing guide](/dapp-publishing/building-expo-apk). 

#### Recommendations
- [Securely store](https://developer.android.com/studio/publish/app-signing#secure_key) your signing key. It is required to make future updates to your app and if lost you cannot make updates to the app.
- Ensure your APK is localized properly, and that your `build.gradle` file identifies the languages & locales that your dApp supports. See [the Android developer documentation](https://developer.android.com/guide/topics/resources/multilingual-support#specify-the-languages-your-app-supports) for more details.

## 3. Populate the configuration file

When you initialized the publishing repo, a `config.yaml` will have been generated. This is what the CLI will read to create your app listing page.

For this step, you must edit the configuration file with your app details and asset file paths.

Instructions:
1. Replace all fields in `<< >>` with your app details.
2. Remove any fields that don't apply (for e.g., `saga_features`, `google_store_package`, etc).
3. Do **not** modify or remove the `address` fields. These will be automatically populated by the CLI in later steps.
4. You may need to provide details in the `testing_instructions` field of the configuration file that you would not want published on-chain (e.g `test_username` and `test_password`). Rest assured, this data is not published as part of the on-chain metadata.

:::tip Reference
For a reference of a completed configuration file, view the two open source examples:
- [Solana Mobile Example Repo](https://github.com/solana-mobile/dapp-publishing/tree/main/example)
- [Gem Wallet Open Source Repo](https://github.com/gemwalletcom/solana-mobile-publishing/blob/main/config.yaml)
:::

<details>
<summary>Publishing Config Explanation</summary>

There are 3 sections to fill out: `publisher`, `app`, and `release`:

- The `publisher` section describes you, the app developer.
- The `app` section represents a single logical app produced by a publisher. A single publisher will always have at least one app, but if you publish multiple different apps under a single identity, there will be one for each of your apps.
- The `release` section is the most important, and describes all the metadata for a single release of an app, including its display name, description, icons, screenshots, etc. The text you enter in the `catalog` subsection, along with the icon and screenshots in the `media` subsections, are what application stores will use to display details about your app to the end user, so be as descriptive as you can.

</details>

### Localization of store details (Optional)

The configuration file allows for localization of the details/copy you provide that describes your app. To be clear, this localized text is different from the strings localized _within your app itself_. Localized store details will be presented to users browsing dApp stores based on the locale they have chosen on their device. If a user's device is set to a locale you have provided, they will be presented that localized text.

As a tangible example, here's how you would localize details strings for French (France). This would be placed at the same hierarchical level alongside the default `en-US` locale text:

```yaml
release:
    catalog:
        en-US:
          name: Name of app in English
          ...
        fr-FR:
            name: >-
              Name of app in French (France)
            short_description: >-
              Short app description in French (France)
            long_description: |
              Long app description in French (France)
            new_in_version: >-
              New version features in French (France)
            saga_features: >-
              Saga features in French (France)
```
