# Publishing Tools Setup

## Prerequisites

### Node.js

Please run all CLI tooling with Node version 18 or greater.

```shell
corepack enable
corepack prepare pnpm@`npm info pnpm --json | jq -r .version` --activate
```

If you don't have [jq](https://stedolan.github.io/jq/) installed, you can [install it](https://formulae.brew.sh/formula/jq), or manually get the current version of pnpm with `npm info pnpm` and use like this:

```shell
corepack prepare pnpm@7.13.4 --activate
```

### Android SDK Tools

You must have the Android SDK build tools available for use by the `dapp-store` CLI. If you have Android Studio, these tools are available as part of that installation (for e.g., on MacOS, they can be found in ~/Library/Android/sdk/build-tools/{version}). If you do not have Android Studio installed, or wish to use a standalone version of the Android SDK build tools, please follow the instructions [here](https://developer.android.com/studio/intro/update#sdk-manager).

The path to the SDK build tools can be provided either directly to subcommands that require it with the `-b` option, or indirectly via a `.env` file. Please provide a path to a specific, recent version of the SDK tools (e.g., `~/Library/Android/sdk/build-tools/33.0.0`) as older versions do not have the requisite dependency:

```shell
echo "ANDROID_TOOLS_DIR=\"<path_to_android_sdk_version_build_tools_dir>\"" > .env
```

### Java Environment Variable

Some utilities in the Android tools directory require you to configure and make a `JAVA_HOME` environment variable available to your terminal app. This variable points to the root directory of your installed Java Development Kit, or JDK. If you have Android studio installed, there is already a JDK included (in recent versions of Android Studio this is called the "JBR").

To find the location of the JDK/JBR installed with Android Studio, follow [these instructions in the Android Studio documentation.](https://developer.android.com/build/jdks#set-jdk-in-studio). While discussing the mthod for *_setting_* the JDK location, it also provides the correct method for obtaining the current installation directory.

If you do not have Android Studio installed, you can download a copy of the the OpenJDK [here](https://openjdk.org/projects/jdk/17/). We recommend OpenJDK 17.

Once you have downloaded and installed the JDK, you will need to set the `JAVA_HOME` environment variable per the appropriate method for your operating system. [This page](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html) has a good overview for all major operating systems.

## Getting Started

In your application folder (e.g., `android-app`):

```shell
mkdir publishing
cd publishing

pnpm init
pnpm install --save-dev @solana-mobile/dapp-store-cli
npx dapp-store init
npx dapp-store --help
```

## CLI Updates

The CLI will automatically check for updated versions on npm and restrict operations on a periodic basis. If your CI/CD deployments fail, be sure to check if there is a required update.