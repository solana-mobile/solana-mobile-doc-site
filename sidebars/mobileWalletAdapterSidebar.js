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
        {
            type: 'category',
            label: 'Usage',
            collapsible: true,
            collapsed: false,
            items: [
            {
                type: 'doc',
                id: 'mobile-wallet-adapter/mobile-apps',
                label: 'Mobile Apps'
            },
            {
                type: 'doc',
                id: 'mobile-wallet-adapter/web-apps',
                label: 'Web Apps'
            },]
        },
        {
            type: 'category',
            label: 'Deep dive',
            collapsible: true,
            collapsed: false,
            items: [
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
            ]
        },

      ],
  };