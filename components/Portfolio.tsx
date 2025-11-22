import React, { useState } from 'react';
import { PROFILE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Search } from 'lucide-react';

const ProjectCard: React.FC<{ project: typeof PROFILE.projects[0]; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium 
            ${project.type === 'Academic' ? 'bg-blue-50 text-blue-700' : 
              project.type === 'Major' ? 'bg-purple-50 text-purple-700' : 
              'bg-emerald-50 text-emerald-700'}`}>
            {project.type} Project
          </span>

        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mb-6 flex-grow">
          <ul className="space-y-2">
            {project.points.slice(0, 3).map((point, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-500">
                <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                {point.split(':')[0]} {/* Showing summary of point */}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-gray-50">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface PortfolioProps {
  isPreview?: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ isPreview = false }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const types = ['All', 'Academic', 'Major', 'Design'];

  const filteredProjects = PROFILE.projects.filter(p => {
    const matchesType = filter === 'All' || p.type === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Selected Work</h2>
            <p className="text-gray-600 max-w-2xl">
              A collection of projects focusing on Operational Research, Simulation, and Industrial IoT solutions.
            </p>
          </div>
        </div>
      </motion.div>

      {!isPreview && (
        <div className="mb-10 flex flex-col md:flex-row justify-between gap-4 items-center">
           <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
             {types.map(type => (
               <button
                 key={type}
                 onClick={() => setFilter(type)}
                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                   filter === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                 }`}
               >
                 {type}
               </button>
             ))}
           </div>

           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))
          ) : (
             <div className="col-span-full text-center py-10 text-gray-500">
               No projects found matching your criteria.
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};