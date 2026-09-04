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
  url: 'https://shahhussain789.github.io',
  baseUrl: '/Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook/',

  organizationName: 'shahhussain789',
  projectName: 'Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  scripts: [
    {
      src: '/scripts/chatbot-config.js',
      async: false,
    },
  ],

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
          editUrl: 'https://github.com/shahhussain789/Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook/tree/main/',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // TODO: Replace with actual GitHub edit URL
          editUrl: 'https://github.com/shahhussain789/Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook/tree/main/',
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
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI Book',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      style: 'dark',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Modules',
        },
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/shahhussain789/Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
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
          title: 'Modules',
          items: [
            {
              label: 'ROS 2 Nervous System',
              to: '/docs/module1/',
            },
            {
              label: 'Gazebo & Unity',
              to: '/docs/module2/',
            },
            {
              label: 'NVIDIA Isaac',
              to: '/docs/module3/',
            },
            {
              label: 'Vision-Language-Action',
              to: '/docs/module4/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/shahhussain789/Hackathon-1-Physical-AI-And-Humanoid-Robotics-Textbook',
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
