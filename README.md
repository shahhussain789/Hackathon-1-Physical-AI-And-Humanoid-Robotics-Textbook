# Physical AI & Humanoid Robotics: AI Systems in the Physical World

**An Interactive Educational Book on Embodied Intelligence**

[![Build Status](https://github.com/USERNAME/REPO/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/USERNAME/REPO/actions)
[![License: CC BY 4.0 (Docs)](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![License: MIT (Code)](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This interactive book bridges digital AI and physical robotics, enabling students to apply AI knowledge to control humanoid robots in simulated and real-world environments. Built with Docusaurus, it provides progressive learning content across 4 modules, executable Python/ROS 2 code examples, optional interactive 3D visualizations, and exercises for self-assessment.

**🎯 Target Audience**: Computer science students with AI/ML background transitioning to Physical AI and robotics.

**📚 Course Structure**: 4 modules covering foundations, control, perception, and AI for locomotion/manipulation.

**🛠️ Technologies**: ROS 2, Gazebo, NVIDIA Isaac Sim, Python 3.10+, React, Three.js

## Quick Start

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **yarn**
- **Python** 3.10+ (for code examples)
- **Git**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/USERNAME/REPO.git
   cd REPO
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

   The site will open at `http://localhost:3000`. Changes auto-reload.

4. **Build for production**:
   ```bash
   npm run build
   ```

   Static files generated in `build/` directory.

## Module Structure

### Module 1: Introduction to Physical AI & Embodied Intelligence
Learn the foundations of Physical AI, embodied intelligence, and the unique challenges of AI systems that operate in the real world.

**Chapters**: What is Physical AI? | Embodied Intelligence | Challenges | Humanoid Robotics | Course Tools Overview

### Module 2: Humanoid Control Fundamentals
Master robot kinematics, dynamics, and control theory with hands-on Python and ROS 2 examples.

**Chapters**: Robot Kinematics | Inverse Kinematics | Robot Dynamics | Control Theory | Simulation Environments | Case Studies

### Module 3: Perception & Sensor Fusion for Humanoids
Explore computer vision, SLAM, and sensor fusion techniques for humanoid robot perception.

**Chapters**: Computer Vision | Depth Perception | Sensor Fusion | SLAM | 3D Reconstruction | Real-Time Optimization

### Module 4: AI for Humanoid Locomotion & Manipulation
Apply reinforcement learning and classical methods to achieve bipedal walking, manipulation, and human-robot interaction.

**Chapters**: Bipedal Locomotion | ZMP Controllers | RL for Locomotion | Sim-to-Real | Manipulation | Whole-Body Control | HRI | Ethics & Safety

## Features

- ✅ **Interactive Learning**: Embedded 3D visualizations with Three.js
- ✅ **Executable Code**: Complete Python/ROS 2 examples with setup guides
- ✅ **Self-Assessment**: End-of-chapter exercises with solutions
- ✅ **Curated Resources**: Links to papers, datasets, hardware platforms, and communities
- ✅ **Accessibility**: WCAG 2.1 AA compliant, mobile-responsive, dark mode support
- ✅ **Open Source**: Community contributions welcome via GitHub

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute**:
- Fix typos or clarify explanations
- Add diagrams or visualizations
- Improve code examples
- Translate content (future)
- Report issues or suggest enhancements

## Running Code Examples

Code examples are located in `/code-examples`. To run them:

1. **Install Python dependencies**:
   ```bash
   cd code-examples
   pip install -r requirements.txt
   ```

2. **Run an example**:
   ```bash
   python module2/forward-kinematics-2link.py
   ```

3. **For ROS 2 examples**, see [Environment Setup](https://USERNAME.github.io/REPO/docs/resources/environment-setup) for installation instructions.

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

**Live Site**: https://USERNAME.github.io/REPO/

## License

- **Documentation & Educational Content**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Source Code & Examples**: [MIT License](LICENSE)

## Acknowledgments

Built with [Docusaurus 3.9+](https://docusaurus.io/) and [React 18](https://react.dev/).

Inspired by the Physical AI curriculum at leading universities bridging traditional CS/AI education with robotics.

## Contact & Community

- **Issues**: [GitHub Issues](https://github.com/USERNAME/REPO/issues)
- **Discussions**: [GitHub Discussions](https://github.com/USERNAME/REPO/discussions)
- **ROS 2 Community**: [ROS Discourse](https://discourse.ros.org/)

---

**⭐ Star this repo if you find it helpful!**

**📖 Happy learning Physical AI & Humanoid Robotics!**
