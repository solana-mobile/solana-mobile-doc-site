# Submit your dApp release

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After minting a Publisher and App NFT, you will need to mint a **Release NFT** in order to submit for app review.

A Release NFT:

- Contains metadata that represents a specific release version of an app.
- Should be newly created each time an updated app version is submitted.

For reference, you can view this [sample](https://explorer.solana.com/address/EpYpJpFSKX6r5WyAGjhVk2hN8weeJF9XGJHFMvebBW8Q/metadata) of a Release NFT on the Solana Explorer.

## Mint a release NFT

Using the same wallet that contains your Publisher and App NFTs, run this command to create the Release NFT and upload your app's Android APK.

<Tabs>
<TabItem value="Arweave" label="Arweave">

By default the CLI uploads both the Android APK and NFT metadata using [Arweave](https://www.arweave.org/).

```shell
npx dapp-store create release -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools> [-u <mainnet_beta_rpc_url>]
```

</TabItem>
<TabItem value="Amazon S3" label="Amazon S3">

Alternatively, you can instruct the CLI to upload both the Android APK and NFT metadata using [Amazon S3](https://aws.amazon.com/s3/), by passing in
the `-s` or `--storage-config` flag.

```shell
npx dapp-store create release -k <path_to_your_keypair> -b <path_to_your_android_sdk_build_tools> -s <s3_params> [-u <mainnet_beta_rpc_url>]
```

The `<s3_params>` is are an array of parameters in the expected format:

```
s3Params="[\"s3\", \"$releaseAwsAccessKey\", \"$releaseAwsSecretKey\", \"$releaseAwsS3Bucket\", \"$releaseAwsS3Region\"]"
```

An example of S3 parameters:

```shell
-s "[\"s3\", \"TestAccessKey\", \"TestSecret\", \"TestBucket\", \"us-east-1\"]"
```

</TabItem>
</Tabs>

**You will repeat this step for each new version of your dApp you want to release**. The mint address of the latest release is recorded in your configuration file.

:::tip
When using CLI version >= `0.8.0`, the following commands will submit a Solana transaction that includes a default priority fee of `500000` lamports.

To customize this value, use param `-p` or `--priority-fee-lamports <priority-fee-lamports>`
:::

:::caution
Please make sure your network connection is reliable and has a minimum upload speed of 0.25 megabytes per second.
:::

## Submit your app

After minting a complete set of on-chain NFTs (publisher, dApp, and release), you may choose to submit them to the Solana dApp Publisher Portal, as a candidate for inclusion in the Solana dApp Store catalog.

```shell
npx dapp-store publish submit -k <path_to_your_keypair> -u <mainnet_beta_rpc_url> --requestor-is-authorized --complies-with-solana-dapp-store-policies
```

The two flags for this command (`--requestor-is-authorized` and `--complies-with-solana-dapp-store-policies`) are attestations from the requestor that this dApp is compliant with Solana dApp Store policies, and that they are authorized to submit this request to the Solana dApp Publisher Portal.

After submitting, please check the email address specified in the `publisher` section of your configuration file; you will receive correspondence from the Solana dApp Publisher Portal to that account.

## Wait for a decision on your app

After submitting, we’ll review your app based on our policies. Please make sure to provide a valid email address, so that we can reach out to you with any questions about your submission.
