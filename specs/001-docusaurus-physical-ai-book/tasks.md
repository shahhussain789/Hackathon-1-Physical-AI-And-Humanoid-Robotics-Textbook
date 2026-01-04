# Tasks: Docusaurus Physical AI Interactive Book

**Input**: Design documents from `/specs/001-docusaurus-physical-ai-book/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the specification. Focus on implementation and manual validation per user story acceptance criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story (P1→P5).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

This is a web documentation site using Docusaurus:
- **Content**: `docs/` at repository root
- **Code examples**: `code-examples/` at repository root
- **Static assets**: `static/` at repository root
- **Components**: `src/components/` at repository root
- **CI/CD**: `.github/workflows/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Docusaurus structure

- [ ] T001 Scaffold Docusaurus project with `npx create-docusaurus@latest humanoid-ai-book classic --typescript`
- [ ] T002 Configure docusaurus.config.js with site title, tagline, URL, GitHub Pages deployment settings
- [ ] T003 [P] Create explicit sidebar structure in sidebars.js for 4 modules
- [ ] T004 [P] Initialize package.json with required dependencies (Docusaurus 3.9+, React 18, Three.js)
- [ ] T005 [P] Create .gitignore for node_modules, build, .docusaurus cache
- [ ] T006 [P] Create LICENSE file with dual licensing (CC BY 4.0 for docs, MIT for code)
- [ ] T007 [P] Create README.md with project overview and quickstart
- [ ] T008 [P] Create CONTRIBUTING.md with contribution guidelines and style guide
- [ ] T009 [P] Create CHANGELOG.md for version tracking

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Create docs/ directory structure with placeholders for 4 modules
- [ ] T011 [P] Create code-examples/ directory structure with subdirectories for module1-4
- [ ] T012 [P] Create static/img/ directory structure with subdirectories for module1-4
- [ ] T013 [P] Create static/models/ directory for 3D robot models
- [ ] T014 [P] Create src/components/ directory for custom React components
- [ ] T015 [P] Create src/css/custom.css for theme customizations
- [ ] T016 [P] Create src/theme/MDXComponents.js for global component registration
- [ ] T017 Setup GitHub Actions workflow in .github/workflows/deploy.yml for GitHub Pages deployment
- [ ] T018 [P] Setup GitHub Actions workflow in .github/workflows/test-code-examples.yml for Python code validation
- [ ] T019 [P] Setup GitHub Actions workflow in .github/workflows/lighthouse.yml for accessibility/performance checks
- [ ] T020 Create code-examples/requirements.txt with pinned Python dependencies (numpy, scipy, matplotlib, etc.)
- [ ] T021 Configure tsconfig.json for TypeScript type checking
- [ ] T022 [P] Install and configure local search plugin (@cmfcmf/docusaurus-search-local) for development
- [ ] T023 Test local development server with `npm start` and verify site loads

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Core Curriculum Content (Priority: P1) 🎯 MVP

**Goal**: Deploy a browsable Docusaurus site with Module 1 content, navigation, and GitHub Pages deployment so students can navigate the interactive book and learn Physical AI fundamentals.

**Independent Test**: Deploy Docusaurus site with Module 1 content, navigate the sidebar, read chapters, verify all internal links work, and confirm homepage displays book title and quarter overview.

### Implementation for User Story 1

#### Homepage & Quarter Overview

- [ ] T024 [P] [US1] Create docs/intro.mdx as landing page with book title and welcome message
- [ ] T025 [P] [US1] Create docs/quarter-overview.mdx with quarter overview text from spec FR-002
- [ ] T026 [US1] Update sidebars.js to include intro and quarter-overview at top level

#### Module 1 Structure

- [ ] T027 [P] [US1] Create docs/module1/_category_.json with module metadata (learning objectives, prerequisites)
- [ ] T028 [P] [US1] Create docs/module1/index.mdx as Module 1 landing page
- [ ] T029 [US1] Add Module 1 to sidebars.js with all 5 chapters

#### Module 1 Chapters (Content Placeholders for MVP)

- [ ] T030 [P] [US1] Create docs/module1/what-is-physical-ai.mdx with chapter frontmatter and placeholder content
- [ ] T031 [P] [US1] Create docs/module1/embodied-intelligence.mdx with chapter frontmatter and placeholder content
- [ ] T032 [P] [US1] Create docs/module1/challenges.mdx with chapter frontmatter and placeholder content
- [ ] T033 [P] [US1] Create docs/module1/humanoid-robotics.mdx with chapter frontmatter and placeholder content
- [ ] T034 [P] [US1] Create docs/module1/tools-overview.mdx with chapter frontmatter and placeholder content

#### Navigation & Search

- [ ] T035 [US1] Verify Previous/Next navigation buttons appear on all chapter pages
- [ ] T036 [US1] Test local search functionality across Module 1 content
- [ ] T037 [US1] Verify sidebar highlights current location when navigating chapters

#### Deployment

- [ ] T038 [US1] Configure GitHub repository settings for GitHub Pages (Source: GitHub Actions)
- [ ] T039 [US1] Test GitHub Actions deployment workflow by pushing to main branch
- [ ] T040 [US1] Verify site is accessible at https://<username>.github.io/<repo>/
- [ ] T041 [US1] Test site on mobile device (viewport <768px) for responsive layout

#### Content Refinement for Module 1 Chapter 1-2 (Pilot Content)

- [ ] T042 [US1] Write full content for docs/module1/what-is-physical-ai.mdx following Constitution Principle I (student-friendly explanations)
- [ ] T043 [US1] Write full content for docs/module1/embodied-intelligence.mdx with visual aids and examples
- [ ] T044 [US1] Add at least 2 diagrams/images to Chapter 1 in static/img/module1/ with descriptive alt text
- [ ] T045 [US1] Add at least 2 diagrams/images to Chapter 2 in static/img/module1/ with descriptive alt text
- [ ] T046 [US1] Validate internal links in Module 1 chapters work correctly

**Checkpoint**: At this point, User Story 1 should be fully functional - students can browse Module 1 content, navigate via sidebar, and access the deployed site. This is the **MVP**.

---

## Phase 4: User Story 2 - Execute Code Examples Locally (Priority: P2)

**Goal**: Enable students to run Python and ROS 2 code examples locally by providing embedded code snippets, environment setup instructions, and tested example scripts.

**Independent Test**: Provide Module 2 with embedded Python/ROS 2 code snippets, setup instructions in docs/resources/environment-setup.mdx, and verify code executes in a clean Python 3.10 + ROS 2 Humble environment.

### Implementation for User Story 2

#### Environment Setup Guide

- [ ] T047 [P] [US2] Create docs/resources/ directory
- [ ] T048 [US2] Create docs/resources/environment-setup.mdx with step-by-step Python 3.10+ installation instructions
- [ ] T049 [US2] Add ROS 2 Humble installation instructions (Ubuntu, Docker, WSL2) to environment-setup.mdx
- [ ] T050 [US2] Add Gazebo installation instructions to environment-setup.mdx
- [ ] T051 [US2] Add NVIDIA Isaac Sim setup (with cloud alternatives) to environment-setup.mdx
- [ ] T052 [US2] Add troubleshooting section for common environment setup issues
- [ ] T053 [US2] Add resources/environment-setup to sidebars.js under Resources category

#### Code Examples for Module 2

- [ ] T054 [P] [US2] Create code-examples/module2/forward-kinematics-2link.py with docstring header and complete implementation
- [ ] T055 [P] [US2] Create code-examples/module2/inverse-kinematics-analytical.py with docstring header and complete implementation
- [ ] T056 [P] [US2] Create code-examples/module2/ros2-simple-node.py demonstrating basic ROS 2 publisher/subscriber
- [ ] T057 [P] [US2] Create code-examples/module2/gazebo-launch-example.py for launching Gazebo simulation
- [ ] T058 [P] [US2] Add inline comments to all code examples explaining non-obvious logic per FR-011
- [ ] T059 [US2] Update code-examples/requirements.txt with dependencies for Module 2 examples (numpy, scipy, etc.)

#### Module 2 Structure & Content

- [ ] T060 [P] [US2] Create docs/module2/_category_.json with module metadata
- [ ] T061 [P] [US2] Create docs/module2/index.mdx as Module 2 landing page
- [ ] T062 [US2] Add Module 2 to sidebars.js with all 6 chapters

#### Module 2 Chapters with Embedded Code

- [ ] T063 [P] [US2] Create docs/module2/robot-kinematics.mdx with embedded forward-kinematics-2link.py using MDX import
- [ ] T064 [P] [US2] Create docs/module2/inverse-kinematics.mdx with embedded inverse-kinematics-analytical.py
- [ ] T065 [P] [US2] Create docs/module2/robot-dynamics.mdx with placeholder content
- [ ] T066 [P] [US2] Create docs/module2/control-theory.mdx with placeholder content
- [ ] T067 [P] [US2] Create docs/module2/simulation-environments.mdx with embedded gazebo-launch-example.py
- [ ] T068 [P] [US2] Create docs/module2/case-studies.mdx with placeholder content

#### Code Testing & Validation

- [ ] T069 [US2] Test GitHub Actions workflow for Python code validation (linting with Ruff, syntax check)
- [ ] T070 [US2] Verify all Module 2 code examples execute without errors in clean Python 3.10 environment
- [ ] T071 [US2] Add "Copy to Clipboard" button verification for all code blocks (Docusaurus default feature)
- [ ] T072 [US2] Add GitHub source links below each embedded code example

#### Code Example Usage Documentation

- [ ] T073 [US2] Add usage instructions to each code example docstring (command to run, expected output)
- [ ] T074 [US2] Create code-examples/module2/README.md explaining how to run examples
- [ ] T075 [US2] Link README from Module 2 index page

**Checkpoint**: At this point, User Story 2 should be fully functional - students can execute code examples locally after following setup guide, and all examples are tested in CI.

---

## Phase 5: User Story 3 - Interact with Embedded Simulations & Visualizations (Priority: P3)

**Goal**: Embed interactive 3D visualizations for enhanced engagement, allowing students to interact with robot models and simulations directly in the browser.

**Independent Test**: Embed one interactive visualization (RobotVisualization component) in Module 3 content, verify it loads, and confirm user can rotate/zoom/interact with 3D robot model.

### Implementation for User Story 3

#### Interactive Component: RobotVisualization

- [ ] T076 [P] [US3] Install Three.js and react-three-fiber dependencies via npm
- [ ] T077 [US3] Create src/components/RobotVisualization.tsx with TypeScript interface from contracts/component-api.md
- [ ] T078 [US3] Implement Three.js scene setup (camera, renderer, lights) in RobotVisualization component
- [ ] T079 [US3] Implement glTF model loading with error handling and loading spinner
- [ ] T080 [US3] Implement OrbitControls for mouse/touch interaction (rotate, zoom, pan)
- [ ] T081 [US3] Implement joint angle configuration prop to update robot pose
- [ ] T082 [US3] Add lazy loading to avoid blocking page render
- [ ] T083 [US3] Add accessibility features (ARIA labels, keyboard controls, screen reader announcements)
- [ ] T084 [US3] Test component on mobile device for touch responsiveness
- [ ] T085 [US3] Register RobotVisualization in src/theme/MDXComponents.js for global MDX usage

#### 3D Robot Models

- [ ] T086 [P] [US3] Source or create humanoid-v1.glb 3D model and place in static/models/
- [ ] T087 [P] [US3] Source or create robot-arm-2dof.urdf/glb and place in static/models/
- [ ] T088 [US3] Optimize 3D models for web (reduce polygon count, compress textures)

#### Module 3 Structure & Interactive Content

- [ ] T089 [P] [US3] Create docs/module3/_category_.json with module metadata
- [ ] T090 [P] [US3] Create docs/module3/index.mdx as Module 3 landing page
- [ ] T091 [US3] Add Module 3 to sidebars.js with all 6 chapters

#### Module 3 Chapters with Visualizations

- [ ] T092 [P] [US3] Create docs/module3/computer-vision.mdx with placeholder content
- [ ] T093 [P] [US3] Create docs/module3/depth-perception.mdx with placeholder content
- [ ] T094 [US3] Create docs/module3/sensor-fusion.mdx with embedded RobotVisualization showing IMU data overlay
- [ ] T095 [P] [US3] Create docs/module3/slam.mdx with placeholder content
- [ ] T096 [P] [US3] Create docs/module3/3d-reconstruction.mdx with placeholder content
- [ ] T097 [P] [US3] Create docs/module3/real-time-perception.mdx with placeholder content

#### Visualization Testing

- [ ] T098 [US3] Verify RobotVisualization component renders without errors in at least one Module 3 chapter
- [ ] T099 [US3] Test 3D model interaction (rotate, zoom, pan) in browser
- [ ] T100 [US3] Verify visualization maintains 60 FPS during interaction (use browser DevTools Performance tab)
- [ ] T101 [US3] Test visualization on mobile device (responsive scaling, touch controls)

**Checkpoint**: At this point, User Story 3 should be fully functional - students can interact with embedded 3D visualizations in Module 3.

---

## Phase 6: User Story 4 - Complete Exercises & Mini-Projects (Priority: P4)

**Goal**: Provide end-of-chapter exercises for self-assessment, including problem descriptions, acceptance criteria, starter code, and optional solutions.

**Independent Test**: Include exercises in Module 1 with instructions, acceptance criteria, and solution pages, then verify students can access exercises and solutions.

### Implementation for User Story 4

#### Exercise Infrastructure

- [ ] T102 [P] [US4] Create docs/module1/exercises/ subdirectory
- [ ] T103 [P] [US4] Create docs/module2/exercises/ subdirectory
- [ ] T104 [P] [US4] Create code-examples/module1/exercises/ for starter code
- [ ] T105 [P] [US4] Create code-examples/module2/exercises/ for starter code

#### Module 1 Exercises

- [ ] T106 [US4] Create docs/module1/exercises/index.mdx with 3-5 exercises for Module 1
- [ ] T107 [US4] Write Exercise 1 with difficulty, learning objectives, acceptance criteria, test cases
- [ ] T108 [US4] Write Exercise 2 with difficulty, learning objectives, acceptance criteria, test cases
- [ ] T109 [US4] Write Exercise 3 with difficulty, learning objectives, acceptance criteria, test cases
- [ ] T110 [US4] Create code-examples/module1/exercises/ex1-starter.py with starter template
- [ ] T111 [US4] Create code-examples/module1/exercises/ex1-solution.py with complete solution
- [ ] T112 [US4] Create docs/module1/exercises/solutions.mdx with solutions wrapped in `<details>` toggles
- [ ] T113 [US4] Link exercises from Module 1 index page and add to sidebars.js

#### Module 2 Exercises (Kinematics Focus)

- [ ] T114 [US4] Create docs/module2/exercises/index.mdx with 3-5 exercises for Module 2
- [ ] T115 [US4] Write Exercise 1: Forward Kinematics for 3-link arm with acceptance criteria
- [ ] T116 [US4] Write Exercise 2: Inverse Kinematics for 2-link arm with test cases
- [ ] T117 [US4] Write Exercise 3: ROS 2 publisher/subscriber mini-project with learning objectives
- [ ] T118 [US4] Create code-examples/module2/exercises/ex1-starter.py (3-link FK)
- [ ] T119 [US4] Create code-examples/module2/exercises/ex2-starter.py (2-link IK)
- [ ] T120 [US4] Create code-examples/module2/exercises/ex1-solution.py (3-link FK solution)
- [ ] T121 [US4] Create code-examples/module2/exercises/ex2-solution.py (2-link IK solution)
- [ ] T122 [US4] Create docs/module2/exercises/solutions.mdx with solutions wrapped in toggles
- [ ] T123 [US4] Link exercises from Module 2 index page and add to sidebars.js

#### Exercise Validation

- [ ] T124 [US4] Verify all exercise starter code runs without errors
- [ ] T125 [US4] Verify all solution code produces expected output per test cases
- [ ] T126 [US4] Test toggle functionality for solutions (hidden by default, click to reveal)

**Checkpoint**: At this point, User Story 4 should be fully functional - students can complete exercises and check solutions.

---

## Phase 7: User Story 5 - Access Curated External Resources (Priority: P5)

**Goal**: Provide curated links to research papers, datasets, hardware platforms, and community forums for extended learning.

**Independent Test**: Add "Further Reading" section to Module 2-4 with annotated links, verify all links are valid, and confirm automated link checking in CI.

### Implementation for User Story 5

#### Resource Pages

- [ ] T127 [P] [US5] Create docs/resources/further-reading.mdx with annotated links to research papers
- [ ] T128 [P] [US5] Create docs/resources/hardware-platforms.mdx comparing humanoid robots (Unitree, Boston Dynamics, etc.)
- [ ] T129 [P] [US5] Create docs/resources/community.mdx with links to ROS 2 forums, Discord, Stack Overflow
- [ ] T130 [US5] Add all resource pages to sidebars.js under Resources category (collapsible)

#### Curated Links for Research Papers

- [ ] T131 [P] [US5] Add 5-10 annotated links to seminal papers on Physical AI to further-reading.mdx
- [ ] T132 [P] [US5] Add 5-10 annotated links to humanoid locomotion papers (DeepMimic, etc.)
- [ ] T133 [P] [US5] Add 5-10 annotated links to perception/SLAM papers
- [ ] T134 [US5] Ensure all paper links include: title, authors, year, link, annotation (why relevant), prerequisites

#### Curated Links for Datasets & Code

- [ ] T135 [P] [US5] Add links to public datasets (CMU Motion Capture, etc.) to further-reading.mdx
- [ ] T136 [P] [US5] Add links to GitHub repositories with RL/robotics implementations
- [ ] T137 [US5] Ensure all GitHub links include: repository name, description, annotation, prerequisites

#### Hardware Platforms Comparison

- [ ] T138 [P] [US5] Research and document Unitree humanoid specs, price, academic access in hardware-platforms.mdx
- [ ] T139 [P] [US5] Research and document Boston Dynamics Spot/Atlas specs in hardware-platforms.mdx
- [ ] T140 [P] [US5] Research and document Agility Robotics Digit specs in hardware-platforms.mdx
- [ ] T141 [US5] Create comparison table with specs, prices, availability, academic programs

#### Community Resources

- [ ] T142 [P] [US5] Add ROS 2 Discourse forum link with description to community.mdx
- [ ] T143 [P] [US5] Add robotics-related Discord servers (if public) to community.mdx
- [ ] T144 [P] [US5] Add Stack Overflow tags (ros2, robotics, physical-ai) to community.mdx
- [ ] T145 [US5] Add activity guidelines and etiquette for each community platform

#### Automated Link Checking

- [ ] T146 [US5] Setup weekly cron job in GitHub Actions to check for broken external links
- [ ] T147 [US5] Configure link checker to fail CI if >5% of links are broken
- [ ] T148 [US5] Test link checker on all resource pages and fix any broken links

**Checkpoint**: At this point, User Story 5 should be fully functional - students can access curated external resources and all links are validated weekly.

---

## Phase 8: Module 4 Structure (Completing Content Framework)

**Purpose**: Create Module 4 structure to complete the 4-module framework (content can be filled iteratively)

- [ ] T149 [P] Create docs/module4/_category_.json with module metadata for AI for Locomotion & Manipulation
- [ ] T150 [P] Create docs/module4/index.mdx as Module 4 landing page
- [ ] T151 Add Module 4 to sidebars.js with all 8 chapters

#### Module 4 Chapter Placeholders

- [ ] T152 [P] Create docs/module4/bipedal-locomotion.mdx with placeholder content
- [ ] T153 [P] Create docs/module4/zmp-controllers.mdx with placeholder content
- [ ] T154 [P] Create docs/module4/rl-locomotion.mdx with placeholder content
- [ ] T155 [P] Create docs/module4/sim-to-real.mdx with placeholder content
- [ ] T156 [P] Create docs/module4/manipulation.mdx with placeholder content
- [ ] T157 [P] Create docs/module4/whole-body-control.mdx with placeholder content
- [ ] T158 [P] Create docs/module4/human-robot-interaction.mdx with placeholder content
- [ ] T159 [P] Create docs/module4/ethics-safety.mdx with placeholder content

**Checkpoint**: All 4 modules now have structure in place. Content can be developed iteratively.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality gates

### Accessibility & Performance

- [ ] T160 [P] Run Lighthouse CI and ensure scores ≥90 for Performance, Accessibility, Best Practices, SEO
- [ ] T161 [P] Add alt text to all images in static/img/ (validate with automated linter)
- [ ] T162 [P] Test dark mode across all pages and verify WCAG AA contrast ratios
- [ ] T163 [P] Test keyboard navigation (Tab, Enter, Escape) across all interactive elements
- [ ] T164 [P] Optimize images to WebP format where possible to reduce page load time
- [ ] T165 Test site on Chrome, Firefox, Safari, Edge (latest versions)

### Build Optimization

- [ ] T166 [P] Profile build times and ensure <5 minutes on GitHub Actions
- [ ] T167 [P] Enable npm caching in GitHub Actions to speed up builds
- [ ] T168 Verify build completes without errors or warnings

### Documentation & Community

- [ ] T169 [P] Update README.md with badges (build status, license, Lighthouse scores)
- [ ] T170 [P] Verify CONTRIBUTING.md is complete with style guide and commit conventions
- [ ] T171 [P] Add "Good First Issue" labels guide to CONTRIBUTING.md
- [ ] T172 [P] Create CONTRIBUTORS.md to highlight community contributors (placeholder for future)
- [ ] T173 Update CHANGELOG.md with initial v1.0.0 release notes

### Search Enhancement (Optional - Apply for Algolia)

- [ ] T174 Apply for Algolia DocSearch for production (free for open-source)
- [ ] T175 Configure Algolia in docusaurus.config.js once approved
- [ ] T176 Test Algolia search functionality and verify better relevance than local search

### Analytics (Optional)

- [ ] T177 Configure Google Analytics 4 (optional, privacy-respecting, anonymized)
- [ ] T178 Add analytics configuration to docusaurus.config.js

### Final Validation

- [ ] T179 Run quickstart.md validation by having a new contributor follow setup steps
- [ ] T180 Validate all user story acceptance criteria from spec.md are met
- [ ] T181 Test complete user journey: homepage → Module 1 → code example → exercise → resources
- [ ] T182 Verify GitHub Pages deployment is stable and site is accessible
- [ ] T183 Tag repository with v1.0.0 and create GitHub release

**Checkpoint**: Production-ready MVP complete with all P1-P2 user stories fully functional, P3-P5 implemented, and quality gates passed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Story 1 (Phase 3 - P1)**: Depends on Foundational (Phase 2) - **MVP priority**
- **User Story 2 (Phase 4 - P2)**: Depends on Foundational (Phase 2) - Can start in parallel with US1 if staffed
- **User Story 3 (Phase 5 - P3)**: Depends on Foundational (Phase 2) - Enhancement, can be deferred
- **User Story 4 (Phase 6 - P4)**: Depends on Foundational (Phase 2) - Depends on Module 1-2 content for exercises
- **User Story 5 (Phase 7 - P5)**: Depends on Foundational (Phase 2) - Independent of other user stories
- **Module 4 (Phase 8)**: Independent - can be done anytime after Foundational
- **Polish (Phase 9)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - **No dependencies on other stories**
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - **Independent** (builds Module 2, US1 is Module 1)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - **Independent** (builds Module 3)
- **User Story 4 (P4)**: Needs Module 1-2 content from US1 and US2 for exercises - **Depends on US1, US2 content**
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - **Independent** (resource pages)

### Within Each User Story

- Content creation tasks marked [P] can run in parallel (different files)
- Configuration tasks (sidebars.js, docusaurus.config.js) must be sequential
- Module structure before chapter content
- Core chapters before exercises
- Code examples can be developed in parallel with documentation

### Parallel Opportunities

**Phase 1 - Setup**: T003, T004, T005, T006, T007, T008, T009 can all run in parallel

**Phase 2 - Foundational**: T011, T012, T013, T014, T015, T016, T018, T019, T022 can run in parallel after T010

**Phase 3 - User Story 1**:
- T024, T025, T027, T028 can run in parallel
- T030, T031, T032, T033, T034 (all Module 1 chapters) can run in parallel
- T044, T045 (images) can run in parallel with content writing

**Phase 4 - User Story 2**:
- T054, T055, T056, T057 (all code examples) can run in parallel
- T063, T064, T065, T066, T067, T068 (all Module 2 chapters) can run in parallel

**Phase 5 - User Story 3**:
- T086, T087 (3D models) can be sourced in parallel
- T092, T093, T095, T096, T097 (Module 3 chapters) can run in parallel

**Phase 6 - User Story 4**:
- T102, T103, T104, T105 (directory creation) can run in parallel
- Starter code and solutions for different exercises can be developed in parallel

**Phase 7 - User Story 5**:
- T127, T128, T129 (resource pages) can be created in parallel
- T131, T132, T133 (curated links) can be researched and added in parallel
- T138, T139, T140 (hardware research) can run in parallel

**Phase 9 - Polish**: T160, T161, T162, T163, T164, T169, T170, T171, T172 can run in parallel

---

## Parallel Example: User Story 1 (Module 1 Chapters)

```bash
# Launch all Module 1 chapter creation together:
Task: "Create docs/module1/what-is-physical-ai.mdx with chapter frontmatter and placeholder content"
Task: "Create docs/module1/embodied-intelligence.mdx with chapter frontmatter and placeholder content"
Task: "Create docs/module1/challenges.mdx with chapter frontmatter and placeholder content"
Task: "Create docs/module1/humanoid-robotics.mdx with chapter frontmatter and placeholder content"
Task: "Create docs/module1/tools-overview.mdx with chapter frontmatter and placeholder content"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - Recommended Initial Approach

1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T023) - **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 1 (T024-T046)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Navigate homepage → quarter overview → Module 1 chapters
   - Verify sidebar navigation, Previous/Next buttons
   - Test search across Module 1 content
   - Confirm site deploys to GitHub Pages
   - Validate acceptance criteria from spec.md
5. Deploy/demo if ready - **This is the MVP!**

### Incremental Delivery (Build on MVP)

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Module 1) → Test independently → **Deploy/Demo (MVP!)**
3. Add User Story 2 (Module 2 + code examples) → Test independently → Deploy/Demo
4. Add User Story 3 (Module 3 + visualizations) → Test independently → Deploy/Demo (or defer)
5. Add User Story 4 (Exercises) → Test independently → Deploy/Demo
6. Add User Story 5 (Resources) → Test independently → Deploy/Demo
7. Add Module 4 structure → Polish → **Deploy v1.0.0**

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers/writers:

1. **Team completes Setup + Foundational together** (T001-T023)
2. Once Foundational is done, split work:
   - **Writer A**: User Story 1 (Module 1 content writing T042-T046)
   - **Writer B**: User Story 2 (Module 2 content + code examples T047-T075)
   - **Developer C**: User Story 3 (Interactive components T076-T101, can start on component infrastructure)
   - **Writer D**: User Story 5 (Resource curation T127-T148, independent)
3. User Story 4 waits for Module 1-2 content (exercises depend on chapters)
4. Stories complete and integrate independently

---

## Notes

- **[P] tasks** = different files, no dependencies, can run in parallel
- **[Story] label** maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group of tasks
- Stop at any checkpoint to validate story independently
- **MVP is User Story 1 (P1)** - browsable Module 1 content with deployment
- **Tests are NOT included** - validation is manual per user story acceptance criteria
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Constitution compliance**: All tasks align with 7 constitutional principles (verified in plan.md)
- **Build time**: Monitor and keep <5 minutes (Constitution Principle VI)
- **Accessibility**: Run Lighthouse CI to ensure WCAG 2.1 AA compliance
- **Content quality**: Follow Constitution Principle I (student-friendly explanations before formal terminology)
