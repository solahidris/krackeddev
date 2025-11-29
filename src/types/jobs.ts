export enum QuestDifficulty {
    EASY = 'D-Rank',
    MEDIUM = 'C-Rank',
    HARD = 'B-Rank',
    EXPERT = 'A-Rank',
    LEGENDARY = 'S-Rank'
}

export enum JobType {
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
    FULLSTACK = 'Fullstack',
    MOBILE = 'Mobile',
    DEVOPS = 'DevOps',
    DESIGN = 'Design',
    DATA = 'Data',
    GAME = 'Game Dev',
    OTHER = 'Other'
}

export interface Quest {
    id: string;
    title: string; // The "Fantasy" title
    realTitle: string; // The actual job title
    company: string; // The "Guild" or "Kingdom"
    description: string; // Fantasy description
    requirements: string[]; // "Required Skills"
    reward: string; // Salary or "Gold"
    difficulty: QuestDifficulty;
    jobType: JobType;
    location: string;
    xp: number;
}

export interface CharacterStats {
    name: string;
    level: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    gold: number;
    class: string;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
}

export interface Education {
    id: string;
    degree: string;
    school: string;
    year: string;
}

export interface Honor {
    id: string;
    title: string;
    issuer: string;
    date: string;
}

export interface UserProfile {
    resumeName: string | null;
    experiences: Experience[];
    skills: string[];
    education: Education[];
    honors: Honor[];
    certs: string[];
}

export type ViewState = 'START_SCREEN' | 'TOWN_SQUARE' | 'GUILD_HALL' | 'QUEST_DETAIL' | 'PROFILE' | 'TRAINING_CAMP';
