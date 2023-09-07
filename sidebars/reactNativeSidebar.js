// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    reactNativeSidebar: [
        {
            type: 'html',
            value: 'React Native SDK',
            className: 'react-native sidebar-header',
        },
        {
            type: 'doc',
            id: 'react-native/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'react-native/setup',
            label: 'Setup'
        },
        {
            type: 'doc',
            id: 'react-native/expo',
            label: 'Developing with Expo'
        },
        {
            type: 'doc',
            id: 'react-native/quickstart',
            label: 'Quickstart'
        },

        /* Starter Templates Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Template Apps',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'react-native/react-native-scaffold',
            label: 'React Native dApp Scaffold'
        },
        {
            type: 'doc',
            id: 'react-native/expo-dapp-template',
            label: 'Expo dApp Template'
        },

        /* Guides Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Guides',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'react-native/storing_mwa_auth',
            label: 'Caching MWA authorization'
        },
        {
            type: 'doc',
            id: 'react-native/anchor_integration',
            label: 'Anchor Integration Guide'
        },
        {
            type: 'doc',
            id: 'react-native/metaplex_integration',
            label: 'Metaplex Integration Guide'
        },

        /* Tutorials Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Tutorials',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'react-native/first_app_tutorial',
            label: 'Build your first dApp'
        },
        {
            type: 'doc',
            id: 'react-native/mobile_nft_minter_tutorial',
            label: 'Mobile NFT Photo Minter'
        },

        /* Reference Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Reference',
            className: 'sidebar-section-header',
        },
        {
            type: 'ref',
            id: 'reference/typescript/mobile-wallet-adapter',
            label: 'Mobile Wallet Adapter Reference'
        },
        {
            type: 'link',
            href: '/reference/typescript/web3js',
            label: 'web3.js Reference'
        },
    ]
  };