import React from 'react';
import { Database, ExternalLink } from 'lucide-react';

export const SectionHeading = ({ children, number }: { children: React.ReactNode, number: string }) => (
    <div className="flex items-center gap-4 mb-12 group">
        <span className="text-teal-500 font-mono text-xl">{number}.</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-200 group-hover:translate-x-2 transition-transform duration-300">
            {children}
        </h2>
        <div className="h-px bg-slate-700 flex-grow max-w-xs ml-4"></div>
    </div>
);

export const SkillCard = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-colors duration-300 hover:-translate-y-1 transform">
        <div className="flex items-center gap-3 mb-4 text-teal-400">
            <Icon size={24} />
            <h3 className="font-semibold text-lg text-slate-100">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
                <span key={idx} className="text-sm bg-slate-900/50 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

export const ProjectCard = ({ project, onClick }: { project: any, onClick?: () => void }) => {
    // If onClick is provided, use it (for interactivity if needed inside island), 
    // otherwise wrapping anchor in Astro page handles navigation.
    // Actually, in Astro, we prefer <a> tags for navigation.
    // So we will modify this to accept an `href` or be wrapped by one.
    // For now, let's keep it simple and assume it's wrapped or used in a way that supports the design.

    return (
        <article
            className="group relative bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-teal-900/20 transition-all duration-300 h-full flex flex-col cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-8 flex flex-col flex-grow z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-900/80 rounded-lg text-teal-400">
                        <Database size={24} aria-hidden="true" />
                    </div>
                    {/* External link button */}
                    {project.link && project.link !== '#' && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-500 hover:text-teal-400 transition-colors"
                            aria-label={`External link to ${project.title}`}
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-teal-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-xs font-mono text-teal-300/80">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};
