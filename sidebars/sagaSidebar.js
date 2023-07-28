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
            ]  
        },
    ]
  };