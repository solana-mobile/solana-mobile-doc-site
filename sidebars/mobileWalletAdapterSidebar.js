// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    mobileWalletAdapterSidebar: [
        {
            type: 'html',
            value: 'Mobile Wallet Adapter',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'mobile-wallet-adapter/overview',
            label: 'Overview'
        },

        /* Client SDKs Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Client SDKs',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'mobile-wallet-adapter/mobile-apps',
            label: 'Mobile SDK'
        },
        {
            type: 'category',
            label: 'Web SDK',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'mobile-wallet-adapter/web-apps',
                    label: 'Overview'
                },
                {
                    type: 'doc',
                    id: 'mobile-wallet-adapter/web-installation',
                    label: 'Installation'
                },
                {
                    type: 'doc',
                    id: 'mobile-wallet-adapter/migrating-to-wallet-standard',
                    label: 'Migrating to Wallet Standard'
                },
            ]
        },

        /* Deep Dive Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Deep Dive',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'mobile-wallet-adapter/diagrams',
            label: 'Diagrams'
        },
        {
            type: 'link',
            href: 'https://solana-mobile.github.io/mobile-wallet-adapter/spec/spec.html',
            label: 'Spec'
        },
      ],
  };