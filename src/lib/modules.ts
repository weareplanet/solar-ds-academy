/** Module metadata shared across pages */
export interface ModuleInfo {
  id: string;
  number: number;
  title: string;
  level: string;
  duration: string;
  description: string;
  icon: string;
}

export const modules: ModuleInfo[] = [
  {
    id: '01',
    number: 1,
    title: 'Getting Started: Your Toolkit',
    level: 'Beginner',
    duration: '45 min',
    description:
      'Install everything and run your first @Solar command.',
    icon: '🚀',
  },
  {
    id: '02',
    number: 2,
    title: 'Building Screens with Natural Language',
    level: 'Beginner',
    duration: '60 min',
    description:
      'Create multiple pages by describing them in plain English.',
    icon: '🗣️',
  },
  {
    id: '03',
    number: 3,
    title: 'Visual Context & Iterative Refinement',
    level: 'Intermediate',
    duration: '45 min',
    description:
      'Use screenshots and element selection to refine designs precisely.',
    icon: '🎨',
  },
  {
    id: '04',
    number: 4,
    title: 'Validation & Sharing Prototypes',
    level: 'Intermediate',
    duration: '45 min',
    description:
      'Ensure quality with /validate and share prototypes with /share.',
    icon: '✅',
  },
  {
    id: '05',
    number: 5,
    title: 'Real-World Product Workflows',
    level: 'Advanced',
    duration: '90 min',
    description:
      'Apply @Solar to actual product decision-making scenarios.',
    icon: '💼',
  },
  {
    id: '06',
    number: 6,
    title: 'GitHub Basics for Product People',
    level: 'Beginner–Intermediate',
    duration: '60 min',
    description:
      'Navigate GitHub confidently for product work (no coding required).',
    icon: '🐙',
  },
];
