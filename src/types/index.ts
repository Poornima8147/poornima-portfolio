export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  category: 'web' | 'game' | 'utility';
  tags: string[];
  image: string;
  githubUrl: string;
  features: string[];
  techStack: string[];
  role: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frontend' | 'Databases' | 'Version Control';
  proficiencyLabel: string;
  description: string;
  experienceContext: string;
}

export interface LearningItem {
  topic: string;
  category: string;
  summary: string;
  status: 'In Progress' | 'Deep Dive' | 'Experimenting';
}

export interface TerminalEntry {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}
