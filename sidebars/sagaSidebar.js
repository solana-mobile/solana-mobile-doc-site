// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    sagaSidebar: [
        {
            type: 'doc',
            id: 'saga/overview',
            label: 'Overview'
        },
        {
            type: 'category',
            label: 'Release Notes',
            link: {type: 'doc', id: 'saga/release-notes/index'},
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'saga/release-notes/mr1',
                    label: 'MR1'
                },
                {
                    type: 'doc',
                    id: 'saga/release-notes/mr2',
                    label: 'MR2'
                },
                {
                    type: 'doc',
                    id: 'saga/release-notes/2023-12-update',
                    label: 'December 2023 Update'
                },
            ]
        },
    ]
  };