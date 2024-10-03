// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    dappPublishingSidebar: [
        {
            type: 'html',
            value: 'Getting Started',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'dapp-publishing/intro',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/qanda',
            label: 'Publishing FAQ'
        },

        /* Prepare for Publishing section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Prepare for publishing',
            className: 'sidebar-section-header',
        },
        {
            type: 'link',
            href: 'dapp-publishing/publishing-a-pwa',
            label: 'Pre-submission Checklist'
        },
        {
            type: 'link',
            href: 'dapp-publishing/publishing-a-pwa',
            label: 'Prepare your assets'
        },
        {
            type: 'link',
            href: 'dapp-publishing/publishing-a-pwa',
            label: 'Test your app'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/publishing-a-pwa',
            label: 'Convert a PWA to an APK'
        },

        /* Publish your app tutorial */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'dApp Submission',
            className: 'sidebar-section-header',
        },
        {
            type: 'category',
            label: 'Publish your dApp',
            collapsible: false,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/overview',
                    label: 'Publishing Overview'
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
            ]  
        },
        {
            type: 'category',
            label: 'After publishing',
            collapsible: false,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/publishing-updates',
                    label: 'Update a Published dApp'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/link-to-dapp-listing-page',
                    label: 'Link to your dApp listing page'
                },
            ]
        },

        /* Addtional resources section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Additional resources',
            className: 'sidebar-section-header',
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