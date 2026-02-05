import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBlog = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample blog posts - replace with your actual blog data
    const blogPosts = [
        {
            id: 1,
            title: 'Building Modern Web Applications with React',
            excerpt: 'Learn how to create scalable and performant web applications using React and modern best practices.',
            date: '2024-01-15',
            readTime: '8 min read',
            tags: ['React', 'JavaScript', 'Web Development'],
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
        },
        {
            id: 2,
            title: 'Advanced UI/UX Design Principles',
            excerpt: 'Explore the fundamental principles of modern UI/UX design and how to apply them in your projects.',
            date: '2024-01-10',
            readTime: '6 min read',
            tags: ['UI/UX', 'Design', 'Best Practices'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
        },
        {
            id: 3,
            title: 'Full Stack Development: Node.js & Express',
            excerpt: 'A comprehensive guide to building RESTful APIs with Node.js, Express, and MongoDB.',
            date: '2024-01-05',
            readTime: '12 min read',
            tags: ['Node.js', 'Backend', 'API'],
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop'
        },
        {
            id: 4,
            title: 'Mastering CSS Grid and Flexbox',
            excerpt: 'Deep dive into CSS Grid and Flexbox layouts for creating responsive and flexible designs.',
            date: '2024-01-01',
            readTime: '10 min read',
            tags: ['CSS', 'Layout', 'Responsive Design'],
            image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop'
        }
    ];

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-4">
                        My <span className="text-accent">Blog</span>
                    </h1>
                    <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-6" />
                    <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                        Thoughts, insights, and tutorials on web development, design, and technology.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-12 max-w-2xl mx-auto"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        />
                    </div>
                </motion.div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                                className="group bg-card-bg border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-transparent">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 mb-4 text-text-secondary text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={16} />
                                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={16} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-[10px] font-mono font-bold text-accent border border-accent/20 rounded-md bg-accent/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More Button */}
                                    <button className="flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-medium text-sm group">
                                        Read More
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.article>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-20"
                        >
                            <p className="text-text-secondary text-lg">
                                No articles found matching "{searchTerm}"
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Coming Soon Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-6 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl">
                        <p className="text-text-secondary">
                            More articles coming soon! Subscribe to stay updated.
                        </p>
                    </div>
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-12 max-w-2xl mx-auto bg-gradient-to-br from-[#1A1A1F] to-[#0E0E10] border border-white/10 rounded-2xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold text-text-primary mb-3">
                        Stay Updated
                    </h3>
                    <p className="text-text-secondary mb-6">
                        Get notified when I publish new articles and tutorials.
                    </p>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        />
                        <button className="px-6 py-3 bg-accent text-[#0E0E10] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(79,157,255,0.4)] transition-all duration-300 active:scale-95">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MyBlog;
