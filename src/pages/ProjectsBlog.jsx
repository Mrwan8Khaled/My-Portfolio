import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '../utils/projectStore';

const ProjectsBlog = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <span className="text-accent text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Archive</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Technical Case Studies</h1>
                <p className="text-[#B5B5B5] text-lg max-w-2xl leading-relaxed">
                    Detailed breakdowns of systems I've built, problems I've solved, and the engineering decisions behind them.
                </p>
            </motion.div>

            <div className="space-y-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <Link to={`/projects/${project.id}`} className="block">
                            <div className="bg-[#161618]/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 transition-all duration-500 hover:border-accent/30 hover:bg-[#161618]/60">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-accent/60 bg-accent/5 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <span className="text-[#B5B5B5]/40 text-sm font-mono">{project.date}</span>
                                </div>

                                <p className="text-[#B5B5B5] text-lg mb-8 max-w-3xl leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest">
                                    Read case study <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsBlog;
