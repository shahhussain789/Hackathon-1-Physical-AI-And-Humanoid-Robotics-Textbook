# Component API Contracts

**Feature**: 001-docusaurus-physical-ai-book
**Date**: 2026-01-01
**Purpose**: Define interfaces for custom React components used in MDX content

## Overview

This document specifies the API contracts for interactive components that will be embedded in educational content. All components must be:
- **Responsive**: Work on mobile, tablet, and desktop
- **Accessible**: WCAG 2.1 AA compliant (keyboard navigation, ARIA labels, screen reader support)
- **Performant**: Load lazily, avoid blocking page render
- **Documented**: PropTypes/TypeScript interfaces with JSDoc comments

---

## Component: RobotVisualization

**Purpose**: Display 3D robot models with interactive camera controls for visualizing kinematics and poses.

**File**: `src/components/RobotVisualization.tsx`

### Props Interface

```typescript
interface RobotVisualizationProps {
  /**
   * Path to robot model file (URDF, glTF, or OBJ format)
   * @example "/models/humanoid-v1.glb"
   */
  modelPath: string;

  /**
   * Joint angle configuration in degrees
   * Array length must match number of robot joints
   * @default [] (all joints at 0°)
   */
  jointAngles?: number[];

  /**
   * Enable auto-rotation around Y-axis
   * @default true
   */
  autoRotate?: boolean;

  /**
   * Initial camera position [x, y, z] in meters
   * @default [5, 5, 5]
   */
  cameraPosition?: [number, number, number];

  /**
   * Height of the canvas (CSS value)
   * @default "500px"
   */
  height?: string;

  /**
   * Caption displayed below visualization (Markdown supported)
   * @example "Figure 1: Humanoid in T-pose configuration"
   */
  caption?: string;

  /**
   * Show joint axes for debugging
   * @default false
   */
  showAxes?: boolean;

  /**
   * Background color (CSS color value)
   * @default "transparent" (uses theme background)
   */
  backgroundColor?: string;
}
```

### Usage Example

```mdx
import RobotVisualization from '@site/src/components/RobotVisualization';

<RobotVisualization
  modelPath="/models/humanoid-v1.glb"
  jointAngles={[0, 45, -30, 0, 90, -45]}
  autoRotate={false}
  height="600px"
  caption="**Figure 2.1**: Robot arm reaching forward (shoulder: 45°, elbow: -30°)"
  showAxes={true}
/>
```

### Behavior Specification

**Loading**:
- Show loading spinner while model loads
- Display error message if model fails to load (with fallback image)
- Lazy load Three.js library to avoid blocking page

**Interaction**:
- Left mouse drag: Rotate camera (OrbitControls)
- Right mouse drag: Pan camera
- Mouse wheel: Zoom in/out
- Touch: Single finger drag (rotate), pinch (zoom)
- Keyboard: Arrow keys rotate, +/- zoom

**Accessibility**:
- ARIA label: "3D robot model visualization"
- Tab-focusable with keyboard controls
- Screen reader announcement: "Interactive 3D model. Use arrow keys to rotate."

**Performance**:
- Target 60 FPS animation
- Pause rendering when component not visible (Intersection Observer)
- Dispose of Three.js resources on unmount

---

## Component: GaitAnimator

**Purpose**: Animate bipedal robot gait cycles with parameter controls for educational demonstrations.

**File**: `src/components/GaitAnimator.tsx`

### Props Interface

```typescript
interface GaitAnimatorProps {
  /**
   * Path to robot model file
   */
  modelPath: string;

  /**
   * Gait type to animate
   * @default "walk"
   */
  gaitType?: 'walk' | 'run' | 'trot' | 'custom';

  /**
   * Path to custom gait trajectory file (JSON format)
   * Required if gaitType === 'custom'
   */
  trajectoryPath?: string;

  /**
   * Step length in meters
   * @default 0.5
   * @range [0.1, 1.0]
   */
  stepLength?: number;

  /**
   * Gait frequency in Hz
   * @default 1.0
   * @range [0.5, 3.0]
   */
  frequency?: number;

  /**
   * Show parameter sliders for interactive control
   * @default true
   */
  showControls?: boolean;

  /**
   * Show real-time sensor data overlays (IMU, ZMP, joint torques)
   * @default false
   */
  showSensorData?: boolean;

  /**
   * Loop animation indefinitely
   * @default true
   */
  loop?: boolean;

  /**
   * Canvas height (CSS value)
   * @default "600px"
   */
  height?: string;
}
```

### Usage Example

```mdx
import GaitAnimator from '@site/src/components/GaitAnimator';

## Bipedal Walking Gait

Adjust the step length and frequency to see how they affect the gait pattern:

<GaitAnimator
  modelPath="/models/humanoid-v1.glb"
  gaitType="walk"
  stepLength={0.4}
  frequency={1.2}
  showControls={true}
  showSensorData={true}
/>

Notice how increasing the step length requires adjusting the ZMP (Zero-Moment Point) to maintain stability.
```

### Behavior Specification

**Controls** (when `showControls={true}`):
- Play/Pause button
- Slider: Step Length (0.1m - 1.0m)
- Slider: Frequency (0.5Hz - 3.0Hz)
- Dropdown: Gait Type (walk, run, trot, custom)
- Reset button

**Sensor Data Overlays** (when `showSensorData={true}`):
- IMU orientation (3D arrow)
- ZMP trajectory (ground plane visualization)
- Joint torque bar charts (real-time updates)

**Accessibility**:
- All controls keyboard-accessible
- ARIA live region announces gait parameter changes
- Screen reader: "Gait animation with interactive controls"

---

## Component: KinematicsPlotter

**Purpose**: Plot forward/inverse kinematics results with interactive joint angle inputs.

**File**: `src/components/KinematicsPlotter.tsx`

### Props Interface

```typescript
interface KinematicsPlotterProps {
  /**
   * Kinematics mode
   * - forward: Input joint angles, output end-effector pose
   * - inverse: Input target pose, output joint angles
   */
  mode: 'forward' | 'inverse';

  /**
   * Number of joints in the robot arm
   * @default 2
   * @range [2, 6]
   */
  numJoints?: number;

  /**
   * Link lengths in meters (array length must equal numJoints)
   * @example [1.0, 0.8] for 2-link arm
   */
  linkLengths: number[];

  /**
   * Initial joint angles in degrees (forward mode)
   * @default [0, 0, ...] (all zeros)
   */
  initialAngles?: number[];

  /**
   * Target end-effector position [x, y] (inverse mode)
   */
  targetPosition?: [number, number];

  /**
   * Show workspace boundary (reachable region)
   * @default true
   */
  showWorkspace?: boolean;

  /**
   * Show transformation matrices in UI
   * @default false
   */
  showMatrices?: boolean;

  /**
   * Canvas height (CSS value)
   * @default "500px"
   */
  height?: string;
}
```

### Usage Example

```mdx
import KinematicsPlotter from '@site/src/components/KinematicsPlotter';

## Forward Kinematics Example

Move the joint angle sliders to see how the end-effector position changes:

<KinematicsPlotter
  mode="forward"
  numJoints={3}
  linkLengths={[1.0, 0.8, 0.5]}
  showWorkspace={true}
  showMatrices={false}
/>

The shaded region shows the reachable workspace for this arm configuration.
```

### Behavior Specification

**Forward Mode**:
- Sliders for each joint angle (-180° to +180°)
- Real-time plot updates as sliders move
- Display computed end-effector position (x, y)
- Optionally show transformation matrices T1, T2, ..., T_final

**Inverse Mode**:
- Click on plot to set target position
- Display computed joint angles (if solution exists)
- Show "No solution" message if target unreachable
- Highlight multiple solutions if they exist (elbow up/down)

**Accessibility**:
- Sliders have ARIA labels: "Joint 1 angle: 45 degrees"
- Keyboard: Tab to focus sliders, arrow keys to adjust
- Screen reader announces end-effector position changes

---

## Component: CodeSandbox

**Purpose**: Embed executable code examples with live editing (optional enhancement for P2 user story).

**File**: `src/components/CodeSandbox.tsx`

### Props Interface

```typescript
interface CodeSandboxProps {
  /**
   * Path to code file (Python, JavaScript, etc.)
   */
  codePath: string;

  /**
   * Programming language
   * @default "python"
   */
  language?: 'python' | 'javascript' | 'cpp';

  /**
   * Enable live editing in browser
   * Requires Pyodide (Python) or other runtime
   * @default false (display only)
   */
  editable?: boolean;

  /**
   * Show "Run Code" button (requires runtime setup)
   * @default false
   */
  executable?: boolean;

  /**
   * File title displayed above code block
   */
  title?: string;

  /**
   * Show line numbers
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Highlighted line ranges
   * @example "1-3,5,8-10"
   */
  highlightLines?: string;
}
```

### Usage Example

```mdx
import CodeSandbox from '@site/src/components/CodeSandbox';

<CodeSandbox
  codePath="/code-examples/module2/forward-kinematics-2link.py"
  language="python"
  title="forward-kinematics-2link.py"
  showLineNumbers={true}
  highlightLines="12-15"
  editable={false}
  executable={false}
/>
```

**Note**: For MVP (P1-P2), this component will be display-only with GitHub link. Live editing/execution is deferred to future enhancement.

---

## Global Component Registration

**File**: `src/theme/MDXComponents.js`

All custom components must be registered here to be available in MDX without explicit imports:

```javascript
import MDXComponents from '@theme-original/MDXComponents';
import RobotVisualization from '@site/src/components/RobotVisualization';
import GaitAnimator from '@site/src/components/GaitAnimator';
import KinematicsPlotter from '@site/src/components/KinematicsPlotter';
import CodeSandbox from '@site/src/components/CodeSandbox';

export default {
  ...MDXComponents,
  RobotVisualization,
  GaitAnimator,
  KinematicsPlotter,
  CodeSandbox,
};
```

---

## Testing Contract

All components MUST include:

1. **Unit Tests** (`*.test.tsx`):
   - Props validation
   - Rendering without errors
   - Accessibility (ARIA attributes, keyboard navigation)

2. **Storybook Stories** (`*.stories.tsx`):
   - Default state
   - All prop variations
   - Edge cases (loading, error states)

3. **Visual Regression Tests**:
   - Screenshot comparison for UI consistency

4. **Performance Tests**:
   - FPS monitoring for animations (target: 60 FPS)
   - Memory usage (no leaks on mount/unmount)

**Test Files Location**: `src/components/__tests__/`

---

## Versioning and Breaking Changes

- Component APIs follow semantic versioning
- Breaking changes require major version bump and migration guide
- Deprecations announced with console warnings 1 version before removal

---

## Next Steps

1. Implement RobotVisualization (P3 user story - interactive visualizations)
2. Implement KinematicsPlotter (P2 user story - code examples enhancement)
3. Defer GaitAnimator and CodeSandbox to post-MVP unless time permits
4. Write comprehensive Storybook documentation for all components
