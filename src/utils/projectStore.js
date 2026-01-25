const STORAGE_KEY = 'portfolio_projects';

const DEFAULT_PROJECTS = [
    {
        id: '1',
        title: 'Modern E-commerce Platform',
        description: 'A high-performance storefront with real-time inventory and biometrics.',
        tags: ['React', 'Node.js', 'Stripe'],
        date: '2024-01-20',
        content: `
# Overview
This project was designed to solve the latency issues in traditional e-commerce platforms.

## Problem
High abandonment rates during checkout due to slow load times and complex forms.

## Solution
Implemented a headless architecture using Next.js and integrated biometrics for one-click checkout.

## Tech Stack
- **Frontend**: Next.js, Framer Motion
- **Backend**: Node.js, PostgreSQL
- **Payments**: Stripe API

## Challenges
Syncing real-time inventory across multiple regions without performance degradation.

## Future Improvements
- AI-driven personal recommendations.
- AR product visualization.
    `
    }
];

export const getProjects = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
};

export const saveProjects = (projects) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const addProject = (project) => {
    const projects = getProjects();
    const newProject = {
        ...project,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
    };
    saveProjects([newProject, ...projects]);
    return newProject;
};

export const deleteProject = (id) => {
    const projects = getProjects().filter(p => p.id !== id);
    saveProjects(projects);
};
