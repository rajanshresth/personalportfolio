import React from 'react';
import { PROFILE } from '../constants';
import { ArrowRight, MapPin, Download, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { About } from './About';
import { Portfolio } from './Portfolio';


export const Home: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex items-center min-h-[calc(100vh-8rem)] mb-20 pt-10 md:pt-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Industrial Engineering Student
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
              <span className="underline decoration-indigo-600 decoration-4 underline-offset-8">Hi, I'm {PROFILE.name.split(' ')[0]}.</span> <br />
              <span className="text-gray-900 relative inline-block text-3xl md:text-5xl">
                I analyze & optimize.
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-100 -z-10"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mb-8 leading-relaxed">
              {PROFILE.summary.split('.')[0]}. Passionate about data-driven decision-making using Operations Research and Simulation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <a
                href="/Rajan_IE_Resume.pdf"
                download="Rajan_IE_Resume.pdf"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all hover:border-gray-300"
              >
                Download CV
                <Download className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center text-gray-500 text-sm font-medium">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                 <MapPin className="w-4 h-4 text-gray-700" />
              </div>
              {PROFILE.location}
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center md:justify-end relative"
          >
            <div className="relative w-72 h-72 md:w-[450px] md:h-[500px]">
              {/* Decorative Blobs */}
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute top-1/2 -left-4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Main Image - Straight, No Tilt */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-500 bg-gray-200">
                 <img 
                   src="/profile.webp" 
                   alt="Rajan Shrestha" 
                   className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                 />
                 {/* Overlay Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hidden md:flex flex-col items-center cursor-pointer hover:text-indigo-600 transition-colors"
        >
            <span className="text-xs font-medium tracking-widest uppercase mb-2">Scroll</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown size={20} />
            </motion.div>
        </motion.div>
      </section>

      <div className="space-y-32 pb-20">
        <section id="about" className="scroll-mt-24">
            <About />
        </section>
        <section id="portfolio" className="scroll-mt-24">
            <Portfolio isPreview={true} />
        </section>

      </div>
    </div>
  );
};