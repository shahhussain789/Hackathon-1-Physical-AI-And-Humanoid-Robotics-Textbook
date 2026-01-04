# Phase 0 Research: Docusaurus Physical AI Interactive Book

**Feature**: 001-docusaurus-physical-ai-book
**Date**: 2026-01-01
**Purpose**: Technical research to inform architectural decisions for Docusaurus-based educational book

## Technology Stack Research

### Docusaurus 3.x Core Capabilities

Based on research of Docusaurus 3.9 (latest 2025/2026 release), key capabilities include:

**Core Framework**:
- **React 18**: Required for modern React features, concurrent rendering, and future server components
- **MDX v3**: Markdown with JSX, supports remark-directive for admonitions and custom components
- **ES Modules**: Config files can use ES6 modules and TypeScript
- **TypeScript 5.0**: Minimum version required for type safety

**Search**:
- **DocSearch v4** with Algolia's Ask AI feature (AI-powered search)
- **Local search plugin** alternatives for offline/free search
- **Algolia DocSearch** (recommended for production)

**Build & Deployment**:
- Static site generator producing HTML/CSS/JS
- Optimized for GitHub Pages deployment
- Supports GitHub Actions workflows for CI/CD
- Build time optimizations with code splitting and lazy loading

**Content Features**:
- **Versioning**: Support for multiple documentation versions
- **i18n**: Internationalization support (future enhancement, not MVP)
- **Blog**: Built-in blog functionality (can be used for updates/announcements)
- **Sidebar**: Auto-generated or custom sidebar navigation
- **Pagination**: Previous/Next navigation between pages
- **Code blocks**: Syntax highlighting with Prism.js, copy button, line highlighting
- **Tabs**: Group related content in tabbed interfaces
- **Admonitions**: Note, tip, warning, danger callouts using Markdown directives

**Interactive Components**:
- Full React component embedding in MDX files
- Three methods: import components, export in MDX, register globally
- Components retain full interactivity (state, effects, event handlers)
- @theme/MDXComponents for global component scope

### Recommended Architecture Decisions

**Decision 1: Use Docusaurus 3.9+ with Classic Theme**

**Options Considered**:
- Custom React site from scratch
- Jekyll or Hugo (static site generators)
- Docusaurus with classic theme
- GitBook or other documentation platforms

**Trade-offs**:
- **Custom React**: Maximum flexibility but high development time, reinventing documentation UX
- **Jekyll/Hugo**: Lightweight but limited interactive component support
- **Docusaurus classic**: Balanced - excellent docs UX, React component support, active community
- **GitBook**: SaaS lock-in, limited customization for educational content

**Rationale**: Docusaurus classic theme provides proven documentation UX patterns (sidebar, search, pagination) while supporting interactive React components for visualizations. MDX v3 enables embedding simulations without leaving Markdown workflow. Meets Constitution Principle VI (deployment simplicity) and IV (code examples).

---

**Decision 2: MDX for All Content with React Component Library**

**Options Considered**:
- Plain Markdown (.md) only
- MDX (.mdx) for all content
- Mixed: Markdown for simple pages, MDX for interactive

**Trade-offs**:
- **Plain Markdown**: Simpler, but no interactive components (violates P3 user story)
- **MDX everywhere**: Enables components anywhere, but slightly more complex
- **Mixed approach**: Cognitive overhead deciding which format per page

**Rationale**: Use MDX exclusively for consistency. Even "simple" chapters may later need interactive elements (code sandboxes, visualizations). MDX v3 is backwards-compatible with Markdown, so no downside.

---

**Decision 3: Algolia DocSearch for Production, Local Search for Development**

**Options Considered**:
- Built-in local search only
- Algolia DocSearch only
- Both (local for dev, Algolia for production)

**Trade-offs**:
- **Local only**: Free, offline-capable, but limited relevance ranking
- **Algolia only**: Excellent search UX, but requires external service, approval process
- **Both**: Best of both worlds, but dual configuration

**Rationale**: Use local search plugin for development and PR previews (instant setup). Apply for Algolia DocSearch for production (free for open-source). Meets FR-014 to FR-016 (search requirements).

---

**Decision 4: GitHub Actions for CI/CD with Preview Deployments**

**Options Considered**:
- Manual deployment via `npm run deploy`
- GitHub Actions with deploy to gh-pages branch
- Netlify/Vercel for hosting and previews

**Trade-offs**:
- **Manual**: Simple, but error-prone, no automation (violates Constitution VI)
- **GitHub Actions**: Free for public repos, integrates with GitHub Pages, PR previews possible
- **Netlify/Vercel**: Excellent preview UX, but introduces external dependency

**Rationale**: GitHub Actions meets Constitution Principle VI (zero-friction deployment, no external dependencies). Workflow triggers on push to main (production) and on PR (preview). Under 5-minute build time achievable with caching.

---

**Decision 5: Monorepo with Code Examples in `/code-examples` Directory**

**Options Considered**:
- Code snippets inline in MDX only
- Separate repository for code examples
- Monorepo with `/code-examples` directory

**Trade-offs**:
- **Inline only**: Simple, but hard to test executable code
- **Separate repo**: Testable, but link rot risk, harder to keep docs/code in sync
- **Monorepo**: Single source of truth, testable, but slightly larger repo

**Rationale**: Monorepo enables single PR to update both docs and code, CI can test code examples, students clone once. Aligns with Constitution Principle V (traceability). Structure:

```
code-examples/
├── module1/
│   ├── chapter1-example1.py
│   └── README.md
├── module2/
│   ├── kinematics_forward.py
│   ├── kinematics_inverse.py
│   └── ros2_simple_node.py
└── requirements.txt  # Pinned dependencies
```

MDX files reference code via relative paths and display with syntax highlighting + link to GitHub source.

---

## Docusaurus Configuration Research

### Essential Configuration Options

Based on Docusaurus 3.x documentation, key config settings for `docusaurus.config.js`:

```javascript
// docusaurus.config.js (ES Module syntax)
export default {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'AI Systems in the Physical World - Embodied Intelligence',
  url: 'https://<username>.github.io',
  baseUrl: '/<repo-name>/',
  organizationName: '<github-username>',
  projectName: '<repo-name>',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',  // Fail build on broken links (quality gate)
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],  // English only for MVP
  },

  presets: [
    ['classic', {
      docs: {
        sidebarPath: './sidebars.js',
        editUrl: 'https://github.com/<org>/<repo>/tree/main/',
        showLastUpdateTime: true,
        remarkPlugins: [/* math, etc */],
      },
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/<org>/<repo>/tree/main/',
      },
      theme: {
        customCss: './src/css/custom.css',
      },
    }],
  ],

  themeConfig: {
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      items: [
        {to: '/docs/intro', label: 'Book', position: 'left'},
        {to: '/blog', label: 'Updates', position: 'left'},
        {href: 'https://github.com/<org>/<repo>', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [/* community, resources */],
      copyright: `Content: CC BY 4.0 | Code: MIT License | Built with Docusaurus`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['python', 'bash', 'cpp', 'yaml'],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,  // Auto dark mode
    },
    algolia: {  // Configure when approved
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'physical-ai-book',
    },
  },

  plugins: [
    // Local search for development
    [require.resolve('@cmfcmf/docusaurus-search-local'), {
      indexDocs: true,
      indexBlog: false,
    }],
  ],
};
```

### Sidebar Configuration Strategy

**sidebars.js** defines navigation structure. Two approaches:

**Option A: Auto-generated from directory structure**
```javascript
// sidebars.js
module.exports = {
  docs: [{type: 'autogenerated', dirName: '.'}],
};
```
Pros: Zero maintenance, reflects file structure
Cons: Less control over order, grouping

**Option B: Explicit sidebar (recommended for educational content)**
```javascript
// sidebars.js
module.exports = {
  docs: [
    'intro',
    'quarter-overview',
    {
      type: 'category',
      label: 'Module 1: Introduction to Physical AI',
      collapsed: false,
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
      collapsed: false,
      items: [
        'module2/robot-kinematics',
        'module2/inverse-kinematics',
        'module2/robot-dynamics',
        'module2/control-theory',
        'module2/simulation-environments',
        'module2/case-studies',
      ],
    },
    // Module 3, Module 4 similar
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/environment-setup',
        'resources/further-reading',
        'resources/community',
      ],
    },
  ],
};
```

**Recommendation**: Use Option B (explicit sidebar) for:
- Enforcing pedagogical order (prerequisites before advanced topics)
- Clear module boundaries
- Ability to mark chapters as "Coming Soon" without breaking navigation

---

## GitHub Pages Deployment Research

### Recommended GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:  # For preview deployments

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Docusaurus site
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build/

  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Key Features**:
- Runs on push to main (production) and PRs (build validation)
- Uses npm caching to speed up builds (typically 2-3 minutes)
- Uploads build artifact for deployment
- Separate deploy job for production only

**Repository Settings Required**:
- Settings → Pages → Source: "GitHub Actions"
- Settings → Actions → General: Read and write permissions

---

## Code Testing Strategy

### Automated Code Example Validation

To meet FR-013 (code examples tested in clean environment), add CI job:

```yaml
# .github/workflows/test-code-examples.yml
name: Test Code Examples

on: [push, pull_request]

jobs:
  test-python-examples:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python 3.10
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          cd code-examples
          pip install -r requirements.txt

      - name: Run Python linting
        run: |
          pip install ruff
          ruff check code-examples/

      - name: Test Python examples (syntax check)
        run: |
          python -m py_compile code-examples/**/*.py

      # Future: Add pytest for examples with test assertions
```

**Deferred to Later Phases**:
- ROS 2 examples testing (requires ROS Docker container, adds complexity)
- Gazebo/Isaac Sim examples (requires GPU, run manually or in specialized CI)

---

## Performance Optimization Research

### Build Time Optimization

To maintain <5 minute build time (Constitution Principle VI):

1. **npm caching**: GitHub Actions cache (saves 30-60 seconds)
2. **Parallel builds**: Docusaurus supports `--parallel` flag for multiple cores
3. **Lazy loading**: Images and components load on-demand
4. **Code splitting**: Docusaurus automatically splits per route
5. **Image optimization**: Use WebP format, responsive images plugin

**Estimated build time** for MVP (Module 1 + infrastructure):
- Fresh build: ~3 minutes
- Cached build: ~1.5 minutes

**Monitoring**: Add build time reporting in GitHub Actions summary.

---

## Accessibility Research

### WCAG 2.1 Level AA Compliance

Docusaurus classic theme is mostly WCAG AA compliant out-of-box. Additional steps:

1. **Color contrast**: Use Docusaurus built-in dark mode, verify contrast ratios (FR-037)
2. **Alt text**: Enforce via CI (linter to check all `![](...)` have alt text) (FR-038)
3. **Keyboard navigation**: Test with Tab, Enter, Escape (Docusaurus handles this)
4. **Screen reader**: Test with NVDA/JAWS for major pages
5. **Lighthouse CI**: Add to GitHub Actions, require score ≥90 (SC-004)

```yaml
# Add to .github/workflows/deploy.yml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun --config=lighthouserc.json
```

---

## Interactive Component Strategy

### Three.js for 3D Visualizations (P3 User Story)

**Approach**: Create React components wrapping Three.js, register in MDX global scope.

**Example Component** (`src/components/RobotVisualization.jsx`):

```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function RobotVisualization({ modelPath, autoRotate = true }) {
  const containerRef = useRef();

  useEffect(() => {
    // Initialize Three.js scene, camera, renderer
    // Load robot model (URDF or glTF format)
    // Add OrbitControls for interaction
    // Animation loop

    return () => {
      // Cleanup
    };
  }, [modelPath]);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
}
```

**Usage in MDX**:
```mdx
# Humanoid Gait Patterns

Here's an interactive visualization of a humanoid robot's gait cycle:

<RobotVisualization modelPath="/models/humanoid.glb" autoRotate={false} />

Use your mouse to rotate the view...
```

**Performance Consideration**: Load Three.js components lazily to avoid blocking initial page load.

---

## Risk Mitigation Research

### Risk: Code Examples Become Outdated

**Mitigation Plan**:
1. Pin dependencies in `code-examples/requirements.txt` with exact versions
2. Use Dependabot to track updates
3. Run code tests in CI weekly (cron job)
4. Document deprecation process in CONTRIBUTING.md
5. Add "Last Tested" date to code example headers

### Risk: Build Time Exceeds 5 Minutes

**Monitoring**: Log build times, alert if >4 minutes
**Mitigation**:
- Profile slow builds with Docusaurus debug mode
- Consider splitting content into versions if book grows beyond 200 pages
- Optimize images (WebP, compression)

### Risk: Students Can't Run Code Locally

**Mitigation**:
1. Provide Docker/Dev Container configuration
2. Create Google Colab notebooks for Python examples (cloud alternative)
3. Add comprehensive troubleshooting guide
4. Link to pre-configured cloud environments (GitHub Codespaces, Replit)

---

## Next Steps (Phase 1)

1. **Define data model** for modules, chapters, exercises
2. **Create quickstart guide** for contributors/instructors
3. **Document API contracts** for custom React components
4. **Scaffold initial project** with `npx create-docusaurus@latest`
5. **Set up CI/CD pipeline** with GitHub Actions
6. **Develop Module 1 content** as pilot

---

## References

Based on research from:

- [Upgrading to Docusaurus v3](https://docusaurus.io/docs/migration/v3)
- [Announcing Docusaurus 3.0](https://docusaurus.io/blog/releases/3.0)
- [Meta Releases Docusaurus 3.9 with New AI Search Feature](https://www.infoq.com/news/2025/10/docusaurus-3-9-ai-search/)
- [MDX and React | Docusaurus](https://docusaurus.io/docs/markdown-features/react)
- [Deployment | Docusaurus](https://docusaurus.io/docs/deployment)
- [GitHub Actions deployment guides](https://github.com/LayZeeDK/github-pages-docusaurus)
