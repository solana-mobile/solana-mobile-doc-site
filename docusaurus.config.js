// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Solana Mobile Docs',
  tagline: 'Learn to build on Solana Mobile',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.solanamobile.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'solana-mobile', // Usually your GitHub org/user name.
  projectName: 'sms-docsite', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl: 'https://github.com/solana-mobile/solana-mobile-doc-site/tree/main/',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          // this GA code is safe to be published
          trackingID: "G-PBF6HZVSRX",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/solana-mobile-stack-social-card.png',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Solana Mobile',
        logo: {
          alt: 'Solana Mobile Logo',
          src: 'img/solana-mobile-stack-logo-50x50.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/solana-mobile',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://discord.gg/solanamobile',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://portal.usecontext.io/standalone/FC55OPwlz',
            label: 'SMS ChatGPT Bot (Beta)',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Exchange',
                href: 'https://solana.stackexchange.com/',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/solanamobile',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/solanamobile',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/solana-mobile',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Solana Mobile, Inc.`,
      },
      prism: {
        additionalLanguages: ['kotlin', 'json'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // This API key is "search-only" and safe to be published
        apiKey: "c52fd1c2b00a7f8d578b7d2b36430a44",
        appId: "QHX7ZKLF5I",
        indexName: "solanamobile",
        contextualSearch: true,
      },
    }),
};

module.exports = config;
