# Physical AI & Humanoid Robotics Educational Book Constitution

<!--
Sync Impact Report:
  Version: None → 1.0.0 (Initial constitution)
  Modified Principles: None (new document)
  Added Sections: All sections (initial creation)
  Removed Sections: None
  Templates Status:
    ✅ plan-template.md - Reviewed, compatible with educational documentation project
    ✅ spec-template.md - Reviewed, compatible with module-based content structure
    ✅ tasks-template.md - Reviewed, compatible with content creation workflow
  Follow-up TODOs: None
-->

## Core Principles

### I. Educational Accessibility (NON-NEGOTIABLE)

All content MUST be written for students transitioning from digital AI to physical robotics. Every concept, no matter how complex, MUST include:
- Plain-language explanation before technical details
- Real-world analogies connecting digital AI concepts to physical embodiments
- Progressive complexity: foundational concepts before advanced topics
- Clear learning objectives stated at the beginning of each module/section

**Rationale**: This book bridges the gap between software AI and physical robotics. Students need scaffolding to transfer their digital AI knowledge to embodied systems. Without accessibility-first writing, students will struggle to grasp the integration of AI with physical constraints.

### II. Modular Structure

Content MUST be organized into four distinct, sequential modules:
1. **Module 1: The Robotic Nervous System (ROS 2)** - Middleware foundations
2. **Module 2: The Digital Twin (Gazebo & Unity)** - Physics simulation
3. **Module 3: The AI-Robot Brain (NVIDIA Isaac™)** - Advanced perception
4. **Module 4: Vision-Language-Action (VLA)** - LLM-robotics convergence

Each module MUST:
- Build upon previous modules (sequential dependencies explicit)
- Be completable as a standalone learning unit with clear outcomes
- Include hands-on exercises and demonstrations
- Culminate in a practical capstone project (Module 4)

**Rationale**: Modular structure enables incremental learning, allows students to master foundations before complexity, and provides clear checkpoints for knowledge validation.

### III. Markdown-First Content

All educational content MUST be authored in Markdown (.md) or MDX (.mdx) format. This includes:
- All module documentation and lessons
- Code examples with syntax highlighting (```python, ```bash)
- Conceptual diagrams (using Mermaid or image references)
- API documentation and reference materials

**Technology Stack**:
- Docusaurus (latest version) for site generation
- React for interactive components (when needed)
- GitHub-flavored Markdown with MDX extensions

**Rationale**: Markdown ensures version-controllable, portable, and accessible content. Docusaurus provides professional documentation tooling while maintaining simplicity. Students can read raw Markdown files directly from the repository if needed.

### IV. Code Integration & Runnable Examples

Every technical concept MUST include working code examples in:
- **Python 3.x** for AI/ML components and ROS 2 integration (rclpy)
- **ROS 2** (Humble or later) for robot control and communication
- **URDF/Xacro** for robot modeling
- **Bash/Shell** for tooling and environment setup

Code examples MUST:
- Be complete and runnable (not pseudocode fragments)
- Include clear prerequisites (dependencies, environment setup)
- Show expected output or behavior
- Be tested and validated before publication

**Rationale**: Physical AI and robotics require hands-on practice. Abstract explanations without working code leave students unable to apply concepts. Runnable examples accelerate learning and build confidence.

### V. Open Source Standards (NON-NEGOTIABLE)

All tools, libraries, and frameworks referenced MUST be:
- Open-source with permissive licenses (MIT, Apache 2.0, BSD)
- Actively maintained and community-supported
- Free for educational use

**Approved Technology Stack**:
- ROS 2 (Robot Operating System 2)
- Gazebo simulator
- NVIDIA Isaac Sim (free for educational use)
- Unity (free tier acceptable)
- Python ecosystem (NumPy, PyTorch, OpenCV, etc.)

**Rationale**: Students must be able to access, modify, and learn from all tools without licensing barriers. Open-source alignment ensures long-term sustainability and community support.

### VI. Comprehensive AI-Robotics Coverage

Content MUST cover the complete pipeline from digital AI to physical embodiment:
- **Perception**: Sensors (LiDAR, cameras, IMUs), computer vision, VSLAM
- **Cognition**: LLM integration, natural language understanding, planning
- **Action**: Motor control, manipulation, navigation, bipedal locomotion
- **Simulation**: Digital twins, physics engines, synthetic data generation
- **Deployment**: Real-world constraints, latency, safety considerations

**Integration Points Explicitly Covered**:
- Python AI agents → ROS 2 controllers (via rclpy)
- LLM natural language → ROS 2 actions (voice-to-action pipeline)
- Simulated sensors → Real sensor interfaces (Gazebo → Hardware)
- Digital twin validation → Physical deployment strategies

**Rationale**: Students must understand the entire system, not isolated components. Physical AI requires integration knowledge—how perception, cognition, and action work together under physical constraints.

### VII. Deployment Simplicity

The Docusaurus site MUST support one-command deployment:
```bash
npm run deploy
```

**Deployment Requirements**:
- GitHub Pages as primary hosting (free, reliable, student-accessible)
- Automated deployment via GitHub Actions (optional but recommended)
- Custom domain support (optional)
- HTTPS enabled by default

**Build Process MUST**:
- Complete successfully on clean clone (no hidden dependencies)
- Generate static HTML (no server-side requirements)
- Include all assets (images, diagrams, code snippets)

**Rationale**: Complex deployment processes create friction and prevent students from contributing. Simple, automated deployment encourages community contributions and keeps content up-to-date.

### VIII. Traceability & Content Mapping

All content MUST map explicitly to the quarter overview and module structure:

**Quarter Overview**:
"The future of AI extends beyond digital spaces into the physical world. This capstone quarter introduces Physical AI—AI systems that function in reality and comprehend physical laws. Students learn to design, simulate, and deploy humanoid robots capable of natural human interactions using ROS 2, Gazebo, and NVIDIA Isaac."

**Module Mapping Enforcement**:
- Each Markdown file includes front-matter specifying: module number, learning objectives, prerequisites
- Sidebar navigation reflects module hierarchy exactly
- No orphaned content (every page belongs to a module or overview)
- Cross-references use explicit module context (e.g., "As covered in Module 1, Section 2.3...")

**Rationale**: Traceability ensures alignment with learning objectives, prevents content drift, and helps students navigate the knowledge graph. Clear mapping enables instructors to customize or extend content while maintaining coherence.

## Content Quality Standards

### Clarity & Explanation Depth

- **Concept Introduction**: Every new term defined on first use with plain-language explanation
- **Analogies**: Digital AI → Physical AI mappings (e.g., "ROS 2 topics are like message queues in distributed systems")
- **Visuals**: Diagrams for system architectures, flow charts for processes, photos/screenshots for UIs
- **Worked Examples**: Step-by-step walkthroughs with screenshots and expected outputs

### Code Quality

- **Style**: Follow PEP 8 (Python), ROS 2 conventions, Docusaurus best practices
- **Documentation**: Inline comments for complex logic, docstrings for functions/classes
- **Error Handling**: Demonstrate proper exception handling and error recovery
- **Testing**: Include test commands and validation steps (e.g., `ros2 topic echo`, `pytest`)

### Accessibility

- **Alt Text**: All images include descriptive alt text for screen readers
- **Code Readability**: Font size, syntax highlighting, line numbers where helpful
- **Language**: Gender-neutral, inclusive terminology; avoid jargon without definition
- **Learning Styles**: Mix of text, code, visuals, and interactive elements

## Development Workflow

### Content Creation Process

1. **Specification**: Define learning objectives and outline for module/section
2. **Draft**: Write Markdown content with placeholders for code/diagrams
3. **Code Development**: Create and test all code examples locally
4. **Integration**: Embed code snippets, diagrams, and cross-references
5. **Review**: Technical accuracy check + educational clarity review
6. **Deployment**: Commit to repository, trigger build, validate live site

### Version Control

- **Branch Strategy**:
  - `master` or `main`: Production-ready content
  - `develop`: Integration branch for new modules
  - Feature branches: `module-<N>-<topic>` (e.g., `module-1-ros2-basics`)

- **Commit Messages**:
  - `docs(module-N): add section on <topic>`
  - `code(module-N): add working example for <concept>`
  - `fix(module-N): correct typo in <section>`

### Testing & Validation

Before merging content:
- [ ] All code examples execute successfully
- [ ] All links resolve (no 404s)
- [ ] Docusaurus build completes without errors
- [ ] Navigation and search function correctly
- [ ] Mobile responsiveness verified

## Governance

### Constitution Authority

This constitution supersedes all other documentation practices for this project. All content contributions, code examples, and structural decisions MUST comply with these principles.

### Amendments

Constitution amendments require:
1. **Proposal**: Document the proposed change with rationale
2. **Review**: Educational effectiveness and technical feasibility assessment
3. **Approval**: Maintainer consensus (or instructor approval for academic projects)
4. **Migration**: Update all affected content to comply with new principles
5. **Versioning**: Increment constitution version per semantic versioning rules

### Compliance Review

- All pull requests MUST verify compliance with constitution principles
- Module content MUST align with approved quarter overview and module outlines
- Code examples MUST be tested before publication
- Any complexity or deviation from principles MUST be explicitly justified

### Conflict Resolution

When principles conflict (e.g., educational simplicity vs. comprehensive coverage):
1. **Educational Accessibility** takes precedence (students come first)
2. Simplify complex topics first, then add "Advanced Topics" sections for depth
3. Document the trade-off and reasoning in the content itself

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01
