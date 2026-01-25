import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Inventory Management System",
        problem: "Small stores lose track of stock.",
        solution: "Real-time inventory tracking with alerts.",
        tech: ["React", "Node.js", "PostgreSQL", "Tailwind"]
    },
    {
        title: "EcoTrack Dashboard",
        problem: "Companies struggle to measure carbon footprint.",
        solution: "Integrated analytics for real-time sustainability monitoring.",
        tech: ["TypeScript", "Next.js", "D3.js", "Firebase"]
    },
    {
        title: "SecurePay Gateway",
        problem: "High abandonment rates during payment checkout.",
        solution: "Simplified one-click payment flow with biometrics.",
        tech: ["Native", "Stripe API", "WebAuthn", "Express"]
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.21, 0.45, 0.32, 0.9]
            }}
            className="group relative h-full"
        >
            <div className="h-full bg-card-bg border border-white/5 rounded-2xl p-8 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:-translate-y-4 group-hover:scale-[1.02] group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">

                {/* Animated Background Mesh Tooltip */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Accent line on hover - more dynamic */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />

                <h3 className="text-xl font-bold text-text-primary mb-6 leading-tight group-hover:text-accent transition-colors duration-300">
                    {project.title}
                </h3>

                <div className="space-y-4 mb-8 flex-grow">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/60">Problem</span>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            {project.problem}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/60">Solution</span>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            {project.solution}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tech.map((item, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 text-[10px] font-mono font-bold text-accent border border-accent/20 rounded-md bg-accent/5"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedProjects = () => {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full" id="projects">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-3">
                    Featured Projects
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center"
            >
                <button className="px-10 py-4 border border-white/10 rounded-full text-text-secondary hover:text-text-primary hover:border-accent transition-all duration-300 font-bold text-sm tracking-widest uppercase bg-white/5 hover:bg-accent/5">
                    Show more projects
                </button>
            </motion.div>
        </section>
    );
};

export default FeaturedProjects;
