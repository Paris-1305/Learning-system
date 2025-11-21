import type { Lesson } from '../types/lesson'

export const lessons: Lesson[] = [
  // ---------------- Course 1: React ----------------
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: [
      'Intro to React',
      'JSX Deep Dive',
      'Components & Props',
      'State & Lifecycle',
      'Handling Events',
      'Conditional Rendering',
      'Lists & Keys',
      'Forms in React',
      'Lifting State Up',
      'Project: Todo App'
    ][i],
    courseId: 1,
    difficulty: 'easy' as const,
    content: `# Lesson ${i + 1}\n\nThis lesson explains **React basics** for lesson ${i + 1}.`,
    description: `Learn React lesson ${i + 1}`,
    imageUrl: `https://picsum.photos/400/200?random=${i + 1}`
  })),

  // ---------------- Course 2: TypeScript ----------------
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: 10 + i + 1,
    title: [
      'Intro to TypeScript',
      'Types & Interfaces',
      'Functions',
      'Generics',
      'Modules',
      'Classes',
      'Type Inference',
      'Advanced Types',
      'Decorators',
      'Project: Typed App'
    ][i],
    courseId: 2,
    difficulty: 'medium' as const,
    content: `# Lesson ${i + 1}\n\nDeep dive into TypeScript lesson ${i + 1}.`,
    description: `Learn TypeScript lesson ${i + 1}`,
    imageUrl: `https://picsum.photos/400/200?random=${i + 11}`
  })),

  // ---------------- Course 3: FastAPI ----------------
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: 20 + i + 1,
    title: [
      'Intro to FastAPI',
      'Routing',
      'Request Handling',
      'Response Models',
      'Dependency Injection',
      'Databases',
      'Authentication',
      'Background Tasks',
      'Testing',
      'Deploying FastAPI'
    ][i],
    courseId: 3,
    difficulty: 'medium' as const,
    content: `# Lesson ${i + 1}\n\nLearn FastAPI concepts and best practices.`,
    description: `Learn FastAPI lesson ${i + 1}`,
    imageUrl: `https://picsum.photos/400/200?random=${i + 21}`
  })),

  // ---------------- Course 4: UI/UX Design ----------------
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: 30 + i + 1,
    title: [
      'Design Thinking',
      'Color Theory',
      'Typography',
      'Layout Grids',
      'Accessibility',
      'Wireframing',
      'Prototyping',
      'Usability Testing',
      'Design Systems',
      'Final Design Project'
    ][i],
    courseId: 4,
    difficulty: 'easy' as const,
    content: `# Lesson ${i + 1}\n\nLearn UI/UX fundamentals and practical tools.`,
    description: `Learn UI/UX lesson ${i + 1}`,
    imageUrl: `https://picsum.photos/400/200?random=${i + 31}`
  })),

  // ---------------- Course 5: Machine Learning ----------------
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: 40 + i + 1,
    title: [
      'Intro to ML',
      'Data Preprocessing',
      'Supervised Learning',
      'Unsupervised Learning',
      'Model Evaluation',
      'Feature Engineering',
      'Neural Networks',
      'Deep Learning',
      'Reinforcement Learning',
      'Capstone Project'
    ][i],
    courseId: 5,
    difficulty: 'hard' as const,
    content: `# Lesson ${i + 1}\n\nMachine Learning fundamentals explained.`,
    description: `Learn ML lesson ${i + 1}`,
    imageUrl: `https://picsum.photos/400/200?random=${i + 41}`
  }))
]

export default lessons
