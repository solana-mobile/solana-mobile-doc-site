# Publishing an existing Expo (React Native) app to Solana Mobile dApp Store

If you have a React Native app built with Expo, just a few steps are needed to publish it on the Solana Mobile dApp Store.

This guide assumes minimal experience with typical Android development tools.

## Step 1. Build an APK

By default, when building with EAS, the platform compiles an Android App Bundle (.aab) file. Solana Mobile dApp Store requires a different binary format, APK, so we'll create a new EAS profile by adding the following lines in `eas.json`:

```
"solana": {
    "channel": "production",
    "android": {
        "buildType": "apk"
    }
}
```

Then build:

```
npx eas build -p android --profile solana
```

Meanwhile, in your project directory, create a new folder `solana-build` (if you're using Git you may want to add this folder to `.gitignore` to avoid uploading large binary files).

Once the EAS build has finished, download the APK file, and name it `myapp-0.0.1-unsigned.apk`. Replace `myapp` and `0.0.1` with your app name and release version, but keep file naming consistent between updates.

## Step 2. Set up Java and Android tooling

You will need to download and install:

- JDK: https://www.oracle.com/java/technologies/downloads/
- Android Studio: https://developer.android.com/studio

Once Android Studio is installed, you need to create an empty project. Then, open Settings > Languages & Frameworks > Android SDK.

Switch to SDK Tools tab and check if you have Android SDK Command-line tools installed.

A tool named AAPT2 (Android Asset Packaging Tool) may be missing from Android Studio, and you may have to install it separately:

```
sdkmanager "build-tools;build-tools-version"
```

`build-tools-version` should be replaced with the latest version from the release page: https://developer.android.com/tools/releases/build-tools

For example:

```
sdkmanager "build-tools;34.0.0"
```

Alternatively, use a full path on Mac:

```
~/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager "build-tools;34.0.0"
```

## Step 3. Sign the APK

In your project directory, create a new folder `solana-keys` (if you're using Git you may want to add this folder to `.gitignore` to avoid exposing signing keys).

Open the folder `solana-keys` and run the following command (edit as needed) to create a keystore used for signing the app.

```
keytool -genkey -v -keystore release-key.keystore -alias myapp -keyalg RSA -keysize 2048 -validity 50000
```

In this command you need to change the values:

- `myapp`: unique name (alias) that identifies your app or project
- `50000`: key validity in days; you may want to reduce it

Open your project directory, and run the following command:

```
~/Library/Android/sdk/build-tools/35.0.0/apksigner sign \
    --ks ./solana-keys/release-key.keystore \
    --ks-key-alias myapp \
    --out ./solana-build/myapp-v0.0.1-signed.apk \
    ./solana-build/myapp-v0.0.1-unsigned.apk
```

The signed binary will be at `solana-build/myapp-v0.0.1-signed.apk`. This is the file you'll need to reference in `config.yaml` at the publishing stage.

## Publishing to dApp Store

Now that you have signed APK, you are ready to follow the [dApp publishing guide](/dapp-publishing/overview) to submit your app to Solana Mobile dApp Store.