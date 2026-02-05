import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Lock } from 'lucide-react';
import { getProjects, addProject, deleteProject } from '../utils/projectStore';

const AUTH_EMAIL = 'mrwan8khaled@gmail.com';
const AUTH_PASS = '+201061361276';
const AUTH_KEY = 'dashboard_authenticated';

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        tags: '',
        content: ''
    });

    useEffect(() => {
        // Check if user is already authenticated
        const authenticated = sessionStorage.getItem(AUTH_KEY);
        if (authenticated === 'true') {
            setIsAuthenticated(true);
            setProjects(getProjects());
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === AUTH_EMAIL && password === AUTH_PASS) {
            setIsAuthenticated(true);
            sessionStorage.setItem(AUTH_KEY, 'true');
            setError('');
            setProjects(getProjects());
        } else {
            setError('Invalid credentials. Please try again.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem(AUTH_KEY);
        setEmail('');
        setPassword('');
    };

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

    // Login Form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-gradient-to-br from-[#1A1A1F] to-[#0E0E10] border border-white/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                        {/* Lock Icon */}
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                            <Lock className="text-accent" size={32} />
                        </div>

                        <h1 className="text-3xl font-bold text-white text-center mb-2">
                            Dashboard Login
                        </h1>
                        <p className="text-text-secondary text-center mb-8">
                            Enter your credentials to access the dashboard
                        </p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-accent text-[#0E0E10] font-bold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(79,157,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Dashboard Content (only shown when authenticated)
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-5xl">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold text-white tracking-tight">Project Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 border border-white/10 text-text-secondary hover:text-red-400 hover:border-red-400/30 font-bold rounded-xl transition-all active:scale-95"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-[#0E0E10] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(79,157,255,0.4)] transition-all active:scale-95"
                    >
                        {showForm ? <X size={20} /> : <Plus size={20} />}
                        {showForm ? 'Cancel' : 'New Project'}
                    </button>
                </div>
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
