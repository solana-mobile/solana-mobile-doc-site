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
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/publishing',
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
                    label: '3. Submit your dApp'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/publishing_releases',
                    label: '4. Publishing subsequent dApp releases'
                },
            ]  
        },
        {
            type: 'doc',
            id: 'dapp-publishing/faq',
            label: 'FAQ'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/policy',
            label: 'Publisher Policy'
        },
        {
            type: 'link',
            href: 'https://github.com/solana-mobile/dapp-publishing/blob/main/docs/DEVELOPER-AGREEMENT.pdf',
            label: 'Developer Agreement'
        },
        {
            type: 'link',
            href: 'https://github.com/solana-mobile/dapp-publishing/blob/main/docs/TERMS-OF-USE.pdf',
            label: 'Solana dApp Store TOU'
        }
    ]
  };