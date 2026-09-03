import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'quarter-overview',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module1/index',
      },
      items: [
        'module1/intro-physical-ai',
        'module1/ros2-architecture',
        'module1/nodes-topics-services',
        'module1/python-ros2-rclpy',
        'module1/urdf-humanoids',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'module2/index',
      },
      items: [
        'module2/gazebo-fundamentals',
        'module2/urdf-sdf-models',
        'module2/sensor-simulation',
        'module2/ros2-gazebo-integration',
        'module2/unity-robotics',
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
  ],
};

export default sidebars;
