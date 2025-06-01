// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    developersSidebar: [
        {
          type: 'html',
          value: 'Getting Started',
          className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'developers/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'developers/development-setup',
            label: 'Development Setup'
        },

        /* Solana Mobile Stack Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Solana Mobile Stack',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'dapp-publishing/intro',
            label: 'dApp Store'
        },
        {
            type: 'doc',
            id: 'mobile-wallet-adapter/overview',
            label: 'Mobile Wallet Adapter'
        },
        {
            type: 'doc',
            id: 'developers/seed-vault',
            label: 'Seed Vault'
        },

        /* SDKs Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Development Guides',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'react-native/overview',
            label: 'React Native'
        },
        {
            type: 'doc',
            id: 'android-native/overview',
            label: 'Kotlin'
        },

        {
            type: 'category',
            label: 'Community SDKs',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'flutter/overview',
                    label: 'Flutter'
                },
                {
                    type: 'doc',
                    id: 'unity/unity_sdk',
                    label: 'Unity'
                },
                {
                    type: 'doc',
                    id: 'unreal/unreal_sdk',
                    label: 'Unreal'
                },
            ]
        },

        /* Resources Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Resources',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'sample-apps/sample_app_overview',
            label: 'Sample Applications'
        },
        {
            type: 'doc',
            id: 'reference/overview',
            label: 'Client Library Reference'
        },
        {
            type: 'doc',
            id: 'developers/community',
            label: 'Community'
        },
      ],
  };