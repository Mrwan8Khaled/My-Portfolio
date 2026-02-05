import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

const BlogPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const STORAGE_KEY = 'blog_popup_dismissed';
    const BLOG_URL = 'https://mrwankhaled.vercel.app/MyBlog';

    useEffect(() => {
        // Check if user has dismissed the popup
        const dismissed = localStorage.getItem(STORAGE_KEY);

        if (!dismissed) {
            // Show popup after a short delay for better UX
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleYes = () => {
        setShowPopup(false);
        window.open(BLOG_URL, '_blank');
    };

    const handleNo = () => {
        setShowPopup(false);
    };

    const handleDontShowAgain = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setShowPopup(false);
    };

    return (
        <AnimatePresence>
            {showPopup && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleNo}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Popup Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
                    >
                        <div className="bg-gradient-to-br from-[#1A1A1F] to-[#0E0E10] border border-white/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">

                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                            {/* Close button */}
                            <button
                                onClick={handleNo}
                                className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center"
                                >
                                    <ExternalLink className="text-accent" size={32} />
                                </motion.div>

                                <h3 className="text-2xl font-bold text-text-primary mb-3">
                                    Check Out My Blog! 📝
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    I share insights, tutorials, and thoughts on web development, design, and technology on my blog.
                                    Would you like to visit it?
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleYes}
                                    className="w-full px-6 py-3.5 bg-accent text-[#0E0E10] font-bold text-sm tracking-wider uppercase rounded-xl hover:shadow-[0_0_30px_rgba(79,157,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                                >
                                    Yes, Take Me There! 🚀
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleNo}
                                        className="px-4 py-3 border border-white/10 text-text-secondary hover:text-text-primary hover:border-accent/30 font-medium text-xs tracking-wide uppercase rounded-xl transition-all duration-300 bg-white/5 hover:bg-accent/5"
                                    >
                                        Not Now
                                    </button>

                                    <button
                                        onClick={handleDontShowAgain}
                                        className="px-4 py-3 border border-white/10 text-text-secondary hover:text-red-400 hover:border-red-400/30 font-medium text-xs tracking-wide uppercase rounded-xl transition-all duration-300 bg-white/5 hover:bg-red-400/5"
                                    >
                                        Don't Show Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BlogPopup;
