// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    developersSidebar: [
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
                id: 'mobile-wallet-adapter/local-connection',
                label: 'Local (Mobile to Mobile)'
            },
            {
                type: 'doc',
                id: 'mobile-wallet-adapter/remote-connection',
                label: 'Remote (Desktop to Mobile)'
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