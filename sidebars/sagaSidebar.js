// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    sagaSidebar: [
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
                {
                    type: 'doc',
                    id: 'saga/release-notes/mr3',
                    label: 'MR3'
                },
                {
                    type: 'doc',
                    id: 'saga/release-notes/mr4',
                    label: 'MR4'
                },
                {
                    type: 'doc',
                    id: 'saga/release-notes/mr5',
                    label: 'MR5'
                },
            ]
        },
    ]
  };