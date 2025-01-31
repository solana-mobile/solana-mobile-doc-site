// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    developersSidebar: [
        {
          type: 'html',
          value: 'Getting Started',
          className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'developers/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'developers/development-setup',
            label: 'Development Setup'
        },
        {
            type: 'doc',
            id: 'developers/mobile-development-frameworks',
            label: 'Mobile Development Frameworks'
        },

        /* Solana Mobile Stack Section **/
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Solana Mobile Stack',
            className: 'sidebar-section-header',
        },
        {
            type: 'category',
            label: 'Mobile Wallet Adapter',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'developers/mobile-wallet-adapter',
                    label: 'What is Mobile Wallet Adapter?'
                },
                {
                    type: 'doc',
                    id: 'developers/mobile-wallet-adapter-web',
                    label: 'Usage in a web browser'
                },
                {
                    type: 'doc',
                    id: 'developers/mobile-wallet-adapter-deep-dive',
                    label: 'Deep dive'
                },
            ]
        },
        {
            type: 'doc',
            id: 'developers/seed-vault',
            label: 'Seed Vault'
        },

        /* Resources Section **/
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
            id: 'sample-apps/sample_app_overview',
            label: 'Sample Applications'
        },
        {
            type: 'doc',
            id: 'reference/overview',
            label: 'Client Library Reference'
        },
        {
            type: 'doc',
            id: 'developers/community',
            label: 'Community'
        },
        {
            type: 'link',
            href: 'https://solanamobile.com/',
            label: 'Seeker'
        },
        {
            type: 'link',
            href: 'https://docs.solanamobile.com/saga/release-notes/',
            label: 'Saga Release Notes',
          }
      ],
  };