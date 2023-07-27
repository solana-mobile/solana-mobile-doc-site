// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    androidNativeSidebar: [
        {
            type: 'html',
            value: 'Android SDK',
            className: 'android-native sidebar-header',
        },
        {
            type: 'doc',
            id: 'android-native/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'android-native/setup',
            label: 'Setup'
        },
        {
            type: 'doc',
            id: 'android-native/quickstart',
            label: 'Quickstart'
        },
        {
            type: 'link',
            href: 'https://www.javadoc.io/doc/com.solanamobile/mobile-wallet-adapter-clientlib-ktx/latest/index.html',
            label: 'Kotlin MWA reference'
        },
    ]  
  };