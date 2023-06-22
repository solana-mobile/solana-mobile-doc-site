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