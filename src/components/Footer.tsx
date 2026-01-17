import React from 'react';
import { Github, Linkedin, Briefcase } from 'lucide-react';
import { PROFILE } from '../consts';

export const Footer = () => {
    return (
        <footer className="py-8 text-center text-slate-500 text-sm font-mono transition-colors">
            <div className="flex justify-center gap-6 mb-4">
                <a href={PROFILE.socials[0].url} aria-label="Upwork Profile" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400"><Briefcase size={20} /></a>
                <a href="https://github.com/rajanshresth" aria-label="GitHub Profile" className="text-slate-400 hover:text-teal-400"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/rajan10x/" aria-label="LinkedIn Profile" className="text-slate-400 hover:text-teal-400"><Linkedin size={20} /></a>
            </div>

            <div className="flex flex-col items-center gap-2">
                <a href="#" target="_blank" rel="noreferrer" className="hover:text-teal-500">
                    Designed & Built by Rajan Shrestha
                </a>
            </div>
        </footer>
    );
};
