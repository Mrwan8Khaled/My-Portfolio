import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const XIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
  </svg>
);

const Hero = () => {
  const githubUsername = "165628333";
  const avatarUrl = `https://avatars.githubusercontent.com/u/${githubUsername}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-transparent" id="home">

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* Left Side: Profile Image & Buttons */}
          <motion.div
            className="flex flex-col items-center gap-8 lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={imageVariants}
              className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
            >
              <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white/10 shadow-2xl relative z-10"
                onError={(e) => { e.target.src = 'https://github.com/github.png'; }}
                loading='lazy'
              />

              {/* Cinema Mode Glow: Blurred version of the image itself */}
              <div
                className="absolute inset-0 rounded-full blur-[60px] opacity-40 -z-10 scale-110"
                style={{
                  backgroundImage: `url(${avatarUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-accent text-[#0E0E10] font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,157,255,0.4)] hover:-translate-y-1 active:scale-95"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-transparent border border-white/10 text-white font-bold rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1 active:scale-95"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Name, Tagline, Socials */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 gap-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-2">
              <motion.span
                variants={itemVariants}
                className="text-accent text-sm md:text-base font-bold tracking-[0.3em] uppercase"
              >
                Full Stack Developer
              </motion.span>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
              >
                Mrwan <br className="hidden lg:block" /> Khaled
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-[#B5B5B5] text-lg md:text-xl max-w-lg leading-relaxed font-medium"
            >
              I build scalable, high-performance web applications with a focus on clean architecture and exceptional user experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6"
            >
              {[
                { icon: Github, href: "https://github.com/Mrwan8Khaled/", color: "hover:text-white" },
                { icon: Linkedin, href: "https://linkedin.com/in/mrwan-khaled", color: "hover:text-[#0077B5]" },
                { icon: XIcon, href: "https://x.com/mrwankhaled", color: "hover:text-white" },
                { icon: Mail, href: "mailto:mrwan8khaled@gmail.com", color: "hover:text-accent" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[#B5B5B5] ${social.color} transition-all duration-300 hover:scale-110 active:scale-90`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B5B5B5]/40 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;