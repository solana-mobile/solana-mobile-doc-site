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
            id: 'wallets/mobile-wallet-adapter/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'wallets/mobile-wallet-adapter/integration',
            label: 'Integration'
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
            id: 'wallets/seed-vault/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'wallets/seed-vault/integration',
            label: 'Integration'
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
            id: 'wallets/guides/ux-best-practices',
            label: 'Wallet UX Best Practices'
        },
        {
            type: 'doc',
            id: 'wallets/guides/upgrade-mobile-wallet-adapter',
            label: 'Upgrade to Mobile Wallet Adapter 2.0'
        },
        {
            type: 'doc',
            id: 'wallets/guides/bottom-sheets',
            label: 'Use bottom sheets to handle MWA requests'
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