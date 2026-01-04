import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Explicit sidebar structure for Physical AI & Humanoid Robotics book
 to enforce pedagogical ordering (Constitution Principle II).
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'quarter-overview',
    {
      type: 'category',
      label: 'Module 1: Introduction to Physical AI',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module1/index',
      },
      items: [
        'module1/what-is-physical-ai',
        'module1/embodied-intelligence',
        'module1/challenges',
        'module1/humanoid-robotics',
        'module1/tools-overview',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Humanoid Control Fundamentals',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module2/index',
      },
      items: [
        'module2/robot-kinematics',
        'module2/inverse-kinematics',
        'module2/robot-dynamics',
        'module2/control-theory',
        'module2/simulation-environments',
        'module2/case-studies',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module3/index',
      },
      items: [
        'module3/isaac-ecosystem',
        'module3/isaac-sim-deep-dive',
        'module3/synthetic-data-generation',
        'module3/isaac-ros-fundamentals',
        'module3/visual-slam',
        'module3/nav2-humanoids',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module4/index',
      },
      items: [
        'module4/vla-fundamentals',
        'module4/voice-to-action',
        'module4/llm-cognitive-planning',
        'module4/vision-language-grounding',
        'module4/action-execution-safety',
        'module4/capstone-autonomous-humanoid',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial - Basics',
      collapsible: true,
      collapsed: true,
      items: [
        'tutorial-basics/create-a-page',
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial - Extras',
      collapsible: true,
      collapsed: true,
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
