# Publishing a Progressive Web App (PWA)

## PWAs on the dApp Store

[Progressive Web Apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) are web applications that use modern web capabilities to deliver an app-like experience to users.

They offer several advantages:

- Work across all devices and platforms
- Provide offline functionality
- Stays up to date with

PWAs can be published on the dApp Store, as an Android app wrapped within a **Trusted Web Activity (TWA)**.

## Trusted Web Activities (TWAs)

[Trusted Web Activities (TWAs)](https://developer.chrome.com/docs/android/trusted-web-activity) allow you to package your PWA into an Android app. TWAs use Chrome to render the web app, providing a full screen, native-like experience without any browser UI.

Once you create a TWA, you will have an Android APK file and you can follow the dApp publishing guide to submit the app.

Follow the guide below to get your PWA ready for the dApp Store.

## Tutorial: Converting a PWA to an Android App

This guide shows you how to:

- Install the Bubblewrap CLI tool
- Build the TWA and output an APK
- Generate the Digital Asset Link for the APK

By the end, you will have a functional, signed release APK that can be published on the dApp Store!

### Prequisites

- A functional, hosted PWA with a [web manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

If missing an existing web manifest, you can follow this [resource](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/web-app-manifests) to create one for your website.

### Using Bubblewrap CLI

[Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli) is a tool that simplifies the process of converting your PWA into an Android app using TWA.

#### 1. Installing Bubblewrap CLI

Requires Node 14.15.0 and above

```bash
npm i -g @bubblewrap/cli
```

#### 2. Initializing Your Project

In a new directory, run the `init` command and supply the URL to your web manifest.
Bubblewrap will use the existing manifest to help fill in metadata for the TWA's manifest.

```bash
bubblewrap init --manifest https://your-pwa-url.com/manifest.json
```

This command will guide you through the process of creating the TWA manifest and setting up the project.

- If it asks to install additional tooling (e.g Android SDK, JDK, or build tools), you should allow it to install.

#### 3. Building the Android APK

Now in the same directory run:

```bash
bubblewrap build
```

This command builds the initialized TWA project and outputs a _signed release APK_. This APK
is what you will be submitting for publishing on the dApp Store.

- If it asks to install additional tooling (e.g Android SDK, JDK, or build tools), you should allow it to install.

:::caution

The `build` command will ask you to generate an Android Keystore and password.

- The [Android Keystore](https://developer.android.com/privacy-and-security/keystore) is a security tool that verifies you as the developer and ensures secure app updates.

Keep the Keystore file and password secure – losing them can prevent future app updates.

:::

#### 4. Publish Digital Asset Links

The last step is to declare your app's [Digital Asset Links (DAL)](https://developers.google.com/digital-asset-links/v1/getting-started). DALs establish a secure connection between your website and the Android app.

:::tip

This step is **required** for the PWA to display in a full screen, native-like experience. If missing, the PWA will display
Chrome browser UI (e.g the URL bar).

:::

Declare the connection by adding the SHA256 fingerprints of your app’s signing certificate at `https://your-domain.com/.well-known/assetlinks.json`.

1. Generate the SHA256 fingerprint from the Keystore:

```bash
keytool -list -v -keystore android.keystore
```

2. Add the fingerprint to your TWA manifest:

```bash
bubblewrap fingerprint add <SHA256_fingerprint>
```

3. Generate the DAL `assetlinks.json` file:

```bash
bubblewrap fingerprint generateAssetLinks
```

4. Publish the generated `assetlinks.json` file at:
   `https://your-domain.com/.well-known/assetlinks.json`

Congrats! You have successfully converted your PWA into a working Android app.

## Testing Your App

If you have an emulator or testing device ready, you can install the APK with:

```bash
bubblewrwap install app-release-signed.apk
```

Ensure the app is working as expected before submitting to the dApp Store.

:::tip

If you are seeing the browser navigation bar at the top of the app, your Digital Asset Links might not be correctly
published.

Double check that you followed Step 4 and have correctly published your app's SHA256 fingerprint.

:::

## Publishing to dApp Store

Once you have your signed APK, you can proceed with publishing as if you were publishing a normal
Android app.

Follow the step by step [dApp publishing guide](/dapp-publishing/overview) to submit your signed release APK.
