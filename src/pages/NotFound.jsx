import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-2xl mx-auto">

                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent leading-none">
                        404
                    </h1>
                    <div className="relative">
                        <div className="absolute inset-0 blur-[100px] bg-accent/20 -z-10" />
                    </div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-text-secondary text-lg md:text-xl max-w-md mx-auto">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                    </p>
                </motion.div>

                {/* Animated Search Icon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="inline-flex p-6 bg-accent/10 border border-accent/20 rounded-2xl">
                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <Search className="text-accent" size={48} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-accent text-[#0E0E10] font-bold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(79,157,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 px-8 py-4 border border-white/10 text-text-secondary hover:text-text-primary hover:border-accent/30 font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 bg-white/5 hover:bg-accent/5 active:scale-95"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </motion.div>

                {/* Helpful Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 pt-8 border-t border-white/10"
                >
                    <p className="text-text-secondary text-sm mb-4">
                        Looking for something? Try these pages:
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            { name: 'Projects', path: '/#projects' },
                            { name: 'About', path: '/#about' },
                            { name: 'Contact', path: '/#contact' },
                            { name: 'Blog', path: '/MyBlog' }
                        ].map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 200 }}
                            >
                                <Link
                                    to={link.path}
                                    className="px-4 py-2 text-accent hover:text-text-primary border border-accent/30 hover:border-accent hover:bg-accent/10 rounded-lg transition-all duration-300 text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
