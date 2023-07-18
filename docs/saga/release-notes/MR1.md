
# Solana Saga MR1 Release Notes

This update includes changes from the originally released TKQ1.221220.242 build through to the current TKQ1.221220.425 — encapsulating what we call the “MR1” update. The on-device changelog for this update is provided, and more detailed information regarding individual additions and improvements is described further below. 

## Updates Overview

#### 🔒 Security
- Update to Android May 2023 security patch

#### 📸 Camera
- Improvements in processing, HDR, EIS, OIS, and night mode
- New Panoramic, Document, and Timelapse modes
- Stability and performance improvements

#### 🌱 Seed Vault
- Fixes Seed Vault occasionally failing to start
- Adds button to reveal the passcode during entry
- Accessibility and localization improvements
- Fixes for various minor bugs

#### 🏎️ System & Performance
- Improves display color calibration
- New optional Notification LED
- Fastboot recovery mode defaults to recovery menu
- Improves thermal management
- Improves fingerprint sensor performance
- Improves idle battery life
- Telephony updates and carrier-specific improvements

## Security
The MR1 update includes changes described in the [May 2023 Android Security Bulletin](https://source.android.com/docs/security/bulletin/2023-05-01), including patches that address discovered security vulnerabilities in Android and other components of the OS. 

## Camera
Saga’s camera has been augmented in MR1 to include new and re-tuned processing algorithms. These adjustments change how exposure is handled in certain bright scenes, as well as overall noise control, rendition, and tone for all cameras. 

Night mode performance has been adjusted with a new exposure table and improvements to address color casts in certain scenes. Portrait mode’s foreground/background segmentation has also been improved, as has HDR noise control in shadows, as well as EIS and OIS performance. 

<p float="left">
  <img src="/saga_release_imgs/image4.jpg" alt="Saga Photo 1" width="33%" style={{width: '33%', padding: '1%'}}/>
  <img src="/saga_release_imgs/image5.jpg" alt="Saga Photo 2" width="33%" style={{width: '33%', padding: '1%'}}/> 
  <img src="/saga_release_imgs/image2.jpg" alt="Saga Photo 3" width="33%" style={{width: '33%', padding: '1%'}}/>
</p>


The camera app itself has also been adjusted to improve the performance of our Smart Framing feature, expanding out when your face is closer to the camera. Three new camera modes have been added for additional use cases as well:

- Panoramic mode for stitching together a wider view.
- Document mode for capturing papers, receipts, and other static text-based media.
- Timelapse mode for making short animations of longer periods of time.

## Seed Vault
The Seed Vault system in Saga has been updated with a new “peek” function that hides your passcode during entry when keys are not being pressed, enhancing user security by making it more difficult to observe the combination as it is entered. There is also a new informational message which will appear to explain when you have exited Seed Vault’s Trusted UI due to inactivity, as well as other bugfixes for seed recovery. 

  <img src="/saga_release_imgs/image1.jpg" alt="Seed Vault Photo" />

The setup wizard flow for Seed Vault has also been updated, and there are new translations available. 

## System & Performance
MR1 brings Saga a new display calibration profile with increased color accuracy. The optional notification LED built into Saga can now be enabled, providing a screen-off indication of alerts at a glance. 

  <img src="/saga_release_imgs/image3.jpg" alt="Seed Vault Photo" />

The fingerprint sensor’s performance during enrollment has been improved, as has idle/standby battery life and general thermal management. Carrier-specific improvements for Verizon and AT&T are also present. Lastly, Saga’s fastboot recovery mode now defaults to the recovery menu. 

