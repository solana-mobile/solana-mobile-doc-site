// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

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

  plugins: ['docusaurus-plugin-image-zoom'],

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
        blog: {
          blogTitle: 'Solana Mobile Blog',
          blogDescription: 'A curated feed of thought pieces, articles, and writings from Solana Mobile',
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          // this GA code is safe to be published
          trackingID: ["G-PBF6HZVSRX", "G-EYSNGZ63MD"],
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/solana-mobile-developer-hub-social-card.png',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: '',
        logo: {
          alt: 'Solana Mobile Logo',
          src: 'img/Solana_Mobile_With_Logo_White.png'
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Documentation',
            items: [
              {
                type: 'html',
                value: 'Solana Mobile Stack',
                className: 'sidebar-section-header',
              },
              {
                to: 'developers/overview',
                label: 'Overview'
              },
              {
                to: 'dapp-publishing/intro',
                label: 'dApp Store'
              },
              {
                to: 'mobile-wallet-adapter/overview',
                label: 'Mobile Wallet Adapter'
              },
              {
                to: 'developers/seed-vault',
                label: 'Seed Vault'
              },
              {
                type: 'html',
                value: 'Guides & Reference',
                className: 'sidebar-section-header',
              },
              {
                to: 'react-native/overview',
                label: 'React Native'
              },
              {
                to: 'android-native/overview',
                label: 'Kotlin'
              },
              {
                to: 'flutter/overview', 
                label: 'Flutter'
              },
              {
                to: 'unity/unity_sdk', 
                label: 'Unity'
              },
              {
                to: 'unreal/unreal_sdk', 
                label: 'Unreal Engine'
              },
            ],
          },
          {to: 'https://solanamobile.radiant.nexus/', label: 'Hackathon', position: 'left'},
          {to: 'https://solanamobile.com/grants', label: 'Grants', position: 'left'},
          {to: 'marketing/overview', label: 'Dev Marketing', position: 'left'},
          {to: 'blog', label: 'Blog', position: 'right'},
          {to: 'seeker/release-notes', label: 'Seeker', position: 'right'},
          {
            href: 'https://discord.gg/solanamobile',
            label: 'Discord',
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
          {
            title: 'Legal',
            items: [
              {
                label: 'Terms of Service',
                href: 'https://legal.solanamobile.com/tos-homepage-web',
              },
              {
                label: 'Privacy Policy',
                href: 'https://legal.solanamobile.com/privacy-policy-homepage-web',
              },
              {
                label: 'Developer Agreement',
                href: 'https://docs.solanamobile.com/dapp-publishing/agreement',
              },
              {
                label: 'dApp Store Terms of Use',
                href: 'https://docs.solanamobile.com/dapp-publishing/tou',
              },
              {
                label: 'Cookie Policy',
                href: 'https://legal.solanamobile.com/en/cookie-policy-web',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Solana Mobile Inc.`,
      },
      prism: {
        additionalLanguages: ['kotlin', 'json', 'swift', 'java', 'bash'],
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
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {
          margin: 64,
          background: '#FFF',
          scrollOffset: 0,
        }
      }
    }),
};

module.exports = config;
