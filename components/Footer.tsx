import React from 'react';
import { PROFILE } from '../constants';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 border-t border-zinc-200 bg-white">
      <div className="w-full max-w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-0">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
        
        <div className="flex gap-6">
           <a href={`mailto:${PROFILE.email}`} className="text-gray-400 hover:text-indigo-600 transition-colors">
             <Mail size={20} />
           </a>
           <a href={`tel:${PROFILE.phone}`} className="text-gray-400 hover:text-indigo-600 transition-colors">
             <Phone size={20} />
           </a>
           <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
             <Linkedin size={20} />
           </a>
           <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
             <Github size={20} />
           </a>
        </div>
      </div>
    </footer>
  );
};