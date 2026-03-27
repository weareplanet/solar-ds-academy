import { QuizQuestion } from '@/components/QuizEngine';

const quizData: Record<string, QuizQuestion[]> = {
  '01': [
    {
      id: '01-1',
      question: 'Where do you open the Copilot Chat panel?',
      options: [
        'File → New Window',
        'Cmd+Shift+I or the chat icon in the sidebar',
        'Terminal → New Terminal',
        'View → Extensions',
      ],
      correctIndex: 1,
      explanation:
        'The Copilot Chat panel opens with Cmd+Shift+I (macOS) or by clicking the chat icon in the Activity Bar.',
    },
    {
      id: '01-2',
      question: 'What command creates a new @Solar project?',
      options: [
        '@solar /validate',
        '@solar /share',
        '@solar /initiate',
        '@solar /create',
      ],
      correctIndex: 2,
      explanation:
        '@solar /initiate creates a complete new project with 24 files, navigation, theming, and a live preview.',
    },
    {
      id: '01-3',
      question: 'Do you need to know a programming language to use @Solar?',
      options: [
        'Yes, you need JavaScript',
        'Yes, you need TypeScript',
        'No — you describe what you want in plain English',
        'Only HTML and CSS',
      ],
      correctIndex: 2,
      explanation:
        '@Solar is designed for non-technical users. You describe screens in natural language and @Solar generates the code.',
    },
    {
      id: '01-4',
      question: 'What does @Solar create when you initiate a project?',
      options: [
        'A single HTML file',
        'A Figma design',
        'A complete app with ~24 files, navigation, and theming',
        'A PDF mockup',
      ],
      correctIndex: 2,
      explanation:
        '@Solar scaffolds a full React app with navigation, theming, and a live preview — all from one command.',
    },
    {
      id: '01-5',
      question: 'Where does the live preview appear?',
      options: [
        'In a separate Chrome window',
        "In VS Code's built-in browser panel",
        'On your phone',
        'In Figma',
      ],
      correctIndex: 1,
      explanation:
        "The live preview opens in VS Code's Simple Browser panel so you can see changes without leaving the editor.",
    },
  ],
  '02': [
    {
      id: '02-1',
      question: 'Can @Solar build multiple pages in one project?',
      options: [
        'No, only one page per project',
        "Yes, you can add pages by describing them",
        'Only with coding knowledge',
        'Only up to 3 pages',
      ],
      correctIndex: 1,
      explanation:
        'You can add as many pages as you want by describing each one in the Copilot Chat.',
    },
    {
      id: '02-2',
      question: 'Where do new pages appear in the app?',
      options: [
        'In a separate browser tab',
        'You need to manually add them',
        'In the sidebar navigation (auto-added)',
        'In the terminal',
      ],
      correctIndex: 2,
      explanation:
        '@Solar automatically adds new pages to the sidebar navigation so they are immediately accessible.',
    },
    {
      id: '02-3',
      question: "What's the best way to describe a data table?",
      options: [
        'Just say "add a table"',
        'Specify column names and data types',
        'Paste a SQL query',
        'Draw it on paper first',
      ],
      correctIndex: 1,
      explanation:
        'Being specific about column names gives @Solar the information it needs to build an accurate table.',
    },
    {
      id: '02-4',
      question: 'Does @Solar modify existing files when adding a new page?',
      options: [
        'Yes, it rewrites every file',
        'No, it only creates new files',
        'It deletes old pages first',
        'Only if you ask it to',
      ],
      correctIndex: 1,
      explanation:
        '@Solar adds new page files and updates navigation without touching your existing pages.',
    },
    {
      id: '02-5',
      question: 'How do you see the new page immediately?',
      options: [
        'Restart VS Code',
        'Run a build command in the terminal',
        '@Solar navigates the preview to the new page automatically',
        'Open a new browser tab',
      ],
      correctIndex: 2,
      explanation:
        '@Solar automatically navigates the built-in preview to show the newly created page.',
    },
  ],
  '03': [
    {
      id: '03-1',
      question: "How do you show Copilot what you're looking at?",
      options: [
        'Copy the page URL',
        'Type #browser or use "Select Element"',
        'Take a phone photo',
        'Describe the layout in detail',
      ],
      correctIndex: 1,
      explanation:
        'Typing #browser attaches a screenshot of the live preview to your chat message, giving Copilot visual context.',
    },
    {
      id: '03-2',
      question: 'Does @Solar need you to specify CSS or component names?',
      options: [
        'Yes, always',
        'Only for complex layouts',
        'No, just describe what you want visually',
        'Only for colors',
      ],
      correctIndex: 2,
      explanation:
        '@Solar translates your natural language descriptions into the correct CSS and components automatically.',
    },
    {
      id: '03-3',
      question: 'Can you ask @Solar to make a page responsive?',
      options: [
        'No, all pages are fixed-width',
        'Yes',
        'Only with CSS knowledge',
        'Only on mobile devices',
      ],
      correctIndex: 1,
      explanation:
        'You can simply ask @Solar to make any page responsive, and it will add mobile-friendly layouts.',
    },
    {
      id: '03-4',
      question: 'What happens to existing pages when you modify one?',
      options: [
        'All pages are rebuilt',
        'Other pages may break',
        "They're untouched",
        'They lose their styling',
      ],
      correctIndex: 2,
      explanation:
        '@Solar only modifies the files you ask it to change. Other pages remain untouched.',
    },
    {
      id: '03-5',
      question: "What's the recommended refinement approach?",
      options: [
        'Make all changes at once in one big prompt',
        'Small iterative changes, one at a time',
        'Describe the full page from scratch each time',
        'Only refine at the end',
      ],
      correctIndex: 1,
      explanation:
        'Small, focused prompts work best. Each change is easier for the AI to understand and apply correctly.',
    },
  ],
  '04': [
    {
      id: '04-1',
      question: 'What does /validate check for?',
      options: [
        'Grammar and spelling',
        'Common mistakes (wrong imports, wrong icons, missing theme)',
        'JavaScript performance',
        'Database connections',
      ],
      correctIndex: 1,
      explanation:
        '/validate checks for Solar Design System compliance: correct imports, icon variants, theme usage, and more.',
    },
    {
      id: '04-2',
      question: 'Does /validate change your code?',
      options: [
        'Yes, it auto-fixes everything',
        'No, it only reports issues',
        'It deletes broken files',
        'It rewrites the entire project',
      ],
      correctIndex: 1,
      explanation:
        '/validate is read-only — it reports issues but lets you decide how to fix them (often by asking @Solar).',
    },
    {
      id: '04-3',
      question: 'What does /share do?',
      options: [
        'Sends a screenshot via email',
        'Exports to Figma',
        'Builds and deploys the app to a permanent public URL',
        'Creates a PDF report',
      ],
      correctIndex: 2,
      explanation:
        '/share builds your project and deploys it to a public URL that anyone can access.',
    },
    {
      id: '04-4',
      question: 'Can anyone see the shared URL?',
      options: [
        'Only @weareplanet employees',
        "Yes, it's a public link",
        'Only people with the VS Code extension',
        'Only on the company VPN',
      ],
      correctIndex: 1,
      explanation:
        'Shared prototypes are deployed to a public URL for easy stakeholder review.',
    },
    {
      id: '04-5',
      question: 'What icon variant does the Solar Design System require?',
      options: ['Outlined', 'Sharp', 'Filled', 'Rounded'],
      correctIndex: 3,
      explanation:
        'The Solar Design System uses the Rounded variant of Material Icons for visual consistency.',
    },
  ],
  '05': [
    {
      id: '05-1',
      question: 'Can @Solar replace a design tool like Figma?',
      options: [
        'Yes, completely',
        'No — it complements it for rapid prototyping and validation',
        'Only for simple designs',
        'Only if you know React',
      ],
      correctIndex: 1,
      explanation:
        '@Solar is a prototyping tool that complements design tools like Figma — not a replacement.',
    },
    {
      id: '05-2',
      question: "What's the fastest way to explore multiple UI options?",
      options: [
        'Create separate Figma files',
        'Build variants with @Solar and compare',
        'Draw on paper',
        'Write detailed specifications',
      ],
      correctIndex: 1,
      explanation:
        'You can rapidly build different versions with @Solar and compare working prototypes side by side.',
    },
    {
      id: '05-3',
      question: 'Should you use @Solar prototypes as production code?',
      options: [
        'Yes, always',
        'No — they are for validation and alignment',
        'Only if /validate passes',
        'Only with developer review',
      ],
      correctIndex: 1,
      explanation:
        '@Solar prototypes are for validation, alignment, and communication — not production deployment.',
    },
    {
      id: '05-4',
      question: 'How can a shared prototype help sprint planning?',
      options: [
        'It replaces sprint planning',
        'Reveals complexity and surfaces edge cases',
        'It automatically creates Jira tickets',
        'It measures team velocity',
      ],
      correctIndex: 1,
      explanation:
        'A working prototype surfaces edge cases and complexity that aren\'t visible in static mockups.',
    },
    {
      id: '05-5',
      question: "What makes @Solar unique vs. generic prototyping tools?",
      options: [
        'It runs faster',
        "It uses Planet's actual Solar Design System",
        'It has more templates',
        "It's free",
      ],
      correctIndex: 1,
      explanation:
        "@Solar generates code using Planet's official Solar Design System components, ensuring brand consistency.",
    },
  ],
  '06': [
    {
      id: '06-1',
      question: 'What is a repository?',
      options: [
        'A chat channel',
        'A database',
        'A project folder stored in the cloud',
        'A deployment server',
      ],
      correctIndex: 2,
      explanation:
        "A repository (or 'repo') is like a project folder that lives in the cloud with full version history.",
    },
    {
      id: '06-2',
      question: 'What is the purpose of a Pull Request?',
      options: [
        'To download code',
        'To propose and review changes before merging',
        'To delete a branch',
        'To deploy to production',
      ],
      correctIndex: 1,
      explanation:
        'A Pull Request lets you propose changes, get reviews, and merge them into the main codebase.',
    },
    {
      id: '06-3',
      question: 'What does CI mean in the context of a PR?',
      options: [
        'Continuous Integration — automated checks that validate the changes',
        'Creative Interface',
        'Code Inspector',
        'Content Index',
      ],
      correctIndex: 0,
      explanation:
        'CI (Continuous Integration) runs automated tests and checks on every Pull Request to catch issues early.',
    },
    {
      id: '06-4',
      question: 'Can you create a GitHub Issue without writing code?',
      options: [
        'No, Issues require code changes',
        'Yes',
        'Only admins can create Issues',
        'Only with a paid account',
      ],
      correctIndex: 1,
      explanation:
        "Anyone with access to a repo can create Issues — they're for tracking tasks, bugs, and feature requests.",
    },
    {
      id: '06-5',
      question: 'Where do you find downloadable releases of @Solar?',
      options: [
        'In the README file',
        'In the Issues tab',
        'In the Releases section of the repository',
        'In the Settings page',
      ],
      correctIndex: 2,
      explanation:
        "GitHub Releases contain downloadable artifacts (like .vsix files) and release notes for each version.",
    },
  ],
};

export default quizData;
