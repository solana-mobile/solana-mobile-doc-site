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
            id: 'react-native/quickstart',
            label: 'Quickstart'
        },
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
            id: 'react-native/expo',
            label: 'Developing with Expo'
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