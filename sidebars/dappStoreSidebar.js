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
                    id: 'dapp-publishing/submit',
                    label: '3. Mint & Submit your dApp'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/publishing_releases',
                    label: '4. Publish subsequent dApp releases'
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