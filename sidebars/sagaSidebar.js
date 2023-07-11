// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    sagaSidebar: [
        {
            type: 'doc',
            id: 'saga/saga_overview',
            label: 'Saga Overview'
        },
        {
            type: 'category',
            label: 'Release Notes',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'saga/release-notes/MR1',
                    label: 'MR1'
                },
            ]  
        },
    ]
  };