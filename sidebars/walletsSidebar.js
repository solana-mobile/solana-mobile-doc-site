// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    walletsSidebar: [
        /* Wallet SDKs Section */
        {
            type: 'html',
            value: 'Wallet SDKs',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'wallets/overview',
            label: 'Overview'
        },
        
        /* Mobile Wallet Adapter Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Mobile Wallet Adapter',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'wallets/mobile-wallet-adapter/installation',
            label: 'Installation'
        },
        {
            type: 'doc',
            id: 'wallets/mobile-wallet-adapter/usage',
            label: 'Usage'
        },
        {
            type: 'category',
            label: 'Guides',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'wallets/guides/upgrade-mobile-wallet-adapter',
                    label: 'Upgrading to Mobile Wallet Adapter 2.0'
                },
                {
                    type: 'doc',
                    id: 'wallets/guides/bottom-sheets',
                    label: 'Use bottom sheets to handle MWA requests'
                },
            ]
        },
        

        
        /* Seed Vault Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Seed Vault',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'wallets/seed-vault/installation',
            label: 'Installation'
        },
        {
            type: 'doc',
            id: 'wallets/seed-vault/usage',
            label: 'Usage'
        },
        
        
        /* Resources Section */
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
            id: 'wallets/guides/ux-best-practices',
            label: 'Wallet UX Best Practices'
        },
        {
            type: 'category',
            label: 'Wallet Library Reference',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'wallets/mobile-wallet-adapter/reference',
                    label: 'Mobile Wallet Adapter'
                },
                {
                    type: 'doc',
                    id: 'wallets/seed-vault/reference',
                    label: 'Seed Vault'
                }
            ]
        }
    ]
};