import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { getProjects, addProject, deleteProject } from '../utils/projectStore';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        tags: '',
        content: ''
    });

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        const project = {
            ...newProject,
            tags: newProject.tags.split(',').map(tag => tag.trim())
        };
        addProject(project);
        setProjects(getProjects());
        setShowForm(false);
        setNewProject({ title: '', description: '', tags: '', content: '' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
            setProjects(getProjects());
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-5xl">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold text-white tracking-tight">Project Dashboard</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-[#0E0E10] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(79,157,255,0.4)] transition-all active:scale-95"
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? 'Cancel' : 'New Project'}
                </button>
            </div>

            {showForm && (
                <motion.form
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#161618] border border-white/5 p-8 rounded-2xl mb-12 space-y-6"
                    onSubmit={handleAdd}
                >
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#B5B5B5]">Title</label>
                        <input
                            required
                            className="w-full bg-[#0E0E10] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-accent transition-colors"
                            value={newProject.title}
                            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="e.g. AI-Powered Portfolio"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#B5B5B5]">Short Description</label>
                        <input
                            required
                            className="w-full bg-[#0E0E10] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-accent transition-colors"
                            value={newProject.description}
                            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Catchy one-liner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#B5B5B5]">Tags (comma separated)</label>
                        <input
                            required
                            className="w-full bg-[#0E0E10] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-accent transition-colors"
                            value={newProject.tags}
                            onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                            placeholder="React, AWS, Three.js"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#B5B5B5]">Case Study Content (Markdown)</label>
                        <textarea
                            required
                            rows={10}
                            className="w-full bg-[#0E0E10] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-accent transition-colors font-mono text-sm"
                            value={newProject.content}
                            onChange={e => setNewProject({ ...newProject, content: e.target.value })}
                            placeholder="# Overview..."
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-accent text-[#0E0E10] font-bold rounded-xl active:scale-[0.98] transition-transform">
                        Save Project
                    </button>
                </motion.form>
            )}

            <div className="grid grid-cols-1 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="bg-[#161618] border border-white/5 p-6 rounded-2xl flex justify-between items-center group">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                            <p className="text-[#B5B5B5] text-sm">{project.date}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(project.id)}
                            className="text-[#B5B5B5]/40 hover:text-red-500 transition-colors p-2"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
