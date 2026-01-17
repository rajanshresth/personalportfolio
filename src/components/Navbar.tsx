import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Simple scroll handler for same-page links, or navigation for other pages
    const handleNavClick = (id: string) => {
        setIsMenuOpen(false);

        // Check if we are on the home page
        if (window.location.pathname === '/' || window.location.pathname === '') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Go to home with hash
            window.location.href = `/#${id}`;
        }
    };

    const navLinks = [
        { name: 'About', id: 'about' },
        { name: 'Experience', id: 'experience' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <a
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent cursor-pointer font-mono tracking-tighter"
                >
                    rs.
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link, i) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className="text-sm font-medium hover:text-teal-400 transition-colors relative group text-slate-300"
                        >
                            <span className="text-teal-500/50 font-mono text-xs mr-1">0{i + 1}.</span>
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-teal-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-6 shadow-2xl">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className="text-lg font-medium text-left text-slate-300 hover:text-teal-400"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};
