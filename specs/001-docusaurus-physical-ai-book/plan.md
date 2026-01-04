# Implementation Plan: Docusaurus Physical AI Interactive Book

**Branch**: `001-docusaurus-physical-ai-book` | **Date**: 2026-01-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-docusaurus-physical-ai-book/spec.md`

## Summary

Build an interactive educational book titled "Physical AI & Humanoid Robotics: AI Systems in the Physical World - Embodied Intelligence" using Docusaurus 3.x as a static site generator. The book will bridge digital AI and physical robotics, providing students with progressive learning content across 4 modules, executable Python/ROS 2 code examples, optional interactive 3D visualizations, and exercises for self-assessment. Deployment targets GitHub Pages with CI/CD automation via GitHub Actions, maintaining <5 minute build times and zero server-side dependencies.

**Technical Approach**: Use Docusaurus 3.9+ (React 18, MDX v3) with classic theme for proven documentation UX, monorepo structure with code examples in `/code-examples` for testability, explicit sidebar configuration for pedagogical ordering, and GitHub Actions for automated deployment. Interactive React components (Three.js-based visualizations) will be available in MDX via global registration. Code examples will be tested in CI to ensure reproducibility.

---

## Technical Context

**Language/Version**: JavaScript/TypeScript (ES2022), Node.js 18.x+
**Primary Dependencies**: Docusaurus 3.9+, React 18.x, MDX v3, Three.js (for 3D visualizations)
**Storage**: File-based (Markdown/MDX, JSON config), version-controlled via Git
**Testing**: Jest + React Testing Library (component tests), Lighthouse CI (accessibility/performance), Python linting/syntax checks (code examples)
**Target Platform**: Static site deployed to GitHub Pages (browser-based, cross-platform)
**Project Type**: Web documentation site (single deployable artifact)
**Performance Goals**:
- Build time <5 minutes (Constitution Principle VI)
- Lighthouse scores ≥90 for Performance, Accessibility, Best Practices, SEO (SC-004)
- Page load time <3 seconds on 3G connection
- 60 FPS for interactive 3D visualizations

**Constraints**:
- Static site only (no server-side rendering, databases, or APIs)
- GitHub Pages deployment (free, public repositories)
- Markdown-based content for version control and community contributions
- Accessibility WCAG 2.1 Level AA compliance
- Supports Chrome, Firefox, Safari, Edge (latest versions)

**Scale/Scope**:
- 4 modules × ~5-8 chapters each = ~25-30 content pages
- ~50-100 code examples (Python, ROS 2, some C++)
- ~20-30 exercises across modules
- 5-10 interactive visualizations (P3 user story)
- Est. 500-1000 images/diagrams
- Target: 10,000+ students over 5 years

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Principle I - Educational Clarity First**:
- Spec requires student-friendly explanations before formal terminology (FR-018)
- Progressive complexity enforced via explicit sidebar ordering
- Visual aids mandated in content structure (FR-020)

✅ **Principle II - Modular Content Architecture**:
- 4 modules defined with learning objectives and prerequisites (spec §Module Structure)
- Content is Markdown/MDX for portability (FR-003, FR-004)
- Docusaurus structure separates `/docs` (content), `/blog` (updates), `/src` (components)

✅ **Principle III - Bidirectional AI-Robotics Integration**:
- All modules bridge digital AI and physical robotics (spec §User Story 2, §Module Structure)
- Code examples cover simulation and real-world deployment (FR-010, FR-012)

✅ **Principle IV - Code-First Learning with Python & ROS 2**:
- Python 3.10+ and ROS 2 Humble specified (FR-009, FR-010)
- Complete, tested code examples required (FR-007, FR-013)
- Environment setup page mandated (FR-012)

✅ **Principle V - Open-Source Standards & Traceability**:
- Dual licensing: CC BY 4.0 (docs), MIT (code) (FR-040, FR-041)
- Git version control with GitHub workflows (FR-035, FR-042, FR-043)
- All content traceable to spec (this plan references spec §Requirements)

✅ **Principle VI - Deployment Simplicity to GitHub Pages**:
- Static site build (FR-031), <5 minute builds (FR-032)
- GitHub Actions CI/CD (FR-033), preview deployments (FR-034)
- No external dependencies beyond npm/GitHub (design decision in research.md)

✅ **Principle VII - Comprehensive Coverage Aligned to Curriculum**:
- 4 modules map to quarter overview (spec §Module Structure)
- Topics cover foundations, perception, control, locomotion (FR-001 to FR-006)

**Verdict**: All constitutional principles satisfied. Proceed with implementation.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-docusaurus-physical-ai-book/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (technical research)
├── data-model.md        # Phase 1 output (content schemas)
├── quickstart.md        # Phase 1 output (contributor guide)
├── contracts/           # Phase 1 output (component APIs)
│   └── component-api.md
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
<repo-name>/
├── docs/                          # All book content (MDX files)
│   ├── intro.mdx                 # Landing page
│   ├── quarter-overview.mdx      # Course overview
│   ├── module1/                  # Module 1: Introduction to Physical AI
│   │   ├── _category_.json       # Module metadata
│   │   ├── index.mdx             # Module landing page
│   │   ├── what-is-physical-ai.mdx
│   │   ├── embodied-intelligence.mdx
│   │   ├── challenges.mdx
│   │   ├── humanoid-robotics.mdx
│   │   ├── tools-overview.mdx
│   │   └── exercises/
│   │       ├── index.mdx
│   │       └── solutions.mdx
│   ├── module2/                  # Module 2: Humanoid Control Fundamentals
│   │   ├── _category_.json
│   │   ├── index.mdx
│   │   ├── robot-kinematics.mdx
│   │   ├── inverse-kinematics.mdx
│   │   ├── robot-dynamics.mdx
│   │   ├── control-theory.mdx
│   │   ├── simulation-environments.mdx
│   │   ├── case-studies.mdx
│   │   └── exercises/
│   ├── module3/                  # Module 3: Perception & Sensor Fusion
│   │   └── [similar structure]
│   ├── module4/                  # Module 4: AI for Locomotion & Manipulation
│   │   └── [similar structure]
│   └── resources/                # Shared resources
│       ├── environment-setup.mdx
│       ├── further-reading.mdx
│       ├── hardware-platforms.mdx
│       └── community.mdx
│
├── code-examples/                 # Executable code (testable in CI)
│   ├── module1/
│   │   ├── README.md
│   │   └── [example scripts]
│   ├── module2/
│   │   ├── forward-kinematics-2link.py
│   │   ├── inverse-kinematics-analytical.py
│   │   ├── ros2-simple-node.py
│   │   ├── gazebo-launch-example.py
│   │   └── exercises/
│   │       ├── ex1-starter.py
│   │       └── ex1-solution.py
│   ├── module3/
│   ├── module4/
│   └── requirements.txt           # Python dependencies (pinned versions)
│
├── static/                        # Static assets (images, models, files)
│   ├── img/
│   │   ├── logo.svg
│   │   ├── module1/
│   │   ├── module2/
│   │   └── diagrams/
│   ├── models/                    # 3D robot models for visualizations
│   │   ├── humanoid-v1.glb
│   │   └── robot-arm-2dof.urdf
│   └── files/
│       └── [downloadable resources]
│
├── src/                           # Custom React components and pages
│   ├── components/
│   │   ├── RobotVisualization.tsx      # P3: 3D robot viewer
│   │   ├── GaitAnimator.tsx            # P3: Gait animation
│   │   ├── KinematicsPlotter.tsx       # P2: Interactive plots
│   │   └── __tests__/
│   │       └── [component tests]
│   ├── css/
│   │   └── custom.css             # Theme customizations
│   ├── pages/                     # Custom pages (non-docs)
│   │   └── index.tsx              # Custom homepage (optional)
│   └── theme/
│       └── MDXComponents.js       # Global component registration
│
├── .github/
│   └── workflows/
│       ├── deploy.yml             # CI/CD: Build and deploy to GitHub Pages
│       ├── test-code-examples.yml # CI: Lint and test Python code
│       └── lighthouse.yml         # CI: Accessibility and performance checks
│
├── sidebars.js                    # Navigation structure (explicit)
├── docusaurus.config.js           # Site configuration
├── package.json                   # Node dependencies
├── tsconfig.json                  # TypeScript config
├── .gitignore
├── LICENSE                        # Dual license (CC BY 4.0 + MIT)
├── README.md                      # Project overview
├── CONTRIBUTING.md                # Contribution guidelines
└── CHANGELOG.md                   # Version history
```

**Structure Decision**: Web documentation site structure with Docusaurus classic theme. Content in `/docs` (version-controlled MDX), code examples in `/code-examples` (testable), static assets in `/static` (images, 3D models), and custom components in `/src/components`. This structure:
- Separates concerns (content vs. code vs. assets)
- Enables independent testing (docs build, code linting, component tests)
- Supports modular contributions (authors edit `/docs`, developers edit `/src`)
- Aligns with Docusaurus best practices and community conventions

---

## Complexity Tracking

**Note**: No constitutional violations requiring justification. This section left empty per template guidance ("Fill ONLY if Constitution Check has violations").

---

## Phase 0: Research & Discovery (Completed)

**Artifacts**: `specs/001-docusaurus-physical-ai-book/research.md`

**Key Findings**:
1. Docusaurus 3.9 with React 18, MDX v3, TypeScript 5.0 meets all requirements
2. Algolia DocSearch v4 (with AI search) available for production; local search plugin for dev
3. GitHub Actions workflow supports preview deployments + production deployment
4. Monorepo with `/code-examples` enables testing in CI, single source of truth
5. Three.js for 3D visualizations; OrbitControls for interaction; lazy loading for performance

**Architectural Decisions Documented**:
- Decision 1: Docusaurus 3.9+ with classic theme (vs. custom React, Jekyll, GitBook)
- Decision 2: MDX for all content (vs. plain Markdown or mixed)
- Decision 3: Algolia + local search (vs. Algolia-only or local-only)
- Decision 4: GitHub Actions CI/CD (vs. manual or Netlify/Vercel)
- Decision 5: Monorepo structure (vs. separate code repo or inline-only)

---

## Phase 1: Design & Architecture (Completed)

**Artifacts**:
- `specs/001-docusaurus-physical-ai-book/data-model.md` (content schemas, metadata formats)
- `specs/001-docusaurus-physical-ai-book/contracts/component-api.md` (React component interfaces)
- `specs/001-docusaurus-physical-ai-book/quickstart.md` (contributor onboarding)

**Data Models Defined**:
- **Module**: _category_.json schema with learning objectives, prerequisites, estimated hours
- **Chapter**: MDX frontmatter with title, description, keywords, tags, last_update
- **Code Example**: Python docstring template with dependencies, usage, expected output
- **Exercise**: Markdown template with difficulty, acceptance criteria, test cases, solution link
- **External Resource**: Link annotation format with type, why-relevant, prerequisites

**Component APIs Specified**:
- **RobotVisualization**: 3D robot viewer with joint angle controls
- **GaitAnimator**: Bipedal gait animation with parameter sliders
- **KinematicsPlotter**: Forward/inverse kinematics interactive plots
- **CodeSandbox**: Display-only code blocks with GitHub links (live editing deferred)

**Quickstart Guide Created**:
- 5-minute setup instructions
- Common tasks (add chapter, embed code, use components)
- Testing workflow
- Troubleshooting

---

## Phase 2: Implementation Phases

**Note**: Detailed task breakdown will be generated via `/sp.tasks` command. Below is a high-level roadmap organized by user story priority.

### Phase 2A: MVP Infrastructure (P1 - Browse Core Curriculum Content)

**Goal**: Deployable Docusaurus site with Module 1 content, navigation, and GitHub Pages deployment.

**Scope**:
- Scaffold Docusaurus project with `npx create-docusaurus@latest`
- Configure `docusaurus.config.js` (title, URL, GitHub Pages settings)
- Set up explicit sidebar structure in `sidebars.js`
- Create Module 1 chapters (5 chapters) with placeholder content
- Add quarter overview page
- Implement GitHub Actions workflow for deployment
- Test deployment to GitHub Pages

**Success Criteria**:
- Site accessible at `https://<username>.github.io/<repo>/`
- Module 1 chapters navigable via sidebar
- Previous/Next buttons work
- Build completes in <3 minutes
- Lighthouse scores ≥85 (will improve to ≥90 in later phases)

**Estimated Complexity**: Medium (Docusaurus setup is straightforward, but GitHub Pages config requires attention)

---

### Phase 2B: Code Examples & Setup Guide (P2 - Execute Code Examples Locally)

**Goal**: Students can run Python/ROS 2 code examples locally after following setup instructions.

**Scope**:
- Create `/code-examples` directory structure
- Write `requirements.txt` with pinned Python dependencies
- Implement 5-10 Python code examples for Module 1-2 (kinematics, simple ROS 2 node)
- Write comprehensive `docs/resources/environment-setup.mdx` (Python, ROS 2, Gazebo, Isaac Sim)
- Embed code examples in Module 2 chapters using MDX imports
- Add "Copy" button and GitHub source links
- Implement GitHub Actions workflow to test code examples (linting, syntax check)

**Success Criteria**:
- Code examples execute without errors in Python 3.10 + ROS 2 Humble environment
- Environment setup guide tested on clean Ubuntu 22.04 system
- CI passes code linting (Ruff) and syntax checks
- Students report successful local execution (pilot testing)

**Estimated Complexity**: Medium-High (ROS 2 setup complexity, dependency management)

---

### Phase 2C: Interactive Visualizations (P3 - Interact with Embedded Simulations)

**Goal**: Embed 3D robot visualizations for enhanced engagement (optional enhancement, can be deferred).

**Scope**:
- Implement `RobotVisualization.tsx` component (Three.js + OrbitControls)
- Load glTF robot models and apply joint angle configurations
- Register component in `src/theme/MDXComponents.js`
- Add 2-3 interactive visualizations in Module 2-3 chapters
- Lazy load Three.js to avoid blocking page render
- Test on mobile devices for responsiveness

**Success Criteria**:
- Visualization loads and renders robot model
- User can rotate, zoom, pan with mouse/touch
- Maintains 60 FPS during interaction
- Component is keyboard-accessible and screen-reader-friendly

**Estimated Complexity**: High (Three.js integration, performance optimization, accessibility)

**Defer Decision**: If time-constrained, defer to post-MVP and use static images as placeholders.

---

### Phase 2D: Exercises & Self-Assessment (P4 - Complete Exercises)

**Goal**: Students can test understanding with end-of-chapter exercises.

**Scope**:
- Create `docs/moduleN/exercises/index.mdx` for each module
- Write 3-5 exercises per module (15-20 total) with acceptance criteria
- Provide starter code in `/code-examples/moduleN/exercises/`
- Create solutions pages with `<details>` toggles to prevent spoilers
- Link exercises to relevant chapters

**Success Criteria**:
- Exercises clearly state difficulty, learning objectives, acceptance criteria
- Starter code helps students get started quickly
- Solutions are available but hidden by default
- Students report exercises are helpful for self-assessment (pilot feedback)

**Estimated Complexity**: Medium (content creation, depends on Module 1-4 completion)

---

### Phase 2E: External Resources & Community (P5 - Access Curated Resources)

**Goal**: Provide curated links to research, datasets, hardware, and community forums.

**Scope**:
- Create `docs/resources/further-reading.mdx` with annotated paper links
- Create `docs/resources/hardware-platforms.mdx` comparing humanoid robots
- Create `docs/resources/community.mdx` with ROS 2 forums, Discord, Stack Overflow tags
- Implement automated link checking in CI (check for 404s weekly)

**Success Criteria**:
- 20-30 curated external links across categories
- All links are valid (0% broken links in CI)
- Annotations explain why each resource is relevant

**Estimated Complexity**: Low (content curation, link checking automation)

---

### Phase 2F: Polish & Optimization

**Goal**: Achieve production-ready quality (Lighthouse ≥90, accessibility, performance).

**Scope**:
- Optimize images (WebP format, responsive images)
- Implement Lighthouse CI with score thresholds
- Add alt text to all images (automated linting)
- Test dark mode for readability and contrast
- Profile build times and optimize (caching, code splitting)
- Add Google Analytics (optional, privacy-respecting)
- Write CONTRIBUTING.md with style guide and commit conventions
- Create CHANGELOG.md

**Success Criteria**:
- Lighthouse scores ≥90 across all metrics
- 100% of images have alt text (CI enforced)
- Build time <5 minutes on GitHub Actions
- Dark mode passes WCAG AA contrast ratios
- CONTRIBUTING.md reduces friction for new contributors

**Estimated Complexity**: Medium (optimization is iterative, accessibility requires manual testing)

---

## Phase 3: Content Development (Parallel to Phase 2)

**Note**: Content development can proceed in parallel with infrastructure implementation. Writers can work in `/docs` while developers set up `/src` components.

### Module 1: Introduction to Physical AI (5 chapters)

**Chapters**:
1. What is Physical AI? From Bits to Atoms
2. Embodied Intelligence: The Body as Part of the Mind
3. Challenges in Physical AI: Sensing, Acting, Learning in Reality
4. Humanoid Robotics: Why Human Form?
5. Course Tools Overview: ROS 2, Gazebo, NVIDIA Isaac

**Dependencies**: None (foundational content)

**Estimated Effort**: 2-3 weeks (per chapter: research 2 days, writing 3 days, review 1 day)

---

### Module 2: Humanoid Control Fundamentals (6 chapters)

**Chapters**:
1. Robot Kinematics: From Joint Angles to End-Effector Poses
2. Inverse Kinematics: Solving for Desired Poses
3. Robot Dynamics: Forces, Torques, and Equations of Motion
4. Control Theory for Robotics: PID and Beyond
5. Simulation Environments: Gazebo and NVIDIA Isaac Setup
6. Simulating Humanoid Motion: Case Studies

**Dependencies**: Module 1 complete

**Estimated Effort**: 3-4 weeks (includes code examples and simulations)

---

### Module 3: Perception & Sensor Fusion (6 chapters)

**Chapters**:
1. Computer Vision for Robotics: Object Detection, Segmentation, Pose Estimation
2. Depth Perception: Stereo Vision and RGB-D Cameras
3. IMU and Sensor Fusion: Combining Multimodal Data
4. SLAM: Building Maps While Navigating
5. 3D Reconstruction for Manipulation
6. Real-Time Perception: Optimization and Hardware Acceleration

**Dependencies**: Module 1-2 complete

**Estimated Effort**: 3-4 weeks (computer vision code examples require datasets)

---

### Module 4: AI for Humanoid Locomotion & Manipulation (8 chapters)

**Chapters**:
1. Bipedal Locomotion: Gait Cycles, Stability, and Balance
2. Zero-Moment Point (ZMP) and Classical Walking Controllers
3. Reinforcement Learning for Locomotion: Policy Gradient Methods
4. Sim-to-Real Transfer: Bridging the Reality Gap
5. Manipulation with Humanoid Arms: Grasping and Object Interaction
6. Whole-Body Control: Coordinating Locomotion and Manipulation
7. Human-Robot Interaction: Safety, Intent Recognition, Collaboration
8. Ethics and Safety in Physical AI

**Dependencies**: Module 1-3 complete

**Estimated Effort**: 4-5 weeks (most complex module, includes RL training examples)

---

## Deployment Strategy

### Development Environment

- **Local development**: `npm start` (auto-reload)
- **Branch per feature**: e.g., `add-module2-kinematics`
- **PR previews**: GitHub Actions builds preview (link in PR comments)

### Staging (Preview Deployments)

- **Trigger**: Every PR opened or updated
- **URL**: Temporary preview URL (via GitHub Actions artifact or Netlify preview if integrated)
- **Purpose**: Review content/layout before merging

### Production

- **Trigger**: Merge to `main` branch
- **Deployment**: GitHub Actions builds and deploys to `gh-pages` branch
- **URL**: `https://<username>.github.io/<repo>/`
- **Rollback**: Revert commit on `main`, re-deploy

### Monitoring

- **Build status**: GitHub Actions badges in README
- **Lighthouse CI**: Scores tracked in PR checks
- **Broken links**: Weekly automated check (cron job)
- **Analytics** (optional): Google Analytics 4 (anonymized, GDPR-compliant)

---

## Testing Strategy

### Unit Tests

**Target**: Custom React components (`src/components/`)

**Tools**: Jest + React Testing Library

**Coverage**:
- Component renders without errors
- Props validation
- Interaction (click, drag, keyboard)
- Accessibility (ARIA attributes, keyboard navigation)

**CI**: Run on every PR (`npm test`)

---

### Integration Tests

**Target**: Build process, link integrity, content structure

**Tools**: Docusaurus build, custom scripts

**Coverage**:
- Site builds without errors or warnings
- All internal links resolve (no 404s)
- Sidebar structure matches content files
- Images exist and have alt text

**CI**: Run on every PR and weekly cron

---

### Code Example Tests

**Target**: Python code in `/code-examples`

**Tools**: Ruff (linting), `py_compile` (syntax), pytest (functional tests - future)

**Coverage**:
- Code passes linting (PEP 8 compliance)
- Code compiles without syntax errors
- (Future) Functional tests with assertions

**CI**: Run on every PR touching `code-examples/`

---

### Accessibility Tests

**Target**: Published site pages

**Tools**: Lighthouse CI, axe DevTools

**Coverage**:
- WCAG 2.1 Level AA compliance
- Color contrast ratios ≥4.5:1
- Keyboard navigation
- Screen reader compatibility

**CI**: Lighthouse CI on every PR (scores ≥90 required)

**Manual**: axe DevTools on major pages before release

---

### Performance Tests

**Target**: Published site

**Tools**: Lighthouse CI, WebPageTest

**Coverage**:
- Page load time <3 seconds (3G connection)
- First Contentful Paint (FCP) <1.5s
- Time to Interactive (TTI) <3.5s
- Build time <5 minutes

**CI**: Lighthouse CI on every PR

**Manual**: WebPageTest monthly for regression checks

---

## Risk Management

### Risk 1: Code Examples Break Due to Dependency Updates

**Likelihood**: High | **Impact**: High

**Mitigation**:
- Pin exact versions in `requirements.txt` (e.g., `numpy==1.24.3`)
- Enable Dependabot for security updates only
- Weekly cron job in CI to test all code examples
- Document deprecation process in CONTRIBUTING.md
- Maintain CHANGELOG tracking dependency updates

**Contingency**: If critical dependency deprecated, add migration guide and update all affected examples in single PR.

---

### Risk 2: Build Time Exceeds 5 Minutes

**Likelihood**: Medium | **Impact**: Medium

**Mitigation**:
- Enable npm caching in GitHub Actions (saves 30-60s)
- Profile slow builds with `DEBUG=true npm run build`
- Optimize images (WebP, compression) before adding to `/static`
- Defer large assets (videos, high-poly 3D models) to external hosting
- Monitor build times in CI logs, alert if >4 minutes

**Contingency**: If builds slow despite optimizations, consider content versioning (split into semesters) or incremental builds (Docusaurus supports this).

---

### Risk 3: Students Cannot Install ROS 2 Locally

**Likelihood**: Medium | **Impact**: High (blocks P2 user story)

**Mitigation**:
- Provide multiple installation paths: native (Ubuntu), Docker, WSL2 (Windows)
- Test setup guide on clean Ubuntu 22.04, Windows 11, macOS (via Docker)
- Create pre-configured Dev Container (VS Code Remote Containers)
- Link to cloud alternatives: GitHub Codespaces, Google Colab (for Python-only examples)
- Add comprehensive troubleshooting section with common errors

**Contingency**: If ROS 2 setup proves too complex for students, prioritize Python-only examples for kinematics/control, defer ROS 2 to Module 4 (advanced topics).

---

### Risk 4: Interactive Visualizations Are Too Complex to Implement

**Likelihood**: Medium | **Impact**: Low (P3 is enhancement, not MVP)

**Mitigation**:
- Start with simple 2D plots (Plotly.js, easier than Three.js)
- Use pre-built libraries (react-three-fiber, robotics-specific viz tools)
- Limit scope: 2-3 visualizations for MVP, expand later
- Defer if time-constrained: use static images with links to external demos

**Contingency**: If visualizations prove too complex, defer to Phase 3 (post-MVP) and use annotated screenshots of external tools (Gazebo, Isaac Sim).

---

### Risk 5: Low Community Engagement / Contributions

**Likelihood**: Medium | **Impact**: Low (book valuable even without external contributions)

**Mitigation**:
- Write excellent CONTRIBUTING.md (reduce friction)
- Label "good first issue" for newcomers (typo fixes, add diagrams)
- Promote in ROS 2 forums, Reddit (r/robotics, r/MachineLearning), Twitter
- Highlight contributors in CONTRIBUTORS.md
- Respond quickly to issues/PRs (encourage participation)

**Contingency**: If few contributors, focus on instructor/TA contributions from courses using the book. External contributions are bonus, not requirement.

---

## Monitoring & Maintenance

### Build Health

- **GitHub Actions status**: Badge in README
- **Build time tracking**: Log in CI summary, alert if >4 minutes
- **Dependency updates**: Dependabot weekly (security only), manual review for major versions

### Content Freshness

- **Link checking**: Weekly cron job (automated via GitHub Actions)
- **Dependency versions**: Annual review (per Constitution governance)
- **Content review**: Flag deprecated content during annual constitution review
- **Student feedback**: GitHub Discussions for questions/suggestions

### Performance Monitoring

- **Lighthouse CI**: Every PR (scores ≥90 enforced)
- **WebPageTest**: Monthly manual checks for regression
- **Analytics** (if enabled): Track popular pages, bounce rates, search queries

### Security

- **Dependabot alerts**: Auto-enabled for GitHub repos
- **npm audit**: Run in CI on every PR
- **Code scanning**: GitHub CodeQL (automatic for public repos)
- **Secrets management**: Never commit API keys (use GitHub Secrets for Algolia, etc.)

---

## Success Metrics (Revisited from Spec)

### Build & Deployment Metrics

- ✅ **SC-003**: Docusaurus build completes without errors or warnings in <5 minutes
- ✅ **SC-009**: CI/CD pipeline deploys to GitHub Pages within 10 minutes of merge

### Quality Metrics

- ✅ **SC-004**: Lighthouse score ≥90 for Performance, Accessibility, Best Practices, SEO
- ✅ **SC-005**: 0% broken internal links (automated checks)
- ✅ **SC-010**: 100% of images include descriptive alt text (validated in CI)

### User Experience Metrics

- ✅ **SC-001**: Students navigate from homepage to any chapter in ≤3 clicks
- ✅ **SC-006**: Site loads on Chrome, Firefox, Safari, Edge (latest versions)
- ✅ **SC-007**: Mobile users (viewport <768px) can read without horizontal scrolling

### Code Quality Metrics

- ✅ **SC-002**: 90% of code examples execute successfully in clean Python 3.10 + ROS 2 Humble environment
- ✅ **SC-008**: Search returns relevant results for 95% of common queries

### Educational Metrics

- ✅ **SC-011**: Students complete environment setup in <30 minutes (pilot testing)
- ✅ **SC-012**: Students understand 80% of content on first read (comprehension quizzes)
- ✅ **SC-013**: Community contributors submit 5+ PRs in first quarter (adoption signal)

### Adoption Metrics

- ✅ **SC-014**: Book serves as primary text for ≥1 Physical AI course (instructor adoption)
- ✅ **SC-015**: Content coverage aligns 100% with quarter overview (traceable mapping)
- ✅ **SC-016**: Annual content refresh completed (governance compliance)

---

## Next Steps

1. **Execute `/sp.tasks`**: Generate dependency-ordered task list organized by user story (P1 → P5)

2. **Scaffold Docusaurus Project**:
   ```bash
   npx create-docusaurus@latest humanoid-ai-book classic --typescript
   ```

3. **Implement Phase 2A (MVP Infrastructure)**:
   - Configure `docusaurus.config.js` with GitHub Pages settings
   - Set up explicit sidebar in `sidebars.js`
   - Create Module 1 chapter placeholders
   - Implement GitHub Actions workflow

4. **Pilot Module 1 Content**:
   - Write and review Chapter 1-2 (full content)
   - Test with sample students for comprehension
   - Iterate based on feedback before scaling to Module 2-4

5. **Set Up CI/CD Pipeline**:
   - GitHub Actions: deploy.yml (build + deploy)
   - GitHub Actions: test-code-examples.yml (Python linting)
   - GitHub Actions: lighthouse.yml (performance + accessibility)

6. **Parallel Content Development**:
   - Writers develop Module 1 content
   - Developers implement infrastructure
   - Sync weekly to resolve blockers

---

## Appendix: Technologies & Tools

### Core Stack

- **Docusaurus**: 3.9+ (static site generator)
- **React**: 18.x (UI library)
- **MDX**: v3 (Markdown with JSX)
- **TypeScript**: 5.0+ (type safety)
- **Node.js**: 18.x+ (runtime)

### Content Tools

- **Prism.js**: Syntax highlighting (Docusaurus default)
- **KaTeX**: Math rendering (plugin: `remark-math`, `rehype-katex`)
- **Mermaid**: Diagrams (plugin: `@docusaurus/theme-mermaid`)
- **Algolia DocSearch**: Search (free for open-source)

### Interactive Components

- **Three.js**: 3D visualizations (robot models)
- **react-three-fiber**: React wrapper for Three.js
- **OrbitControls**: Camera interaction
- **Plotly.js**: 2D plots (alternative to Three.js for simpler viz)

### Development Tools

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Ruff**: Python linting
- **pytest**: Python testing (future)

### CI/CD Tools

- **GitHub Actions**: CI/CD automation
- **Lighthouse CI**: Performance and accessibility
- **Dependabot**: Dependency updates
- **GitHub Pages**: Free static hosting

### Deployment

- **gh-pages**: npm package for deploying to GitHub Pages branch
- **GitHub Actions**: `actions/deploy-pages@v4` (official deployment action)

---

## Conclusion

This plan provides a comprehensive roadmap for building a production-ready, educational Docusaurus site for Physical AI & Humanoid Robotics. By following phased implementation (P1 MVP → P5 enhancements), the project delivers value incrementally while maintaining constitutional compliance and meeting all success criteria. The combination of proven tools (Docusaurus, React, GitHub Actions), modular architecture, and comprehensive testing ensures a maintainable, accessible, and performant learning resource for students worldwide.

**Estimated Timeline**:
- **Phase 2A (MVP Infrastructure)**: 1 week
- **Phase 2B (Code Examples)**: 2 weeks
- **Phase 2C (Visualizations)**: 2 weeks (or defer)
- **Phase 2D (Exercises)**: 1 week
- **Phase 2E (Resources)**: 1 week
- **Phase 2F (Polish)**: 1 week
- **Content Development (Modules 1-4)**: 12-16 weeks (parallel to infrastructure)

**Total**: ~4 months to production-ready MVP (Modules 1-2) + 6 months for complete 4-module book.

**Ready for `/sp.tasks` to generate detailed, dependency-ordered task list.**
