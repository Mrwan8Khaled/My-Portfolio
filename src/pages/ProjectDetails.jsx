import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getProjects } from '../utils/projectStore';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const found = getProjects().find(p => p.id === id);
        setProject(found);
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            Project not found.
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-3xl">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-[#B5B5B5] hover:text-accent mb-12 transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 items-center text-sm text-[#B5B5B5]/60 font-medium pb-8 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {project.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <div className="flex gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-accent/60">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-accent max-w-none prose-headings:text-white prose-p:text-[#B5B5B5] prose-p:leading-relaxed prose-p:text-lg prose-strong:text-white prose-code:text-accent prose-pre:bg-[#161618] prose-pre:border prose-pre:border-white/5">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {project.content}
                        </ReactMarkdown>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;
