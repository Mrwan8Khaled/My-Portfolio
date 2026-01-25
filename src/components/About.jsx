import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const commands = [
    { command: 'whoami', output: 'Mrwan Khaled' },
    { command: 'role', output: 'Full-stack Developer' },
    { command: 'focus', output: 'Clean systems, performance, real-world solutions' },
    { command: 'tech', output: 'JavaScript, React, Node.js, Three.js' },
    { command: 'mindset', output: 'Build things that actually work' }
  ];

  return (
    <section className="py-16 px-6 md:px-12" id="about">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Terminal Header */}
          <div className="bg-[#1a1a1c]/80 backdrop-blur-md rounded-t-2xl px-4 py-2 border-x border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              <span className="ml-4 text-[10px] uppercase tracking-widest text-[#B5B5B5]/60 font-bold font-mono">
                terminal — about.sh
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-[#0E0E10]/60 backdrop-blur-xl rounded-b-2xl border border-white/5 shadow-2xl p-6 md:p-8 overflow-hidden">
            <div className="font-mono leading-relaxed space-y-4">
              {commands.map((cmd, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold opacity-80">❯</span>
                    <span className="text-white font-bold tracking-tight">
                      {cmd.command}
                    </span>
                  </div>
                  <div className="ml-7">
                    <span className="text-[#B5B5B5] text-sm md:text-base selection:bg-accent/20">
                      {cmd.output}
                    </span>
                  </div>
                </div>
              ))}

              {/* Final Blinking Cursor */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-accent font-bold opacity-80">❯</span>
                <span className="w-2 h-4 bg-accent animate-[pulse_1s_infinite] shadow-[0_0_10px_rgba(79,157,255,0.5)]"></span>
              </div>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;