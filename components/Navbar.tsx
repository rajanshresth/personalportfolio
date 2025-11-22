import React from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200 transition-all duration-300">
      <div className="w-full max-w-[80%] mx-auto flex justify-between items-center h-20 px-4 md:px-0">
        
        {/* Left Side: Navigation (Desktop) / Toggle (Mobile) */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group py-2 ${
                    isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Logo */}
        <Link 
          to="/" 
          className="group flex items-baseline gap-0.5"
        >
          <span className="font-black text-2xl text-gray-900 tracking-tighter transition-colors duration-300">
            RS
          </span>
          <span className="font-black text-3xl text-indigo-600 leading-none group-hover:scale-110 transition-transform duration-300">
            .
          </span>
        </Link>

      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col p-6 space-y-6 bg-gray-50/50">
              {NAV_LINKS.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-medium flex items-center justify-between ${
                      isActive ? 'text-indigo-600' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                    {isActive && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};