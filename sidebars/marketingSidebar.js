// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    marketingSidebar: [
        {
            type: 'html',
            value: 'Developer Marketing',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'marketing/overview',
            label: 'Overview'
        },
        {
            type: 'doc',
            id: 'marketing/comarketing-guidelines',
            label: 'Co-marketing With Solana Mobile'
        },
        {
            type: 'category',
            label: 'Engaging with Seeker & Saga users',
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'marketing/engaging-seeker-users',
                    label: 'Seeker'
                },
                {
                    type: 'doc',
                    id: 'marketing/engaging-saga-users',
                    label: 'Saga'
                },
            ]
        },
        {
            type: 'doc',
            id: 'marketing/faq',
            label: 'Frequently Asked Questions'
        },
        /* Token Section */
        // {
        //     type: 'html',
        //     value: '<div class="sidebar-divider" />',
        // },
        // {
        //     type: 'html',
        //     value: 'Solana Mobile Tokens',
        //     className: 'sidebar-section-header',
        // },
        // {
        //     type: 'doc',
        //     id: 'marketing/chapter2-preorder-tokens',
        //     label: 'Chapter 2 Preorder Token'
        // },
        // {
        //     type: 'doc',
        //     id: 'marketing/saga-genesis-token',
        //     label: 'Saga Genesis Token'
        // },

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
            type: 'doc',
            id: 'marketing/support',
            label: 'Support'
        },
        {
            type: 'link',
            href: 'https://solanamobile.com/press',
            label: 'Press Kit'
        },

    ]
  };