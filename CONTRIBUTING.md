# Contributing to Physical AI & Humanoid Robotics Book

Thank you for your interest in contributing to this educational resource! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and constructive. We're here to learn together.

## Ways to Contribute

### 1. Fix Typos or Improve Clarity
- Spot a typo? Unclear explanation? Open a PR!
- Small fixes don't need an issue first

### 2. Add Visual Aids
- Diagrams, images, or animations that enhance understanding
- Place images in `static/img/moduleN/` with descriptive alt text
- Preferred formats: SVG (diagrams), WebP (photos), PNG (screenshots)

### 3. Improve Code Examples
- Fix bugs in existing examples
- Add better comments or docstrings
- Ensure examples run in clean Python 3.10 + ROS 2 Humble environment

### 4. Add New Content
- Expand chapters with more examples or explanations
- For significant additions, open an issue first to discuss

### 5. Report Issues
- Found a broken link? Code example doesn't run? Let us know!
- Use [GitHub Issues](https://github.com/USERNAME/REPO/issues)
- Include: what you expected, what happened, steps to reproduce

## Getting Started

### Prerequisites

- Node.js 18.x+
- Git
- Python 3.10+ (for code examples)
- Code editor (VS Code recommended with MDX extension)

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPO.git
   cd REPO
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/USERNAME/REPO.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start dev server**:
   ```bash
   npm start
   ```

   Site opens at `http://localhost:3000` with auto-reload.

## Development Workflow

### Creating a Branch

```bash
git checkout -b add-module2-kinematics
```

Use descriptive branch names:
- `fix-typo-module1-chapter2`
- `add-diagram-inverse-kinematics`
- `improve-ros2-example`

### Making Changes

#### Adding/Editing Content

1. **Content files**: Edit MDX files in `docs/moduleN/`
2. **Chapter frontmatter**: Include title, description, keywords
3. **Student-friendly**: Explain concepts plainly before formal terminology
4. **Progressive complexity**: Build from simple to advanced

Example frontmatter:
```yaml
---
title: Forward Kinematics: From Joint Angles to Poses
sidebar_label: Forward Kinematics
sidebar_position: 1
description: Learn how to compute end-effector positions from joint angles using transformation matrices.
keywords: [kinematics, forward kinematics, DH parameters, robotics]
---
```

#### Adding Code Examples

1. **Create file**: `code-examples/moduleN/example-name.py`
2. **Add docstring** with description, dependencies, usage, expected output
3. **Test locally**: Ensure code runs without errors
4. **Embed in MDX**:
   ```mdx
   import CodeBlock from '@theme/CodeBlock';
   import ExampleCode from '!!raw-loader!@site/code-examples/module2/example.py';

   <CodeBlock language="python" title="example.py" showLineNumbers>
   {ExampleCode}
   </CodeBlock>
   ```

#### Adding Images

1. **Place in**: `static/img/moduleN/image-name.png`
2. **Use in MDX**:
   ```mdx
   ![Descriptive alt text for accessibility](/img/module2/kinematics-diagram.png)
   ```
3. **Always include alt text** (required for accessibility)

### Testing Your Changes

#### Local Preview
```bash
npm start  # Auto-reloads on changes
```

#### Production Build
```bash
npm run build  # Check for build errors
npm run serve  # Serve production build locally
```

#### Code Examples
```bash
cd code-examples
pip install -r requirements.txt
python moduleN/your-example.py  # Verify it runs
```

#### Linting (if configured)
```bash
npm run lint
```

### Committing Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
docs: add inverse kinematics chapter to module 2
feat: add RobotVisualization component for 3D models
fix: correct typo in module 1 chapter 3
chore: update dependencies to latest versions
```

**Commit message format**:
- `docs:` - Documentation changes
- `feat:` - New features or content
- `fix:` - Bug fixes or corrections
- `chore:` - Maintenance (dependencies, config)
- `style:` - Formatting, whitespace (no content change)

### Submitting a Pull Request

1. **Push your branch**:
   ```bash
   git push origin your-branch-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out PR template**:
   - Describe what changed and why
   - Link related issues (`Fixes #123`)
   - Add screenshots for visual changes

4. **Wait for review**:
   - GitHub Actions will run checks (build, lint, link validation)
   - A maintainer will review your PR
   - Address feedback if requested

5. **Merge**:
   - Once approved, a maintainer will merge your PR
   - Your contribution will be deployed automatically!

## Style Guide

### Content Writing

- **Clarity first**: Explain concepts in plain language before formal terminology
- **Progressive complexity**: Build from simple to advanced within each chapter
- **Examples**: Every concept needs a concrete example
- **Visual aids**: Include diagrams where they help understanding
- **Code comments**: Explain non-obvious logic, not obvious syntax

### Markdown Conventions

- **Headings**: Use `##` for main sections, `###` for subsections (no `#` for page title, use frontmatter)
- **Code blocks**: Always specify language (```python, not just ```)
- **Links**: Use descriptive text, not "click here"
- **Lists**: Use `-` for bullets, `1.` for numbered lists
- **Math**: Use KaTeX for equations: `$inline$` or `$$display$$`

### Code Style

- **Python**: Follow [PEP 8](https://peps.python.org/pep-0008/)
- **JavaScript/TypeScript**: Prettier formatting (auto-formatted)
- **Naming**: Descriptive variable names, no single letters except loop counters
- **Comments**: Explain why, not what (code should be self-explanatory)

## Good First Issues

New to contributing? Look for issues labeled **good first issue**:

- Fix typos or broken links
- Add alt text to images missing it
- Improve code comments
- Add simple diagrams

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/USERNAME/REPO/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/USERNAME/REPO/issues)
- **Docusaurus questions**: [Docusaurus Docs](https://docusaurus.io/docs)

## Attribution

Contributors will be acknowledged in:
- Git commit history (automatic)
- CONTRIBUTORS.md (for significant contributions)
- Chapter `last_update` frontmatter

---

**Thank you for contributing to Physical AI education! 🤖🎓**
