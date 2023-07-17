# Prepare your dApp for publishing

## Configure the publishing details for your dApp

### 1. Collect your publishing assets

Once everything is setup, collect the file paths for all your publishing assets (e.g., APK file, icons, screenshot images) relative to the directory that was just created.
Some best practices for the assets & files you'll be providing:

- Icon(s) should be 512px by 512px dimensions.
- We recommend screenshot/preview images to be 1080p resolution (1920px by 1080px).
- You may choose portrait or landscape orientation for your images, we only ask that all the images you provide have consistent orientation.
- Make sure your dApp APK is localized properly, and that your build.gradle file identifies the languages & locales that your dApp supports. See [the Android developer documentation](https://developer.android.com/guide/topics/resources/multilingual-support#specify-the-languages-your-app-supports) for more details.

:::warning Important
It is very important that you publish a release build of your Android APK signed with a unique signing key. This key will be used for all releases that you submit to the dApp store, and cannot be shared with releases on a different Android app store. You can learn more about this process [here](https://developer.android.com/studio/publish/app-signing#opt-out).

Apps submitted as debug builds or release builds signed by anything other than a unique key cannot be accepted.
:::

:::tip
It is recommended that you put your dApp publishing files next to your dApp, and source control them together.
:::

### 2. Populate the configuration file

Populate the initial contents of the configuration file created during setup. By default, the file name is `config.yaml`. Replace all fields in `<< >>` with details for your dApp. Remove any fields that don't apply (for e.g., `saga_features`, `google_store_package`, etc).

There are 3 sections to fill out: `publisher`, `app`, and `release`:

- The `publisher` section describes you, the app developer.
- The `app` section represents a single logical app produced by a publisher. A single publisher will always have at least one app, but if you publish multiple different apps under a single identity, there will be one for each of your apps.
- The `release` section is the most important, and describes all the metadata for a single release of an app, including its display name, description, icons, screenshots, etc. The text you enter in the `catalog` subsection, along with the icon and screenshots in the `media` subsections, are what application stores will use to display details about your app to the end user, so be as descriptive as you can.

:::info
Each of the above regions of the configuration file have an `address` field. You do not need to modify this field nor should you remove it from the configuration file.
:::

:::tip
You may need to provide details in the `testing_instructions` field of the configuration file that you would not want published on-chain. Rest assured, this data is not published as part of the on-chain metadata.
:::

### 3. Localization of store details (Optional)

The configuration file allows for localization of the details/copy you provide that describes your app. To be clear, this localized text is different from the strings localized *within your app itself*. Localized store details will be presented to users browsing dApp stores based on the locale they have chosen on their device. If a user's device is set to a locale you have provided, they will be presented that localized text.

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