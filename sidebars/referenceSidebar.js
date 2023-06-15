// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    referenceSidebar: [
        {
            type: 'doc',
            id: 'reference/overview',
            label: 'Overview'
        },
        {
            type: 'category',
            label: 'Typescript',
            collapsible: false,
            items: [
            {
                type: 'doc',
                id: 'reference/typescript/mobile-wallet-adapter',
                label: 'Mobile Wallet Adapter'
            },
            {
                type: 'doc',
                id: 'reference/typescript/web3js',
                label: '@solana/web3.js'
            }
            ]  
        },
        {
            type: 'category',
            label: 'Kotlin',
            collapsible: false,
            items: [
            {
                type: 'doc',
                id: 'reference/kotlin/mobile-wallet-adapter',
                label: 'Mobile Wallet Adapter'
            }
            ]  
        },
    ]
  };