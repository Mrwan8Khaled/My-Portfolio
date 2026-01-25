import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stack = [
    {
        category: "Languages",
        items: [
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "Core language for frontend and backend logic." },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Strongly typed JS for scalable, maintainable apps." },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Used for automation, scripting, and data processing." },
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Semantic structure for web content." }
        ]
    },
    {
        category: "Frameworks",
        items: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Building interactive, component-based user interfaces." },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", description: "Production-ready React with SSR and optimized routing." },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "High-performance server-side execution with Express." },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework for rapid UI development." }
        ]
    },
    {
        category: "Tools & Platforms",
        items: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Version control for collaborative and independent development." },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", description: "Containerization for consistent environment deployment." },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", description: "Advanced relational database for data integrity." },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "Collaborative interface design tool." }
        ]
    }
];

const ToolItem = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                rotateZ: 2,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="relative group p-6 border border-white/5 rounded-2xl bg-[#161618] hover:border-accent/30 transition-all duration-300 flex flex-col items-center justify-center cursor-default gap-3 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-full h-full object-contain ${item.name === 'Next.js' ? 'invert' : ''} opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0`}
                />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-bold text-[#B5B5B5] group-hover:text-white transition-colors duration-300">
                {item.name}
            </span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 z-50 pointer-events-none"
                    >
                        <div className="bg-[#1C1C1E] border border-accent/20 rounded-xl p-4 shadow-2xl relative">
                            <p className="text-[11px] leading-relaxed text-[#EDEDED] font-medium">
                                {item.description}
                            </p>
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1C1C1E]"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ToolsStack = () => {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full" id="tech">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <span className="text-accent text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Expertise</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Tools & Stack
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full opacity-50" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                {stack.map((group, groupIndex) => (
                    <motion.div
                        key={groupIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
                        className="space-y-8"
                    >
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-8 relative inline-block pb-4 overflow-hidden group/title">
                            {group.category}
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "0%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "circOut", delay: groupIndex * 0.2 }}
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-accent"
                            />
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {group.items.map((item, itemIndex) => (
                                <ToolItem key={itemIndex} item={item} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ToolsStack;
