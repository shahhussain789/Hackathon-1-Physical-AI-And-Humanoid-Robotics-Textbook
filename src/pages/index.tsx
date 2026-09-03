import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const modules = [
  {
    icon: '🧠',
    number: 'Module 1',
    title: 'The Robotic Nervous System (ROS 2)',
    description: 'Master the middleware that connects every robot. ROS 2 nodes, topics, services, Python integration with rclpy, and URDF for describing humanoid bodies.',
    tags: ['ROS 2', 'rclpy', 'URDF', 'Middleware'],
    link: '/docs/module1/',
  },
  {
    icon: '🌐',
    number: 'Module 2',
    title: 'The Digital Twin (Gazebo & Unity)',
    description: 'Build physics simulations and virtual environments. Simulate gravity, collisions, LiDAR, depth cameras, and IMUs before touching real hardware.',
    tags: ['Gazebo', 'Unity', 'Sensor Sim', 'Physics'],
    link: '/docs/module2/',
  },
  {
    icon: '👁️',
    number: 'Module 3',
    title: 'The AI-Robot Brain (NVIDIA Isaac)',
    description: 'Dive into NVIDIA Isaac ecosystem — photorealistic simulation, synthetic data generation, hardware-accelerated VSLAM, and Nav2 path planning.',
    tags: ['Isaac Sim', 'VSLAM', 'Nav2', 'Perception'],
    link: '/docs/module3/',
  },
  {
    icon: '🗣️',
    number: 'Module 4',
    title: 'Vision-Language-Action (VLA)',
    description: 'Connect language understanding to robot action. Voice commands with Whisper, cognitive planning with LLMs, and a capstone autonomous humanoid project.',
    tags: ['VLA Models', 'Whisper', 'LLM Planning', 'Capstone'],
    link: '/docs/module4/',
  },
];

const techStack = [
  { icon: '🐍', name: 'Python', desc: 'Core language' },
  { icon: '🤖', name: 'ROS 2', desc: 'Robot framework' },
  { icon: '🌐', name: 'Gazebo', desc: 'Simulation' },
  { icon: '🟢', name: 'Isaac Sim', desc: 'NVIDIA platform' },
  { icon: '🔥', name: 'PyTorch', desc: 'Deep learning' },
  { icon: '📐', name: 'NumPy', desc: 'Scientific compute' },
];

function HeroSection(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Physical AI &<br />Humanoid Robotics
        </h1>
        <p className={styles.heroSubtitle}>
          Bridge the gap between digital AI and the physical world.
          Design, simulate, and deploy humanoid robots that see, think, and act.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryBtn} to="/docs/intro">
            Start Learning →
          </Link>
          <Link className={styles.secondaryBtn} to="/docs/quarter-overview">
            Course Overview
          </Link>
        </div>
      </div>
      {/* Scroll hint */}
      <div className={styles.scrollHint}>↓</div>
    </header>
  );
}

function StatsBar(): ReactNode {
  return (
    <div className={styles.stats}>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>4</span>
        <span className={styles.statLabel}>Modules</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>25+</span>
        <span className={styles.statLabel}>Chapters</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>50+</span>
        <span className={styles.statLabel}>Code Examples</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>1</span>
        <span className={styles.statLabel}>Capstone</span>
      </div>
    </div>
  );
}

function ModulesSection(): ReactNode {
  return (
    <section className={styles.modulesSection}>
      <h2 className={styles.sectionTitle}>What You'll Learn</h2>
      <p className={styles.sectionSubtitle}>
        From foundational concepts to building a fully autonomous humanoid system.
      </p>
      <div className={styles.moduleGrid}>
        {modules.map((mod) => (
          <Link key={mod.number} className={styles.moduleCard} to={mod.link}>
            <span className={styles.moduleIcon}>{mod.icon}</span>
            <span className={styles.moduleNumber}>{mod.number}</span>
            <h3 className={styles.moduleCardTitle}>{mod.title}</h3>
            <p className={styles.moduleDesc}>{mod.description}</p>
            <div className={styles.moduleTags}>
              {mod.tags.map((tag) => (
                <span key={tag} className={styles.moduleTag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TechSection(): ReactNode {
  return (
    <section className={styles.techSection}>
      <h2 className={styles.sectionTitle}>Built With Industry Tools</h2>
      <p className={styles.sectionSubtitle}>
        Learn the same stack used by robotics engineers worldwide.
      </p>
      <div className={styles.techGrid}>
        {techStack.map((tech) => (
          <div key={tech.name} className={styles.techItem}>
            <span className={styles.techIcon}>{tech.icon}</span>
            <span className={styles.techName}>{tech.name}</span>
            <span className={styles.techDesc}>{tech.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to Build the Future?</h2>
      <p className={styles.ctaDesc}>
        Start your journey from digital AI to embodied intelligence.
      </p>
      <Link className={styles.ctaButton} to="/docs/module1/">
        Begin Module 1 →
      </Link>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Embodied Intelligence"
      description="Physical AI & Humanoid Robotics: Design, simulate, and deploy humanoid robots that see, think, and act.">
      <HeroSection />
      <StatsBar />
      <main>
        <ModulesSection />
        <TechSection />
        <CTASection />
      </main>
    </Layout>
  );
}
