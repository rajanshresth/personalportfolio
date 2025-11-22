import React from 'react';
import { PROFILE } from '../constants';
import { motion } from 'framer-motion';
import { BookOpen, Cpu, Database, PenTool, Trophy } from 'lucide-react';

const SkillGroup: React.FC<{ title: string; skills: string[]; icon: React.ReactNode; delay: number }> = ({ title, skills, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-2">
      {skills.map((skill, idx) => (
        <li key={idx} className="text-sm text-gray-600 flex items-start">
          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
          {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

export const About: React.FC = () => {
  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
        <div className="prose prose-zinc max-w-none text-gray-600">
          <p className="text-lg leading-relaxed">{PROFILE.summary}</p>
        </div>
      </motion.div>

      {/* Skills Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillGroup 
            title="Data Analysis" 
            skills={PROFILE.skills["Data Analysis"]} 
            icon={<Database size={20} />}
            delay={0.1}
          />
          <SkillGroup 
            title="Programming" 
            skills={PROFILE.skills["Programming"]} 
            icon={<Cpu size={20} />}
            delay={0.2}
          />
          <SkillGroup 
            title="Design & Core" 
            skills={PROFILE.skills["Design & Core"]} 
            icon={<PenTool size={20} />}
            delay={0.3}
          />
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Education</h3>
        <div className="space-y-8 border-l-2 border-indigo-100 pl-8 relative">
          {PROFILE.education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-0 p-2 bg-white border-2 border-indigo-100 rounded-full text-indigo-600">
                <BookOpen size={16} />
              </span>
              <span className="text-sm font-semibold text-indigo-600 mb-1 block">{edu.year}</span>
              <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
              <p className="text-gray-700 font-medium mb-2">{edu.school}</p>
              <p className="text-gray-600 text-sm mb-2">{edu.details}</p>
              <p className="text-gray-500 text-xs italic">Relevant Coursework: {edu.courses}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Achievements</h3>
        <div className="grid gap-4">
          {PROFILE.achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full mr-4">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{ach.title}</h4>
                <p className="text-sm text-gray-600">{ach.event} <span className="text-gray-400">• {ach.year}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};