import type { Course } from "../types/course";

export const courses: Course[] = [
    {
        id: 1,
        title: 'React for Beginners',
        description: {
            intro: 'Learn the fundamentals of React, JSX, and component-based development.',
            scope: [
                "Build modern web applications with React",
                "Understand component-based architecture",
                "Manage state with hooks",
                "Handle events and forms",
                "Deploy production-ready React apps"
            ]
        },
        imageUrl: 'https://picsum.photos/400/200?random=1',
        difficulty: 'beginner',
    },
    {
        id: 2,
        title: 'Mastering TypeScript',
        description: { 
            intro: 'Understand advanced typing, generics, and patterns for scalable frontends.',
            scope: [
                "Learn type annotations and inference",
                "Use interfaces and type aliases",
                "Implement generics in functions and classes",
                "Organize code with modules",
                "Build scalable and maintainable TypeScript applications"
            ]
        },
        imageUrl: 'https://picsum.photos/400/200?random=2',
        difficulty: 'intermediate',
    },
    {
        id: 3,
        title: 'Building APIs with FastAPI',
        description: {
            intro: 'Create robust backend APIs using Python’s modern FastAPI framework.',
            scope: [
                "Set up FastAPI projects",
                "Define routes and request handling",
                "Use Pydantic models for validation",
                "Implement authentication and authorization",
                "Integrate databases and background tasks"
            ]
        },
        imageUrl: 'https://picsum.photos/400/200?random=3',
        difficulty: 'intermediate',
    },
    {
        id: 4,
        title: 'UI/UX Design Principles',
        description: {
            intro: 'Design intuitive and accessible interfaces using modern UX best practices.',
            scope: [
                "Learn design thinking process",
                "Apply color theory and typography",
                "Create wireframes and prototypes",
                "Conduct usability testing",
                "Build cohesive design systems"
            ]
        },
        imageUrl: 'https://picsum.photos/400/200?random=4',
        difficulty: 'beginner',
    },
    {
        id: 5,
        title: 'Machine Learning Basics',
        description: { 
            intro: 'Discover key ML concepts, algorithms, and data preprocessing techniques.',
            scope: [
                "Understand supervised and unsupervised learning",
                "Preprocess and clean datasets",
                "Train and evaluate models",
                "Feature engineering for better predictions",
                "Build simple neural networks"
            ]
        },
        imageUrl: 'https://picsum.photos/400/200?random=5',
        difficulty: 'advanced',
    }
]

export default courses
