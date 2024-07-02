# Prepare your dApp for publishing

## Configure the publishing details for your dApp

### 1. Collect your publishing assets

:::tip Reference
View the [dApp Publishing Example repo](https://github.com/solana-mobile/dapp-publishing/tree/main/example) for a reference of the assets and configuration file required for publishing.
:::

Once everything is setup, collect the file paths for all your publishing assets (e.g., APK file, icons, screenshot images, videos) relative to the directory that was just created.

#### Requirements

Your submission must meet the following requirements to pass app review:

- Icon(s) must be 512px by 512px dimensions.
  - Follow the [Google Play icon design spec](https://developer.android.com/distribute/google-play/resources/icon-design-specifications) for best practices.
- Provide a minimum of 4 screenshot images or videos of your app.
  - We recommend preview images and videos to be 1080p resolution (1920px by 1080px).
- Image Requirements
  - All images provided must be at least 1080px in width and height.
  - All images provided must have consistent orientation (landscape or portrait).
  - All images provided must have equal aspect ratio.
- Videos Requirements

  - All videos provided must be at least 720px in width and height.
  - All videos provided must be `.mp4` video file format.

    :::info
    If you have `.mp4` video assets in your publishing, make sure you have `ffmpeg` utility library [installed](/dapp-publishing/setup#ffmpeg).
    :::

- A release build of your Android APK signed with a unique signing key.

:::warning Important
It is very important that you publish a release build of your Android APK signed with a unique signing key. This key will be used for all releases that you submit to the dApp store, and cannot be shared with releases on a different Android app store. You can learn more about this process [here](https://developer.android.com/studio/publish/app-signing#opt-out).

Apps submitted as debug builds or release builds signed by anything other than a unique key cannot be accepted.
:::

#### Recommendations

Some best practices for the assets & files you'll be providing:

- Make sure your dApp APK is localized properly, and that your build.gradle file identifies the languages & locales that your dApp supports. See [the Android developer documentation](https://developer.android.com/guide/topics/resources/multilingual-support#specify-the-languages-your-app-supports) for more details.

:::tip
It is recommended that you put your dApp publishing files next to your dApp, and source control them together.
:::

### 2. Populate the configuration file

Populate the initial contents of the configuration file created during setup. By default, the file name is `config.yaml`. Replace all fields in `<< >>` with details for your dApp. Remove any fields that don't apply (for e.g., `saga_features`, `google_store_package`, etc).

There are 3 sections to fill out: `publisher`, `app`, and `release`:

- The `publisher` section describes you, the app developer.
- The `app` section represents a single logical app produced by a publisher. A single publisher will always have at least one app, but if you publish multiple different apps under a single identity, there will be one for each of your apps.
- The `release` section is the most important, and describes all the metadata for a single release of an app, including its display name, description, icons, screenshots, etc. The text you enter in the `catalog` subsection, along with the icon and screenshots in the `media` subsections, are what application stores will use to display details about your app to the end user, so be as descriptive as you can.

:::tip Reference
View the [dApp Publishing Example repo](https://github.com/solana-mobile/dapp-publishing/blob/main/example/config.yaml) for a reference of a completed configuration file.
:::

:::info
Each of the above regions of the configuration file have an `address` field. You do not need to modify this field nor should you remove it from the configuration file.
:::

:::tip
You may need to provide details in the `testing_instructions` field of the configuration file that you would not want published on-chain. Rest assured, this data is not published as part of the on-chain metadata.
:::

### 3. Localization of store details (Optional)

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
