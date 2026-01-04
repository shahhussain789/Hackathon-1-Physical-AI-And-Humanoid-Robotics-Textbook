# Data Model: Docusaurus Physical AI Interactive Book

**Feature**: 001-docusaurus-physical-ai-book
**Date**: 2026-01-01
**Purpose**: Define content structure, metadata schemas, and component interfaces

## Overview

This data model defines how educational content is structured, how components interact, and what metadata is required for each content type. Since Docusaurus is a static site generator, "data" is primarily:
- Markdown/MDX file frontmatter (metadata)
- File/directory structure (navigation hierarchy)
- Configuration objects (sidebar, navbar)
- React component props (interactive elements)

---

## Entity: Module

**Description**: A major curricular unit containing related chapters, roughly corresponding to 2-3 weeks of study.

**File Structure**:
```
docs/
└── module{N}/
    ├── _category_.json          # Module metadata
    ├── index.mdx                # Module landing page
    ├── chapter1.mdx
    ├── chapter2.mdx
    └── exercises/
        └── chapter1-exercises.mdx
```

**Metadata Schema** (`_category_.json`):
```json
{
  "label": "Module 1: Introduction to Physical AI",
  "position": 2,
  "collapsed": false,
  "link": {
    "type": "doc",
    "id": "module1/index"
  },
  "customProps": {
    "description": "Foundations of Physical AI and embodied intelligence",
    "estimatedHours": 12,
    "prerequisites": ["Basic AI/ML", "Python programming"],
    "learningObjectives": [
      "Define Physical AI and contrast with traditional AI",
      "Explain embodied intelligence and physical constraints",
      "Identify challenges in real-world robotics deployment"
    ]
  }
}
```

**Attributes**:
- `label`: Display name in sidebar (string, required)
- `position`: Order in sidebar (number, required)
- `collapsed`: Initial sidebar state (boolean, optional, default: false)
- `link`: Module landing page (object, optional)
- `description`: Short summary (string, 1-2 sentences)
- `estimatedHours`: Study time estimate (number)
- `prerequisites`: List of prerequisite topics (array of strings)
- `learningObjectives`: Bullet points of what students will learn (array of strings)

**Relationships**:
- **Contains**: Multiple Chapters (1:N)
- **Follows**: Previous Module (1:1, optional for Module 1)

---

## Entity: Chapter

**Description**: A single topic within a Module, typically covering one concept or technique.

**File Structure**:
```
docs/module{N}/chapter-name.mdx
```

**Frontmatter Schema**:
```yaml
---
id: robot-kinematics
title: Robot Kinematics: From Joint Angles to End-Effector Poses
sidebar_label: Robot Kinematics
sidebar_position: 1
description: Learn forward kinematics to compute robot end-effector position from joint angles using transformation matrices.
keywords: [kinematics, forward kinematics, transformation matrix, DH parameters, robotics]
tags: [module2, kinematics, fundamentals]
last_update:
  date: 2026-01-01
  author: Physical AI Team
custom_edit_url: https://github.com/<org>/<repo>/edit/main/docs/module2/robot-kinematics.mdx
---
```

**Attributes**:
- `id`: Unique identifier (string, optional, defaults to filename)
- `title`: Full chapter title (string, required)
- `sidebar_label`: Shortened name for sidebar (string, optional, defaults to title)
- `sidebar_position`: Order within module (number, required)
- `description`: SEO and preview text (string, 1-2 sentences)
- `keywords`: Search optimization (array of strings)
- `tags`: Categorization for filtering (array of strings)
- `last_update`: Tracking for freshness (object: date, author)
- `custom_edit_url`: Link to edit on GitHub (string, optional)

**Content Sections** (within MDX body):

1. **Introduction**: Student-friendly overview (before formal terminology)
2. **Key Concepts**: Core ideas with examples
3. **Mathematical Formulation**: Formal definitions (with plain-language explanations)
4. **Code Examples**: Runnable Python/ROS 2 code with explanations
5. **Visualizations**: Diagrams, animations, interactive components
6. **Exercises**: (Optional) Problems for self-assessment
7. **Further Reading**: (Optional) Links to papers, tutorials, documentation

**Relationships**:
- **Belongs to**: One Module (N:1)
- **References**: Code Examples, Exercises, External Resources (N:M)

---

## Entity: Code Example

**Description**: A complete, executable code snippet demonstrating a concept.

**File Structure**:
```
code-examples/
└── module{N}/
    └── {example-name}.py
```

**File Header Template** (Python docstring):
```python
"""
Forward Kinematics Example: 2-Link Planar Arm

Module: Humanoid Control Fundamentals
Chapter: Robot Kinematics
Dependencies: numpy==1.24.3
Python Version: 3.10+
Last Tested: 2026-01-01

Description:
Computes the end-effector position of a 2-link planar robot arm given joint angles
using forward kinematics and transformation matrices.

Usage:
    python code-examples/module2/forward_kinematics_2link.py

Expected Output:
    End-effector position: (x, y) = (1.414, 1.414)
"""
```

**Attributes**:
- **Filename**: Descriptive, kebab-case (e.g., `forward-kinematics-2link.py`)
- **Module**: Parent module (string)
- **Chapter**: Parent chapter (string)
- **Dependencies**: Exact versions (list, tracked in requirements.txt)
- **Python Version**: Minimum version (string)
- **Last Tested**: Date of last successful CI run (date)
- **Description**: What the code does (string, 2-3 sentences)
- **Usage**: Command to run (string)
- **Expected Output**: What students should see (string)

**Embedding in MDX**:

```mdx
## Forward Kinematics Example

Here's a complete implementation for a 2-link planar arm:

import CodeBlock from '@theme/CodeBlock';
import ForwardKinematicsCode from '!!raw-loader!@site/code-examples/module2/forward-kinematics-2link.py';

<CodeBlock language="python" title="code-examples/module2/forward-kinematics-2link.py" showLineNumbers>
{ForwardKinematicsCode}
</CodeBlock>

[📁 View on GitHub](https://github.com/<org>/<repo>/blob/main/code-examples/module2/forward-kinematics-2link.py) | [▶️ Run in Colab](https://colab.research.google.com/github/<org>/<repo>/blob/main/code-examples/module2/forward-kinematics-2link.ipynb)
```

**Relationships**:
- **Referenced by**: Chapters (N:M)
- **Depends on**: External libraries (requirements.txt)

---

## Entity: Exercise

**Description**: A problem or mini-project for students to test understanding.

**File Structure**:
```
docs/module{N}/exercises/
├── chapter1-exercises.mdx
└── chapter1-solutions.mdx (optionally hidden)
```

**Frontmatter Schema**:
```yaml
---
title: Forward Kinematics Exercises
sidebar_label: Exercises
sidebar_position: 10  # After all chapters
description: Practice problems for forward kinematics with acceptance criteria.
---
```

**Exercise Template** (within MDX):

```mdx
## Exercise 1: 3-Link Planar Arm Forward Kinematics

**Difficulty**: 🟢 Beginner

**Learning Objectives**:
- Apply forward kinematics to a 3-link system
- Implement transformation matrix multiplication
- Validate results against known test cases

**Problem Description**:
Given a 3-link planar robot arm with link lengths L1=1m, L2=0.8m, L3=0.5m and joint angles θ1=45°, θ2=30°, θ3=-20°, compute the end-effector position (x, y).

**Acceptance Criteria**:
- [ ] Code computes transformation matrices T1, T2, T3 correctly
- [ ] Matrix multiplication produces final transformation T_0_3
- [ ] End-effector position matches expected value within 0.01m tolerance
- [ ] Code runs without errors in Python 3.10+ environment

**Starter Code**: [Download starter template](https://github.com/<org>/<repo>/blob/main/code-examples/module2/exercises/ex1-starter.py)

**Test Cases**:
| θ1 | θ2 | θ3 | Expected (x, y) |
|----|----|----|-----------------|
| 0° | 0° | 0° | (2.3, 0.0) |
| 45° | 30° | -20° | (1.85, 1.42) |

**Solution**: Available [here](/docs/module2/exercises/chapter1-solutions#exercise-1) (toggle to reveal)
```

**Attributes**:
- **Difficulty**: Beginner/Intermediate/Advanced (emoji + text)
- **Learning Objectives**: Skills practiced (array of strings)
- **Problem Description**: Clear instructions (string)
- **Acceptance Criteria**: Checkboxes for self-assessment (Markdown checklist)
- **Starter Code**: Optional template (link)
- **Test Cases**: Input/output pairs for validation (Markdown table)
- **Solution**: Link to solution page (URL)

**Relationships**:
- **Belongs to**: One Chapter (N:1)
- **May reference**: Code Examples (N:M)

---

## Entity: External Resource

**Description**: Curated link to external content (paper, dataset, hardware, community).

**File Structure**:
```
docs/resources/
├── further-reading.mdx
├── hardware-platforms.mdx
└── community.mdx
```

**Link Template** (within MDX):

```mdx
### DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills

**Type**: 📄 Research Paper
**Authors**: Peng et al. (SIGGRAPH 2018)
**Link**: [arXiv](https://arxiv.org/abs/1804.02717) | [Project Page](https://xbpeng.github.io/projects/DeepMimic/index.html) | [Code](https://github.com/xbpeng/DeepMimic)

**Why This Resource**:
Seminal work on using RL for humanoid locomotion by imitating motion capture data. Directly relevant to Module 4's sim-to-real transfer topics. Demonstrates how to combine imitation learning with RL for robust walking gaits.

**Prerequisites**: Module 4, Chapter 3 (RL for Locomotion)
```

**Attributes**:
- **Title**: Resource name (string)
- **Type**: Category with emoji (Paper, Dataset, Hardware, Community Forum, Tutorial)
- **Authors/Source**: Credit (string, optional)
- **Link**: URL(s) (array of hyperlinks)
- **Why This Resource**: Annotation explaining relevance (string, 2-3 sentences)
- **Prerequisites**: Recommended chapters before reading (array of chapter IDs)

**Relationships**:
- **Referenced by**: Chapters (N:M)
- **Categorized as**: Resource Type (N:1)

---

## Component Interface: Interactive Visualization

**Description**: React components for 3D visualizations, simulations, or interactive diagrams.

**File Structure**:
```
src/components/
├── RobotVisualization.jsx
├── GaitAnimator.jsx
└── KinematicsPlotter.jsx
```

**Component Props Schema** (TypeScript interface):

```typescript
// src/components/RobotVisualization.tsx
interface RobotVisualizationProps {
  /** Path to robot model file (URDF or glTF) */
  modelPath: string;

  /** Enable auto-rotation of the view */
  autoRotate?: boolean;

  /** Initial camera position [x, y, z] */
  cameraPosition?: [number, number, number];

  /** Joint angle configuration (degrees) */
  jointAngles?: number[];

  /** Height of the canvas (CSS value) */
  height?: string;

  /** Caption displayed below visualization */
  caption?: string;
}

export default function RobotVisualization({
  modelPath,
  autoRotate = true,
  cameraPosition = [5, 5, 5],
  jointAngles = [0, 0, 0],
  height = '500px',
  caption,
}: RobotVisualizationProps) {
  // Implementation
}
```

**Registration in MDX** (global components):

```javascript
// src/theme/MDXComponents.js
import MDXComponents from '@theme-original/MDXComponents';
import RobotVisualization from '@site/src/components/RobotVisualization';
import GaitAnimator from '@site/src/components/GaitAnimator';

export default {
  ...MDXComponents,
  RobotVisualization,
  GaitAnimator,
};
```

**Usage in MDX**:

```mdx
<RobotVisualization
  modelPath="/models/humanoid-v1.glb"
  autoRotate={false}
  jointAngles={[45, 30, -20, 0, 0, 0]}
  caption="Figure 1: Humanoid robot in standing pose with specified joint angles"
/>
```

**Relationships**:
- **Used by**: Chapters (N:M)
- **Loads**: 3D models, datasets (N:M)

---

## Configuration: Sidebar Navigation

**File**: `sidebars.js`

**Schema**:

```javascript
// sidebars.js
module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'quarter-overview',
      label: 'Quarter Overview',
    },
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
        {
          type: 'doc',
          id: 'module1/exercises/index',
          label: 'Exercises',
        },
      ],
    },
    // Modules 2-4 similar structure
    {
      type: 'category',
      label: 'Resources',
      collapsible: true,
      collapsed: true,
      items: [
        'resources/environment-setup',
        'resources/further-reading',
        'resources/hardware-platforms',
        'resources/community',
      ],
    },
  ],
};
```

**Attributes**:
- **type**: 'doc' (single page) or 'category' (folder)
- **id**: Document ID (file path without .mdx)
- **label**: Display text in sidebar
- **collapsible/collapsed**: For categories, UI state
- **link**: Optional landing page for category
- **items**: Nested documents/categories (recursive)

---

## Configuration: Site Metadata

**File**: `docusaurus.config.js`

**Critical Fields**:

```javascript
export default {
  // Site metadata
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'AI Systems in the Physical World - Embodied Intelligence',
  favicon: 'img/favicon.ico',

  // Deployment config
  url: 'https://<username>.github.io',
  baseUrl: '/<repo-name>/',
  organizationName: '<github-username>',
  projectName: '<repo-name>',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // Build behavior
  onBrokenLinks: 'throw',        // Fail build on broken internal links
  onBrokenMarkdownLinks: 'warn', // Warn on broken Markdown links
  onDuplicateRoutes: 'warn',

  // i18n (future)
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Theme and plugins
  presets: [ /* classic preset */ ],
  themeConfig: { /* navbar, footer, prism, algolia */ },
  plugins: [ /* search, analytics */ ],
};
```

---

## Dependency Management

**File**: `code-examples/requirements.txt`

**Schema**:
```
# AI/ML Libraries
numpy==1.24.3
scipy==1.10.1
matplotlib==3.7.1
torch==2.0.1
tensorflow==2.13.0

# Robotics Libraries
# Note: ROS 2 installed via apt, not pip
roboticstoolbox-python==1.1.0
spatialmath-python==1.1.5

# Computer Vision
opencv-python==4.8.0.74
pillow==10.0.0

# Utilities
pyyaml==6.0.1
pytest==7.4.0  # For testing examples
ruff==0.0.282  # For linting
```

**Attributes**:
- **Exact version pinning**: Ensures reproducibility (meets Constitution Principle V)
- **Comments**: Group by category for readability
- **ROS 2 note**: System dependencies documented separately in environment-setup.mdx

**Update Process**:
1. Dependabot monitors for security updates
2. Manual testing in clean environment
3. Update requirements.txt and re-run CI
4. Note breaking changes in CHANGELOG.md

---

## Summary

This data model defines:
- **5 Content Entities**: Module, Chapter, Code Example, Exercise, External Resource
- **2 Component Types**: Interactive Visualization, Markdown Extensions
- **2 Configuration Schemas**: Sidebar, Site Metadata
- **1 Dependency Manifest**: requirements.txt

All entities are file-based (no database), version-controlled, and human-readable (Markdown, JSON, YAML). This aligns with Constitution Principle II (Modular Content Architecture) and V (Open-Source Standards & Traceability).
