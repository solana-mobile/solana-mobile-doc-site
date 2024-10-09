// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    marketingSidebar: [
        {
            type: 'html',
            value: 'Marketing & Partnerships',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'marketing/overview',
            label: 'Marketing Overview'
        },
        {
            type: 'doc',
            id: 'marketing/faq',
            label: 'Frequently Asked Questions'
        },
        {
            type: 'link',
            href: 'marketing/overview',
            label: 'Brand & Marketing Guidelines'
        },
        {
            type: 'link',
            href: 'marketing/overview',
            label: 'Post Launch Marketing'
        },

        /* Token Section */
        {
            type: 'html',
            value: '<div class="sidebar-divider" />',
        },
        {
            type: 'html',
            value: 'Solana Mobile Tokens',
            className: 'sidebar-section-header',
        },
        {
            type: 'doc',
            id: 'marketing/chapter2-preorder-tokens',
            label: 'Chapter 2 Preorder Token'
        },
        {
            type: 'doc',
            id: 'marketing/saga-genesis-token',
            label: 'Saga Genesis Token'
        },
    ]
  };