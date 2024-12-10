// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    dappPublishingSidebar: [
        {
            type: 'doc',
            id: 'dapp-publishing/intro',
            label: 'dApp Store Intro'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/publishing-a-pwa',
            label: 'Publish a PWA'
        },
        {
            type: 'category',
            label: 'Publish your dApp',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/overview',
                    label: 'Overview'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/setup',
                    label: '1. CLI Tool Installation'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/prepare',
                    label: '2. Prepare for publishing'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/publisher-and-app-nft',
                    label: '3. Publisher and App NFTs'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/submit',
                    label: '4. Submit your dApp release'
                },
                {
                    type: 'category',
                    label: 'After publishing',
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            type: 'doc',
                            id: 'dapp-publishing/link-to-dapp-listing-page',
                            label: 'Link to your dApp listing page'
                        },
                        {
                            type: 'doc',
                            id: 'dapp-publishing/publishing-updates',
                            label: 'Publish a dApp update'
                        }
                    ]
                },
            ]  
        },
        {
            type: 'doc',
            id: 'dapp-publishing/qanda',
            label: 'Q & A'
        },
        {
            type: 'category',
            label: 'Terms & Agreement',
            collapsible: true,
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/policy',
                    label: 'Publisher Policy'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/agreement',
                    label: 'Developer Agreement'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/tou',
                    label: 'Solana dApp Store TOU'
                }
            ]
        },
        {
            type: 'doc',
            id: 'dapp-publishing/support',
            label: 'Support'
        },
    ]
  };