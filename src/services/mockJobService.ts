import { Quest, QuestDifficulty, JobType } from "../types/jobs";

const MOCK_QUESTS: Quest[] = [
    // Frontend Jobs
    {
        id: 'quest-1',
        title: 'Slay the Legacy Code Dragon',
        realTitle: 'Senior Frontend Engineer',
        company: 'TechCorp Guild',
        description: 'A beast of ancient jQuery terrorizes the codebase. Migrate it to the React Kingdom with modern magic.',
        requirements: ['React Mastery', 'TypeScript Scroll', 'CSS Grid Shield'],
        reward: '140k - 180k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.FRONTEND,
        location: 'San Francisco Citadel',
        xp: 3500
    },
    {
        id: 'quest-2',
        title: 'Construct the Pixel Palace Interface',
        realTitle: 'Frontend Developer',
        company: 'Startup Faction',
        description: 'Build a beautiful UI for our users using modern spells. Must master the art of responsive design.',
        requirements: ['React Magic', 'Tailwind Potion', 'Figma Scroll'],
        reward: '100k - 130k Gold',
        difficulty: QuestDifficulty.MEDIUM,
        jobType: JobType.FRONTEND,
        location: 'Remote Realm',
        xp: 2500
    },
    {
        id: 'quest-3',
        title: 'Forge the Animation Enchantment',
        realTitle: 'Frontend UI/UX Engineer',
        company: 'Creative Studios',
        description: 'Cast smooth animations and delightful micro-interactions to enchant our users.',
        requirements: ['Framer Motion', 'GSAP Spell', 'Three.js Orb'],
        reward: '120k - 150k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.FRONTEND,
        location: 'New York Tower',
        xp: 3200
    },

    // Backend Jobs
    {
        id: 'quest-4',
        title: 'Tame the Database Hydra',
        realTitle: 'Senior Backend Engineer',
        company: 'The Ancient Bank',
        description: 'Multiple heads of unstructured data are multiplying! Design scalable APIs and optimize queries.',
        requirements: ['Node.js Staff', 'PostgreSQL Grimoire', 'Redis Cache'],
        reward: '160k - 200k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.BACKEND,
        location: 'Seattle Fortress',
        xp: 4500
    },
    {
        id: 'quest-5',
        title: 'Build the Microservices Kingdom',
        realTitle: 'Backend Architect',
        company: 'Enterprise Corp',
        description: 'Design and implement a distributed microservices architecture to serve millions.',
        requirements: ['Go Lang', 'Kubernetes Helm', 'gRPC Protocol'],
        reward: '180k - 220k Gold',
        difficulty: QuestDifficulty.LEGENDARY,
        jobType: JobType.BACKEND,
        location: 'Austin Citadel',
        xp: 5000
    },
    {
        id: 'quest-6',
        title: 'Optimize the API Gateway',
        realTitle: 'Backend Developer',
        company: 'FinTech Alliance',
        description: 'Our gateway is slow! Optimize APIs and reduce response times for better performance.',
        requirements: ['Python Staff', 'FastAPI', 'SQL Mastery'],
        reward: '130k - 160k Gold',
        difficulty: QuestDifficulty.MEDIUM,
        jobType: JobType.BACKEND,
        location: 'London Bridge',
        xp: 3000
    },

    // Fullstack Jobs
    {
        id: 'quest-7',
        title: 'Master of Both Realms',
        realTitle: 'Fullstack Engineer',
        company: 'Scaling Startup',
        description: 'Command both frontend and backend magic. Build features from database to UI.',
        requirements: ['React + Node', 'SQL + NoSQL', 'AWS Cloud'],
        reward: '150k - 190k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.FULLSTACK,
        location: 'Remote Realm',
        xp: 4000
    },
    {
        id: 'quest-8',
        title: 'The Full Stack Wizard',
        realTitle: 'Senior Fullstack Developer',
        company: 'SaaS Kingdom',
        description: 'Own features end-to-end. Ship fast and iterate with the team.',
        requirements: ['Next.js Charm', 'Prisma ORM', 'Vercel Deploy'],
        reward: '140k - 170k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.FULLSTACK,
        location: 'Berlin Castle',
        xp: 3800
    },

    // Mobile Jobs
    {
        id: 'quest-9',
        title: 'Mobile App Adventure',
        realTitle: 'Mobile Developer',
        company: 'App Store Guild',
        description: 'Build cross-platform apps that delight users on iOS and Android.',
        requirements: ['React Native Boots', 'Swift Dagger', 'Kotlin Shield'],
        reward: '130k - 160k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.MOBILE,
        location: 'Remote Realm',
        xp: 3200
    },
    {
        id: 'quest-10',
        title: 'Craft the Native Experience',
        realTitle: 'iOS Engineer',
        company: 'Mobile First Co',
        description: 'Build beautiful native iOS apps with SwiftUI and modern patterns.',
        requirements: ['SwiftUI Magic', 'Combine Framework', 'Core Data'],
        reward: '150k - 180k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.MOBILE,
        location: 'Cupertino Keep',
        xp: 4200
    },

    // DevOps Jobs
    {
        id: 'quest-11',
        title: 'Guard the Cloud Gates',
        realTitle: 'DevOps Engineer',
        company: 'Security Corp',
        description: 'Reinforce infrastructure and automate deployments. Keep the servers safe from trolls.',
        requirements: ['Docker Golem', 'Kubernetes Helm', 'Terraform Scroll'],
        reward: '140k - 170k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.DEVOPS,
        location: 'Austin Outpost',
        xp: 3500
    },
    {
        id: 'quest-12',
        title: 'The CI/CD Automation Quest',
        realTitle: 'Platform Engineer',
        company: 'Tech Giant',
        description: 'Build and maintain CI/CD pipelines that enable hundreds of daily deployments.',
        requirements: ['GitHub Actions', 'AWS CDK', 'Monitoring Tools'],
        reward: '160k - 200k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.DEVOPS,
        location: 'Seattle Spire',
        xp: 4300
    },

    // Design Jobs
    {
        id: 'quest-13',
        title: 'Design the Royal Crest',
        realTitle: 'UI/UX Designer',
        company: 'Creative Studio',
        description: 'Craft delightful user experiences and pixel-perfect interfaces.',
        requirements: ['Figma Brush', 'User Research Map', 'Prototyping Wand'],
        reward: '100k - 130k Gold',
        difficulty: QuestDifficulty.MEDIUM,
        jobType: JobType.DESIGN,
        location: 'London Tower',
        xp: 2500
    },
    {
        id: 'quest-14',
        title: 'The Design System Architect',
        realTitle: 'Senior Product Designer',
        company: 'Enterprise Guild',
        description: 'Build and maintain a comprehensive design system used across the kingdom.',
        requirements: ['Design Systems', 'Component Libraries', 'Accessibility'],
        reward: '140k - 170k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.DESIGN,
        location: 'San Francisco Bay',
        xp: 3800
    },

    // Data Jobs
    {
        id: 'quest-15',
        title: 'Decode the Data Prophecy',
        realTitle: 'Data Scientist',
        company: 'AI Research Lab',
        description: 'Analyze petabytes of data and build ML models to predict the future.',
        requirements: ['Python Staff', 'TensorFlow Orb', 'SQL Grimoire'],
        reward: '160k - 200k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.DATA,
        location: 'Mountain View',
        xp: 4500
    },
    {
        id: 'quest-16',
        title: 'The Machine Learning Alchemist',
        realTitle: 'ML Engineer',
        company: 'Tech Unicorn',
        description: 'Train models, deploy pipelines, and bring AI magic to production.',
        requirements: ['PyTorch', 'MLOps', 'Cloud Platforms'],
        reward: '170k - 210k Gold',
        difficulty: QuestDifficulty.LEGENDARY,
        jobType: JobType.DATA,
        location: 'San Francisco',
        xp: 5000
    },

    // Game Dev Jobs
    {
        id: 'quest-17',
        title: 'Craft the Virtual Realm',
        realTitle: 'Game Developer',
        company: 'Indie Game Studio',
        description: 'Build immersive game experiences using Unity or Unreal Engine.',
        requirements: ['Unity Engine', 'C# Scroll', 'Shader Magic'],
        reward: '110k - 140k Gold',
        difficulty: QuestDifficulty.HARD,
        jobType: JobType.GAME,
        location: 'Remote Realm',
        xp: 3500
    },
    {
        id: 'quest-18',
        title: 'The Gameplay Engineer',
        realTitle: 'Senior Game Engineer',
        company: 'AAA Studio',
        description: 'Implement core gameplay mechanics for our next blockbuster title.',
        requirements: ['Unreal Engine', 'C++ Mastery', 'Physics Systems'],
        reward: '150k - 180k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.GAME,
        location: 'Los Angeles',
        xp: 4200
    },

    // Other Jobs
    {
        id: 'quest-19',
        title: 'The Security Paladin',
        realTitle: 'Security Engineer',
        company: 'CyberSec Corp',
        description: 'Protect the realm from dark hackers. Implement security best practices.',
        requirements: ['Penetration Testing', 'Security Audits', 'Compliance'],
        reward: '140k - 180k Gold',
        difficulty: QuestDifficulty.EXPERT,
        jobType: JobType.OTHER,
        location: 'Washington DC',
        xp: 4000
    },
    {
        id: 'quest-20',
        title: 'The QA Guardian',
        realTitle: 'QA Automation Engineer',
        company: 'Quality First Inc',
        description: 'Ensure quality through comprehensive automated testing strategies.',
        requirements: ['Selenium', 'Cypress', 'Test Frameworks'],
        reward: '120k - 150k Gold',
        difficulty: QuestDifficulty.MEDIUM,
        jobType: JobType.OTHER,
        location: 'Remote Realm',
        xp: 3000
    }
];

const TRAINING_TIPS = [
    "Keep your shield up and your code clean, recruit!",
    "A well-crafted resume is your strongest armor. Polish it daily.",
    "Networking is like building alliances. Don't go into the boss battle alone.",
    "Interviewing is a skill. Practice your parries and counter-attacks.",
    "Your portfolio is your trophy room. Show off your best loot.",
    "Don't fear the rejection dragon. It only makes you stronger.",
    "Learn to rest. A tired warrior makes mistakes.",
    "Read the documentation scrolls. Knowledge is power.",
    "Tailor your resume for each quest. Generic scrolls are easily discarded.",
    "Follow up after interviews. Persistence is a warrior's virtue."
];

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const generateQuests = async (query: string): Promise<Quest[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Randomize the order
    const randomized = shuffleArray(MOCK_QUESTS);

    // Simple filter simulation
    const lowerQuery = query.toLowerCase();
    const filtered = randomized.filter(q =>
        q.title.toLowerCase().includes(lowerQuery) ||
        q.realTitle.toLowerCase().includes(lowerQuery) ||
        q.description.toLowerCase().includes(lowerQuery) ||
        q.jobType.toLowerCase().includes(lowerQuery) ||
        q.requirements.some(r => r.toLowerCase().includes(lowerQuery))
    );

    // If no specific matches, return all randomized
    return filtered.length > 0 ? filtered : randomized;
};

export const generateTrainingTip = async (): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const randomIndex = Math.floor(Math.random() * TRAINING_TIPS.length);
    return TRAINING_TIPS[randomIndex];
};
