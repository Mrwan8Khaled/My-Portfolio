import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

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

const DiscordIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus('Sending message...');

        try {
            // Discord webhook URL
            const webhookURL = 'https://discord.com/api/webhooks/1468659049007677462/mJiEqVslkWJNN_arpX3uNRzgSsk98zMkMR3sUDRo7VLzLzRjnhOghWIYJYDBW5T0ye2i';

            // Create Discord embed message
            const discordMessage = {
                embeds: [{
                    title: '📧 New Portfolio Contact Form Submission',
                    color: 0x4F9DFF, // Accent color in hex
                    fields: [
                        {
                            name: '👤 Name',
                            value: formData.name,
                            inline: true
                        },
                        {
                            name: '📧 Email',
                            value: formData.email,
                            inline: true
                        },
                        {
                            name: '💬 Message',
                            value: formData.message || 'No message provided',
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: 'Portfolio Contact Form'
                    }
                }]
            };

            // Send to Discord webhook
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordMessage)
            });

            if (response.ok) {
                setStatus('✅ Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });

                setTimeout(() => {
                    setStatus('');
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('❌ Failed to send message. Please try again or email me directly.');

            setTimeout(() => {
                setStatus('');
            }, 5000);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'mrwan8khaled@gmail.com',
            href: 'mailto:mrwan8khaled@gmail.com'
        },
        {
            icon: DiscordIcon,
            label: 'Discord',
            value: 'mrwan_khaled_',
            href: 'https://discord.com/users/1398744468164968468',
            copyText: 'mrwan_khaled_'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+20 106 136 1276',
            href: 'tel:+201061361276'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Egypt',
            href: null
        }
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/Mrwan8Khaled/", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/mrwan-khaled", label: "LinkedIn" },
        { icon: XIcon, href: "https://x.com/mrwankhaled", label: "X (Twitter)" },
        { icon: DiscordIcon, href: "https://discord.com/users/1398744468164968468", label: "Discord" }
    ];

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-3">
                    Let's Work Together
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full" />
                <p className="text-text-secondary mt-4 max-w-2xl">
                    Have a project in mind or just want to chat? Feel free to reach out!
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-card-bg border border-white/10 rounded-xl text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-accent text-[#0E0E10] font-bold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(79,157,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            Send Message
                        </button>

                        {status && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-accent text-sm text-center font-medium"
                            >
                                {status}
                            </motion.p>
                        )}
                    </form>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-8"
                >
                    {/* Contact Details */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Contact Information</h3>
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                                    <item.icon className="text-text-secondary group-hover:text-accent transition-colors duration-300" size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary opacity-60 mb-1">
                                        {item.label}
                                    </p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-text-primary hover:text-accent transition-colors duration-300 font-medium selection:bg-accent/20"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-text-primary font-medium selection:bg-accent/20">{item.value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="pt-8 border-t border-white/10">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Connect With Me</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 bg-card-bg border border-white/10 rounded-xl hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-text-secondary group-hover:text-accent transition-colors duration-300" size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Additional CTA */}
                    <div className="p-6 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl">
                        <h4 className="text-lg font-bold text-text-primary mb-2">Ready to start?</h4>
                        <p className="text-text-secondary text-sm mb-4">
                            Let's bring your ideas to life. I'm always excited to collaborate on new projects!
                        </p>
                        <a
                            href="mailto:mrwan8khaled@gmail.com"
                            className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all duration-300"
                        >
                            Drop me an email
                            <Send size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
