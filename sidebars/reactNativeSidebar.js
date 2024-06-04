// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    reactNativeSidebar: [
        {
            type: 'html',
            value: 'React Native',
            className: 'react-native sidebar-header',
        },
        {
            type: 'doc',
            id: 'react-native/overview',
            label: 'Overview'
        },
        {
            type: 'category',
            label: 'Setup',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'react-native/setup',
                    label: 'React Native'
                },
                {
                    type: 'doc',
                    id: 'react-native/expo',
                    label: 'Expo'
                },
            ]
          },
        {
            type: 'doc',
            id: 'react-native/quickstart',
            label: 'Quickstart'
        },

        /* Development Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Core SDK Guides',
            className: 'sidebar-section-header',
        },
        {
            type: 'category',
            label: '@solana/web3.js',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'react-native/making_rpc_requests',
                    label: 'Make RPC requests'
                },
                {
                    type: 'doc',
                    id: 'react-native/building_transactions',
                    label: 'Build Solana transactions'
                },
            ]
        },
        {
            type: 'category',
            label: 'Mobile Wallet Adapter',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'react-native/using_mobile_wallet_adapter',
                    label: 'Connect to wallets and request signing'
                },
                {
                    type: 'doc',
                    id: 'react-native/storing_mwa_auth',
                    label: 'Cache wallet authorization'
                },
            ]
        },
        

        /* Additional Guides Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Additional Guides',
            className: 'sidebar-section-header',
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

        /* Polyfill Guides Section */
        {
            type: 'category',
            label: 'Polyfills Reference',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/polyfills',
                    label: 'Overview'
                },
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/web3-js',
                    label: 'web3.js'
                },
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/spl-token',
                    label: 'spl-token'
                },
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/anchor',
                    label: 'Anchor'
                },
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/polyfills',
                    label: 'Metaplex'
                },
                {
                    type: 'doc',
                    id: 'react-native/polyfill-guides/polyfills',
                    label: 'Metaplex: Umi'
                },
            ]
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
            type: 'link',
            href: 'https://github.com/solana-mobile/solana-mobile-dapp-scaffold',
            label: 'React Native dApp Scaffold'
        },
        {
            type: 'link',
            href: 'https://github.com/solana-mobile/solana-mobile-expo-template',
            label: 'Expo dApp Template'
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