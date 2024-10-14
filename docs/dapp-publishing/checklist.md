# Publishing Journey Checklist

import Diagram from '@site/src/components/Diagram';

This checklist aims to provide you a high level overview of the dApp publishing process. You can get
an idea of the resources you'll need to prepare before submitting your app.

## Publishing Journey

At a high level, the publishing process can be simplified into these steps:

<Diagram src="/diagrams/publishingflow.svg" alt="Publishing Flow Diagram" width={900} height={500} />

### Build an Android APK

The dApp Publishing tool requires you to submit an Android APK of your app.

- If you already have an Android app (e.g Published to google play), you can generate a release build APK.
- If you have a web app, follow [this guide](/dapp-publishing/publishing-a-pwa) to convert it to an Android app and generate an APK for submission.

:::important

Ensure you are submitting a release build of your app that is [signed](https://developer.android.com/studio/publish/app-signing#opt-out). Debug builds will not be accepted.

:::

### Test on an Android device

To ensure a great user experience, we recommend developers to thoroughly test their app to catch any bugs/crashes/issues.

You do not need a Seeker or Saga to test your app, you can just test against a comparable Android device or emulator.

- If using Mobile Wallet Adapter, test your app's connect and signing flows with popular MWA wallets like Phantom and Solflare.
- If your app content is gated (e.g beta access, NFT-gated), prepare a test account with full access for App Review.

### Prepare your App Listing Page

Your app's listing page is what gives users the first impression of your app. You'll want to prepare ahead of time, assets like
your app icon, screenshots/videos, and text content.

See the [Listing Page guidelines](/dapp-publishing/listing-page-guidelines) to visualize your app's listing page and learn best practices.

### Proceed to Publishing!

Once you are ready for publishing, you can follow the step-by-step App Submission guide to submit your app. The publishing process
is completely self service, so it can be started whenever you are ready!

After finished, your app will be in queue for App Review and, using your provided contact details, we will reach out to if any questions are needed.

### App Promotion

For questions regarding promoting your app after launching, see our [Marketing & Partnership documentation](/marketing/overview).
