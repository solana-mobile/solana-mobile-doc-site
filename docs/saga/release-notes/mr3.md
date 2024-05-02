# Solana Saga MR3 Release Notes

This update includes all changes and features through UKQ1.231121.127 — encapsulating what we call the “MR3” update. The on-device changelog for this update is provided, and more detailed information regarding individual additions and improvements is described further below.

## Updates Overview

#### 🚀 Android 14
- New customization options
- Improved data access permissions
- Health Connect fitness data integration
- Improved accessibility features
- Lock screen shortcuts
- Ability to disable lock screen keypad tap animations

#### 📶 Carrier
- VoLTE enabled for Telus (Canada)
- VoLTE enabled for KPN (Netherlands)

#### 🔐 Security
- Updated to Android January, February & March 2024 patches

#### 💙 Bluetooth
- Updated Bluetooth stack (bug fixes, security fixes)

#### 📷 Camera
- Support for Camera Privacy Toggle to disable camera access from the Quick Settings

#### 📺 Display
- Updated tuning for Android Adaptive Brightness: Your device will now be brighter in more conditions
- Updated tuning for Smooth Display: Dynamic refresh rate accounts for sunlight conditions to improve battery life and performance

#### 🏎️ System & Performance
- General stability & bug fixes
- Updated [dApp Store Terms Of Use](https://solanamobile.com/dapp-store-tos)

## Security

The MR3 update includes all security patches and changes described in the January, February, and March 2024 Android Security Bulletins, including patches that address discovered security vulnerabilities in Android and other components of the OS. We urge you to update as soon as it is practical.

## Android 14

The latest version of the Android operating system is included in the MR3 update, which brings Android 14 to the Solana Saga. [Google has a detailed landing page](https://www.android.com/android-14/) that describes features included in the latest OS update (some of which only apply to the company’s own Pixel phones).

Feature highlights for this release include additional customization options like a lock screen clock customizer and new theming options for Google’s popular Material You interface, allowing you to dress up your Saga in new ways.

There are new permission options that allow for more granular access to photos and videos. When granting location permissions to apps, you can also see if that app’s privacy policies include sharing that location with third parties based on information supplied by the developer in the Google Play Store, giving you enhanced context for granting consent.

New Health Connect system-level integrations allow for things like wearables or fitness apps to better manage and synchronize related data. Other changes include new lock screen shortcuts, privacy options for the keyguard, and more. Android application developers can take advantage of new tools and API changes offered in this release as well.

## Display & Camera

MR3 adds improvements to automatic brightness performance that should allow for your Saga to reach a higher peak brightness. Paired with changes to how the system adjusts refresh rate, your Saga running MR3 will use less power to reach the same brightness levels in more situations, like direct sunlight.

Application access to the camera can be disabled in MR3 through an easily added shortcut for enhanced privacy and security.

## Performance & Other Changes

MR3 includes countless small changes and bug fixes that should improve performance. VoLTE support for more providers has been added. Security and bug fixes for Bluetooth should improve the functionality of connected devices.

## Factory Image

These files are for use only on your personal Saga device and may not be disassembled, decompiled, reverse engineered, modified or redistributed by you or used in any way except as specifically set forth in the license terms that came with your device.

Downloading of the system image and use of the device software is subject to Solana Mobile's [Terms of Service](https://solanamobile.com/tos). By continuing, you agree to Solana Mobile's [Terms of Service](https://solanamobile.com/tos) and [Privacy Policy](https://solanamobile.com/privacy-policy). Your downloading of the system image and use of the device software may also be subject to certain third-party terms of service, which can be found in Settings > About phone > Legal information, or as otherwise provided.

[MR3 (UKQ1.231121.127)](https://saga-images.s3.amazonaws.com/saga_global_fastboot_UKQ1.231121.127.zip)
_(SHA-256 checksum: e6e788413eb8a2b1b38ef2bda2be1b150a4b01f935423e5c9e4081f4abe44b5e)_

[Kernel sources](https://github.com/osomprivacy)

NOTE: These images are not compatible with Saga dev kits (a.k.a. DVT-1). Flashing this image to a Saga dev kit will result in a non-functional and non-recoverable device.
