// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    seekerSidebar: [
        {
            type: 'category',
            label: 'Release Notes',
            link: {type: 'doc', id: 'seeker/release-notes/index'},
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'seeker/release-notes/mr4',
                    label: 'MR4'
                },
            ]
        },
    ]
  };
