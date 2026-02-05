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
            label: 'dApp Store Overview'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/faq',
            label: 'Frequently Asked Questions'
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
            type: 'doc',
            id: 'dapp-publishing/checklist',
            label: 'Publishing Checklist'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/listing-page-guidelines',
            label: 'Prepare your dApp Listing page'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/publishing-a-pwa',
            label: 'Convert a PWA to an APK'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/building-expo-apk',
            label: 'Build a release APK with Expo'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/publishing-from-google-play',
            label: 'Publishing from Google Play'
        },

        /* Publish your app tutorial */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Publishing',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'dapp-publishing/submit-new-app',
            label: 'Submit a New App'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/submit-an-update',
            label: 'Submit an Update'
        },
        {
            type: 'doc',
            id: 'dapp-publishing/link-to-dapp-listing-page',
            label: 'Link to your dApp listing page'
        },
        {
            type: 'category',
            label: 'Publishing CLI',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'dapp-publishing/overview',
                    label: 'Submission Overview'
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
                    id: 'dapp-publishing/app-nft',
                    label: '3. Mint your App NFT'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/submit',
                    label: '4. Submit your dApp release'
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/publishing-updates',
                    label: 'Update a Published dApp'
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
                    id: 'dapp-publishing/publisher-policy',
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
                },
                {
                    type: 'doc',
                    id: 'dapp-publishing/privacy-policy',
                    label: 'Solana Mobile Device and dApp Store Privacy Policy'
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