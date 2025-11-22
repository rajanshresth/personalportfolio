export interface Education {
  degree: string;
  school: string;
  year: string;
  details: string;
  courses: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  points: string[];
  type: 'Academic' | 'Major' | 'Design';
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  education: Education[];
  skills: Record<string, string[]>;
  projects: Project[];
  achievements: Achievement[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}