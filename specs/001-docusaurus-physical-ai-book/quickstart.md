# Quickstart Guide: Docusaurus Physical AI Book

**Feature**: 001-docusaurus-physical-ai-book
**Date**: 2026-01-01
**Audience**: Contributors, content authors, instructors

## Overview

This guide helps you get started contributing to the Physical AI & Humanoid Robotics interactive book. Whether you're adding content, fixing typos, or developing interactive components, this document provides everything you need.

---

## Prerequisites

- **Node.js**: 18.x or later ([download](https://nodejs.org/))
- **Git**: For version control ([download](https://git-scm.com/))
- **Code editor**: VS Code recommended (with MDX extension)
- **Python 3.10+**: For testing code examples (optional but recommended)

**Skill Level**:
- Adding/editing content: Markdown knowledge (beginner-friendly)
- Developing components: React + TypeScript (intermediate)

---

## Quick Setup (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/<org>/<repo>.git
cd <repo>
```

### 2. Install Dependencies

```bash
npm install
```

This installs Docusaurus, React, MDX, and all plugins (~2-3 minutes).

### 3. Start Development Server

```bash
npm start
```

This starts a local server at `http://localhost:3000`. The site auto-reloads when you save changes.

**Expected Output**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

### 4. Make Your First Edit

1. Open `docs/intro.mdx` in your editor
2. Change the title or add a sentence
3. Save the file
4. See changes instantly in your browser

---

## Project Structure

```
<repo>/
├── docs/                       # All book content (MDX files)
│   ├── intro.mdx              # Landing page
│   ├── quarter-overview.mdx   # Course overview
│   ├── module1/               # Module 1 chapters
│   │   ├── index.mdx
│   │   ├── what-is-physical-ai.mdx
│   │   └── ...
│   ├── module2/               # Module 2 chapters
│   └── resources/             # Setup guides, community links
│
├── code-examples/              # Executable code (Python, ROS 2)
│   ├── module1/
│   ├── module2/
│   └── requirements.txt       # Python dependencies
│
├── static/                     # Static assets
│   ├── img/                   # Images, diagrams
│   └── models/                # 3D robot models (glTF, URDF)
│
├── src/                        # Custom React components
│   ├── components/            # Interactive visualizations
│   │   ├── RobotVisualization.tsx
│   │   └── KinematicsPlotter.tsx
│   ├── css/                   # Custom styles
│   └── pages/                 # Custom pages (non-docs)
│
├── sidebars.js                 # Navigation structure
├── docusaurus.config.js        # Site configuration
├── package.json                # Node dependencies
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD pipeline
```

---

## Common Tasks

### Adding a New Chapter

1. **Create MDX file**: `docs/module2/new-chapter.mdx`

2. **Add frontmatter**:
```mdx
---
title: Your Chapter Title
sidebar_label: Short Title
sidebar_position: 3
description: Brief description for SEO
---

## Introduction

Your content here...
```

3. **Update sidebar**: Edit `sidebars.js` and add `'module2/new-chapter'` to the appropriate module's `items` array.

4. **Preview**: Check `http://localhost:3000` to see your chapter in the sidebar.

### Embedding Code Examples

**Method 1: Inline code block**

```mdx
```python
import numpy as np

def forward_kinematics(theta1, theta2, L1=1.0, L2=0.8):
    x = L1 * np.cos(theta1) + L2 * np.cos(theta1 + theta2)
    y = L1 * np.sin(theta1) + L2 * np.sin(theta1 + theta2)
    return x, y
\```
```

**Method 2: Import from code-examples/ (preferred)**

```mdx
import CodeBlock from '@theme/CodeBlock';
import ForwardKinCode from '!!raw-loader!@site/code-examples/module2/forward-kinematics.py';

<CodeBlock language="python" title="forward-kinematics.py" showLineNumbers>
{ForwardKinCode}
</CodeBlock>

[View on GitHub](https://github.com/<org>/<repo>/blob/main/code-examples/module2/forward-kinematics.py)
```

### Adding Images

1. **Save image**: `static/img/module2/kinematics-diagram.png`

2. **Embed in MDX**:
```mdx
![Forward kinematics diagram showing link lengths and joint angles](../static/img/module2/kinematics-diagram.png)
```

Always include descriptive alt text for accessibility!

### Using Interactive Components

```mdx
<RobotVisualization
  modelPath="/models/humanoid-v1.glb"
  jointAngles={[0, 45, -30]}
  height="600px"
  caption="Figure 2.1: Robot arm configuration"
/>
```

See `specs/001-docusaurus-physical-ai-book/contracts/component-api.md` for full component documentation.

### Creating Exercises

```mdx
## Exercise 1: Forward Kinematics

**Difficulty**: 🟢 Beginner

**Problem**: Compute the end-effector position for a 2-link arm with θ1=30°, θ2=45°, L1=1m, L2=0.8m.

**Acceptance Criteria**:
- [ ] Code computes transformation matrices correctly
- [ ] Result matches expected value ±0.01m
- [ ] Code runs without errors

**Starter Code**: [Download](https://github.com/<org>/<repo>/blob/main/code-examples/module2/exercises/ex1-starter.py)

<details>
<summary>Solution (click to reveal)</summary>

\```python
# Solution code here
\```

</details>
```

---

## Testing Your Changes

### 1. Local Preview

```bash
npm start  # Development server
```

### 2. Build Check

```bash
npm run build  # Production build (should complete without errors)
```

### 3. Link Validation

```bash
npm run check-links  # (if configured)
```

### 4. Code Example Testing

```bash
cd code-examples
pip install -r requirements.txt
python -m py_compile module2/*.py  # Syntax check
```

### 5. Accessibility Check

```bash
npm run build
npm run serve  # Serve production build
# Then run Lighthouse in Chrome DevTools
```

---

## Development Workflow

### For Content Authors

1. **Create feature branch**:
   ```bash
   git checkout -b add-module2-kinematics
   ```

2. **Write content**: Edit MDX files in `docs/`

3. **Preview locally**: `npm start`

4. **Commit changes**:
   ```bash
   git add docs/module2/robot-kinematics.mdx
   git commit -m "docs: add robot kinematics chapter to module 2"
   ```

5. **Push and create PR**:
   ```bash
   git push origin add-module2-kinematics
   # Create PR on GitHub
   ```

6. **Preview deployment**: GitHub Actions will create a preview build (link posted in PR)

7. **Merge**: Once reviewed, merge to `main` (auto-deploys to production)

### For Component Developers

1. **Create component**: `src/components/NewComponent.tsx`

2. **Register in MDX**: Edit `src/theme/MDXComponents.js`

3. **Write tests**: `src/components/__tests__/NewComponent.test.tsx`

4. **Document props**: Add to `specs/.../contracts/component-api.md`

5. **Test in content**: Use component in a sample MDX file

6. **Follow commit/PR workflow** (same as above)

---

## Deployment

### Automatic Deployment (Recommended)

Every merge to `main` automatically deploys to GitHub Pages via GitHub Actions.

**No manual steps required!**

### Manual Deployment (Emergency Only)

```bash
GIT_USER=<your-github-username> npm run deploy
```

This builds and pushes to `gh-pages` branch.

---

## Troubleshooting

### Build Fails with "Cannot find module"

**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules/ .docusaurus/
npm install
```

### Local Server Won't Start

**Solution**: Check port 3000 isn't in use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Images Not Displaying

**Solution**: Use correct path format
- ❌ `/static/img/diagram.png` (wrong)
- ✅ `/img/diagram.png` (correct - static/ is omitted)
- ✅ `@site/static/img/diagram.png` (alias - works in imports)

### Component Not Rendering in MDX

**Solution**: Check registration in `src/theme/MDXComponents.js`

### Code Example Fails in CI

**Solution**: Pin dependency versions in `code-examples/requirements.txt`
```
numpy==1.24.3  # ✅ Exact version
numpy>=1.24    # ❌ Avoid - may break in future
```

---

## Style Guide

### Content Writing

- **Clarity first**: Explain concepts in plain language before formal terminology
- **Progressive complexity**: Build from simple to advanced
- **Examples**: Every concept needs a concrete example
- **Visual aids**: Include diagrams where they help understanding
- **Code comments**: Explain non-obvious logic, not obvious syntax

### Markdown Conventions

- **Headings**: Use `##` for main sections, `###` for subsections
- **Code blocks**: Always specify language (```python, not just ```)
- **Links**: Use descriptive text (not "click here")
- **Math**: Use KaTeX for equations: `$inline$` or `$$display$$`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
docs: add inverse kinematics chapter
feat: add RobotVisualization component
fix: correct typo in module 1
chore: update dependencies
```

---

## Getting Help

- **Documentation**: See `specs/001-docusaurus-physical-ai-book/`
- **Component API**: `specs/.../contracts/component-api.md`
- **Issues**: [GitHub Issues](https://github.com/<org>/<repo>/issues)
- **Discussions**: [GitHub Discussions](https://github.com/<org>/<repo>/discussions)
- **Docusaurus Docs**: [docusaurus.io/docs](https://docusaurus.io/docs)

---

## Next Steps

- ✅ **You're ready!** Start by adding a small improvement (fix a typo, clarify a sentence)
- 📖 Read the full [Contributing Guide](https://github.com/<org>/<repo>/blob/main/CONTRIBUTING.md)
- 🎯 Check [Good First Issues](https://github.com/<org>/<repo>/labels/good%20first%20issue)
- 🚀 Join the community in [Discussions](https://github.com/<org>/<repo>/discussions)

**Happy contributing to Physical AI education!**
