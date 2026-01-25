import React from 'react';
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

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-[#0E0E10]">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-white font-bold tracking-tighter">
                            MK<span className="text-accent">.</span>
                        </span>
                        <p className="text-[#B5B5B5]/60 text-xs tracking-wide">
                            Built with care and clarity
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
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
                                className={`text-[#B5B5B5]/40 ${social.color} transition-colors duration-300`}
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>

                    <div className="text-[#B5B5B5]/40 text-[10px] uppercase tracking-widest font-medium">
                        © {currentYear} All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
