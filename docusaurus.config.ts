import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'AI Systems in the Physical World - Embodied Intelligence',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // TODO: Replace with actual GitHub Pages URL
  url: 'https://USERNAME.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // TODO: Replace with actual repo name
  baseUrl: '/humanoid-ai-book/',

  // GitHub pages deployment config.
  // TODO: Replace with actual GitHub org/user name and repo name
  organizationName: 'USERNAME', // Usually your GitHub org/user name.
  projectName: 'humanoid-ai-book', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // TODO: Replace with actual GitHub edit URL
          editUrl: 'https://github.com/USERNAME/humanoid-ai-book/tree/main/',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // TODO: Replace with actual GitHub edit URL
          editUrl: 'https://github.com/USERNAME/humanoid-ai-book/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/physical-ai-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Book',
        },
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/USERNAME/humanoid-ai-book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Book',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Quarter Overview',
              to: '/docs/quarter-overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Environment Setup',
              to: '/docs/resources/environment-setup',
            },
            {
              label: 'Further Reading',
              to: '/docs/resources/further-reading',
            },
            {
              label: 'Community',
              to: '/docs/resources/community',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/USERNAME/humanoid-ai-book',
            },
            {
              label: 'ROS 2 Discourse',
              href: 'https://discourse.ros.org/',
            },
          ],
        },
      ],
      copyright: `Content: CC BY 4.0 | Code: MIT License | Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'cpp', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
