import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Run on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 ${isScrolled ? 'bg-[#0E0E10]/80 backdrop-blur-md py-4' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center text-white">
        <Link to="/" className="text-xl font-bold tracking-tighter hover:text-accent transition-colors">
          MK<span className="text-accent">.</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6 md:gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(link.id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 relative group ${activeSection === link.id ? 'text-accent' : 'text-[#B5B5B5] hover:text-accent'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full ${activeSection === link.id ? 'w-full' : 'w-0'
                    }`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-accent text-[#0E0E10] text-xs font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_rgba(79,157,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <Download size={14} strokeWidth={3} />
            CV
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;