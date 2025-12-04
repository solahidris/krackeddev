// Onboarding Level and Task Types
export interface OnboardingTask {
  id: string;
  title: string;
  xp: number;
  category: string;
  description: string;
  optional?: boolean;
  section?: string; // For Level 1: "1A" | "1B" | "1C" | "1D" | "1E"
  order?: number; // Order within section
}

export interface OnboardingLevel {
  id: number;
  title: string;
  description: string;
  tasks: OnboardingTask[];
  totalXP: number;
  reward?: string;
}

// Level 1: Welcome to Kracked Devs
// SECTION 1A: LEVEL 1 - WELCOME TO KRACKED DEVS
const level1ATasks: OnboardingTask[] = [
  {
    id: "l1-avatar",
    title: "Create Avatar & Customize",
    xp: 20,
    category: "Account Setup",
    description: "Choose avatar appearance, skin, starting outfit",
    section: "1A",
    order: 1,
  },
  {
    id: "l1-profile-bio",
    title: "Complete Profile Bio",
    xp: 15,
    category: "Account Setup",
    description: "Write 50-100 character bio about yourself",
    section: "1A",
    order: 2,
  },
  {
    id: "l1-mission-video",
    title: "Watch Mission Video (2 min)",
    xp: 25,
    category: "Education",
    description: '"What is Kracked Devs?" intro video',
    section: "1A",
    order: 3,
  },
  {
    id: "l1-join-discord",
    title: "Join Community Discord",
    xp: 20,
    category: "Social",
    description: "Accept Discord invite, join #introductions",
    section: "1A",
    order: 4,
  },
  {
    id: "l1-intro-post",
    title: "Post Introduction in Discord",
    xp: 20,
    category: "Social/Community",
    description: "Introduce yourself in #introductions channel",
    section: "1A",
    order: 5,
  },
];

// SECTION 1B: LEVEL 2 - CONNECT YOUR PRESENCE
const level1BTasks: OnboardingTask[] = [
  {
    id: "l2-follow-twitter",
    title: "Follow Kracked Devs Twitter",
    xp: 15,
    category: "Social",
    description: "Link Twitter account, follow @krackeddevs",
    section: "1B",
    order: 1,
  },
  {
    id: "l2-follow-instagram",
    title: "Follow Kracked Devs Instagram",
    xp: 15,
    category: "Social",
    description: "Link Instagram account, follow @krackeddevs",
    section: "1B",
    order: 2,
  },
  {
    id: "l2-retweet-share",
    title: "Retweet/Share Kracked Devs Post",
    xp: 25,
    category: "Social/Growth",
    description: "Share any Kracked Devs post to your Twitter",
    section: "1B",
    order: 3,
  },
  {
    id: "l2-like-discord",
    title: "Like 3+ Discord messages in #general",
    xp: 10,
    category: "Community",
    description: "Engage with community posts",
    section: "1B",
    order: 4,
  },
  {
    id: "l2-comment-intro",
    title: "Comment on community intro post",
    xp: 20,
    category: "Community",
    description: "Welcome a new member in introductions",
    section: "1B",
    order: 5,
  },
  {
    id: "l2-bonus-article",
    title: 'Read "Why Vibe Coding Matters"',
    xp: 15,
    category: "Education",
    description: "5 min article (optional for reach 100 XP)",
    optional: true,
    section: "1B",
    order: 6,
  },
];

// SECTION 1C: LEVEL 3 - JOIN THE DISCORD MOVEMENT
const level1CTasks: OnboardingTask[] = [
  {
    id: "l3-verify-discord",
    title: "Verify Discord (link email)",
    xp: 10,
    category: "Account Setup",
    description: "Connect Discord to Kracked Devs account",
    section: "1C",
    order: 1,
  },
  {
    id: "l3-accept-roles",
    title: "Accept Discord roles",
    xp: 10,
    category: "Community",
    description: "Select your interests (frontend, backend, AI, learning)",
    section: "1C",
    order: 2,
  },
  {
    id: "l3-read-hiring-guide",
    title: 'Read "How to Get Hired" guide',
    xp: 20,
    category: "Education",
    description: "5-min guide on career pathway",
    section: "1C",
    order: 3,
  },
  {
    id: "l3-ask-question",
    title: "Ask 1 question in #help-desk",
    xp: 15,
    category: "Community",
    description: "Post a genuine question about platform",
    section: "1C",
    order: 4,
  },
  {
    id: "l3-reply-helpfully",
    title: "Reply helpfully to someone's question",
    xp: 25,
    category: "Community/Mentoring",
    description: "Help another member (text/Discord)",
    section: "1C",
    order: 5,
  },
  {
    id: "l3-react-achievements",
    title: "React to 5 community achievements",
    xp: 10,
    category: "Community",
    description: "Celebrate others' wins in #wins channel",
    section: "1C",
    order: 6,
  },
  {
    id: "l3-bonus-video",
    title: 'Watch "Vibe Coding Intro" video',
    xp: 15,
    category: "Education",
    description: "10 min video (optional)",
    optional: true,
    section: "1C",
    order: 7,
  },
];

// SECTION 1D: LEVEL 4 - DEVELOPER SETUP
const level1DTasks: OnboardingTask[] = [
  {
    id: "l4-github-account",
    title: "Create GitHub Account (if new)",
    xp: 30,
    category: "Technical",
    description: "Set up GitHub profile with bio and photo",
    section: "1D",
    order: 1,
  },
  {
    id: "l4-link-github",
    title: "Link GitHub to Kracked Devs",
    xp: 10,
    category: "Account Setup",
    description: "OAuth connection to platform",
    section: "1D",
    order: 2,
  },
  {
    id: "l4-github-profile",
    title: "Complete GitHub profile",
    xp: 15,
    category: "Technical",
    description: "Add photo, bio, link (make professional)",
    section: "1D",
    order: 3,
  },
  {
    id: "l4-first-repo",
    title: "Create first GitHub repo",
    xp: 25,
    category: "Technical",
    description: 'Initialize "kracked-devs-portfolio" repo',
    section: "1D",
    order: 4,
  },
  {
    id: "l4-setup-guide",
    title: 'Watch "Vibe Coding Setup Guide" (15 min)',
    xp: 15,
    category: "Education",
    description: "Tools overview (ChatGPT, Cursor, GitHub)",
    section: "1D",
    order: 5,
  },
  {
    id: "l4-ai-tool",
    title: "Set up AI coding tool",
    xp: 5,
    category: "Technical",
    description: "Download and authenticate Cursor/ChatGPT",
    section: "1D",
    order: 6,
  },
];

// SECTION 1E: LEVEL 5 - READY FOR BOOTCAMP (MILESTONE)
const level1ETasks: OnboardingTask[] = [
  {
    id: "l5-checklist",
    title: "Complete onboarding checklist",
    xp: 25,
    category: "Checkpoint",
    description: "Verify all previous tasks done",
    section: "1E",
    order: 1,
  },
  {
    id: "l5-first-commit",
    title: "Make first commit to GitHub",
    xp: 25,
    category: "Technical",
    description: 'Push "Hello World" or simple code',
    section: "1E",
    order: 2,
  },
  {
    id: "l5-ai-project",
    title: "Build simple project with AI",
    xp: 30,
    category: "Technical/Education",
    description: "Small project (todo list, calculator) with vibe coding",
    section: "1E",
    order: 3,
  },
  {
    id: "l5-document-learning",
    title: "Document your learning",
    xp: 15,
    category: "Education",
    description: 'Write "What I learned so far" reflection',
    section: "1E",
    order: 4,
  },
  {
    id: "l5-schedule-mentor",
    title: "Schedule 1:1 with Kracked Devs staff",
    xp: 5,
    category: "Mentorship",
    description: "Book intro mentoring session",
    section: "1E",
    order: 5,
  },
];

// Combine all Level 1 sections
const level1Tasks: OnboardingTask[] = [
  ...level1ATasks,
  ...level1BTasks,
  ...level1CTasks,
  ...level1DTasks,
  ...level1ETasks,
];

// Level 2: Connect Your Presence (now part of Level 1 Section 1B)
// Level 3: Join the Discord Movement (now part of Level 1 Section 1C)
// Level 4: Developer Setup (now part of Level 1 Section 1D)
// Level 5: Ready for Bootcamp (now part of Level 1 Section 1E)
// These are now combined into Level 1 with sections 1A-1E

// Level 2-5: Placeholder levels (content moved to Level 1 sections)
const level2Tasks: OnboardingTask[] = [
  {
    id: "l2-placeholder",
    title: "Onboarding Complete!",
    xp: 0,
    category: "Info",
    description: "You've completed Level 1 onboarding. Level 2+ content coming soon.",
  },
];

const level3Tasks: OnboardingTask[] = [
  {
    id: "l3-placeholder",
    title: "Onboarding Complete!",
    xp: 0,
    category: "Info",
    description: "You've completed Level 1 onboarding. Level 3+ content coming soon.",
  },
];

const level4Tasks: OnboardingTask[] = [
  {
    id: "l4-placeholder",
    title: "Onboarding Complete!",
    xp: 0,
    category: "Info",
    description: "You've completed Level 1 onboarding. Level 4+ content coming soon.",
  },
];

const level5Tasks: OnboardingTask[] = [
  {
    id: "l5-placeholder",
    title: "Onboarding Complete!",
    xp: 0,
    category: "Info",
    description: "You've completed Level 1 onboarding. Level 5+ content coming soon.",
  },
];

// Levels 6-10: Placeholders for future expansion
const level6Tasks: OnboardingTask[] = [
  {
    id: "l6-placeholder",
    title: "Level 6 - Coming Soon",
    xp: 0,
    category: "Placeholder",
    description: "Level 6 tasks will be added here",
  },
];

const level7Tasks: OnboardingTask[] = [
  {
    id: "l7-placeholder",
    title: "Level 7 - Coming Soon",
    xp: 0,
    category: "Placeholder",
    description: "Level 7 tasks will be added here",
  },
];

const level8Tasks: OnboardingTask[] = [
  {
    id: "l8-placeholder",
    title: "Level 8 - Coming Soon",
    xp: 0,
    category: "Placeholder",
    description: "Level 8 tasks will be added here",
  },
];

const level9Tasks: OnboardingTask[] = [
  {
    id: "l9-placeholder",
    title: "Level 9 - Coming Soon",
    xp: 0,
    category: "Placeholder",
    description: "Level 9 tasks will be added here",
  },
];

const level10Tasks: OnboardingTask[] = [
  {
    id: "l10-placeholder",
    title: "Level 10 - Coming Soon",
    xp: 0,
    category: "Placeholder",
    description: "Level 10 tasks will be added here",
  },
];

// Helper function to calculate total XP for a level
function calculateTotalXP(tasks: OnboardingTask[]): number {
  return tasks.reduce((sum, task) => sum + task.xp, 0);
}

// Level definitions
export const onboardingLevels: OnboardingLevel[] = [
  {
    id: 1,
    title: "Welcome to Kracked Devs",
    description: "Introduction to Kracked Devs & Developer Foundation - Complete all sections 1A through 1E",
    tasks: level1Tasks,
    totalXP: calculateTotalXP(level1Tasks),
    reward: "🎉 MAJOR MILESTONE - First Loot Chest + Level 5 Legend badge + CODE zone unlock",
  },
  {
    id: 2,
    title: "Connect Your Presence",
    description: "Follow socials and engage with the community",
    tasks: level2Tasks,
    totalXP: calculateTotalXP(level2Tasks),
    reward: "Social Butterfly badge + Hat cosmetic",
  },
  {
    id: 3,
    title: "Join the Discord Movement",
    description: "Get involved in the community",
    tasks: level3Tasks,
    totalXP: calculateTotalXP(level3Tasks),
    reward: "Community Member badge + Shoes cosmetic",
  },
  {
    id: 4,
    title: "Developer Setup",
    description: "Set up your development environment",
    tasks: level4Tasks,
    totalXP: calculateTotalXP(level4Tasks),
    reward: "Dev Setup Complete badge + Hair style unlock",
  },
  {
    id: 5,
    title: "Ready for Bootcamp",
    description: "Complete onboarding and unlock CODE zone",
    tasks: level5Tasks,
    totalXP: calculateTotalXP(level5Tasks),
    reward: "🎉 MAJOR MILESTONE - First Loot Chest + Level 5 Legend badge + CODE zone unlock",
  },
  {
    id: 6,
    title: "Level 6 - Beginner Bootcamp",
    description: "Learning Vibe Coding & Building First Portfolio",
    tasks: level6Tasks,
    totalXP: calculateTotalXP(level6Tasks),
  },
  {
    id: 7,
    title: "Level 7 - Beginner Bootcamp",
    description: "Learning Vibe Coding & Building First Portfolio",
    tasks: level7Tasks,
    totalXP: calculateTotalXP(level7Tasks),
  },
  {
    id: 8,
    title: "Level 8 - Beginner Bootcamp",
    description: "Learning Vibe Coding & Building First Portfolio",
    tasks: level8Tasks,
    totalXP: calculateTotalXP(level8Tasks),
  },
  {
    id: 9,
    title: "Level 9 - Beginner Bootcamp",
    description: "Learning Vibe Coding & Building First Portfolio",
    tasks: level9Tasks,
    totalXP: calculateTotalXP(level9Tasks),
  },
  {
    id: 10,
    title: "Level 10 - Beginner Bootcamp",
    description: "Learning Vibe Coding & Building First Portfolio",
    tasks: level10Tasks,
    totalXP: calculateTotalXP(level10Tasks),
  },
];

// Helper functions
export function getLevelById(id: number): OnboardingLevel | undefined {
  return onboardingLevels.find((level) => level.id === id);
}

export function getNextLevel(currentLevelId: number): OnboardingLevel | undefined {
  return onboardingLevels.find((level) => level.id === currentLevelId + 1);
}

export function getTotalXPForLevel(levelId: number): number {
  const level = getLevelById(levelId);
  return level ? level.totalXP : 0;
}

export function getAllTasksTotalXP(): number {
  return onboardingLevels.reduce((sum, level) => sum + level.totalXP, 0);
}

// Section helper functions for Level 1 (1A-1E)
export function getSectionLabel(section: string): string {
  const sectionLabels: Record<string, string> = {
    "1A": "SECTION 1A: LEVEL 1 - WELCOME TO KRACKED DEVS",
    "1B": "SECTION 1B: LEVEL 2 - CONNECT YOUR PRESENCE",
    "1C": "SECTION 1C: LEVEL 3 - JOIN THE DISCORD MOVEMENT",
    "1D": "SECTION 1D: LEVEL 4 - DEVELOPER SETUP",
    "1E": "SECTION 1E: LEVEL 5 - READY FOR BOOTCAMP (MILESTONE)",
  };
  return sectionLabels[section] || `Section ${section}`;
}

export function getSectionDescription(section: string): string {
  const sectionDescriptions: Record<string, string> = {
    "1A": "Introduction to Kracked Devs & Developer Foundation - Account setup and community introduction",
    "1B": "Follow socials and engage with the community - Build your online presence",
    "1C": "Get involved in the Discord community - Verify, engage, and help others",
    "1D": "Set up your development environment - GitHub, tools, and professional setup",
    "1E": "Complete onboarding and unlock CODE zone - Final milestone before bootcamp",
  };
  return sectionDescriptions[section] || "";
}

export function getTasksBySection(tasks: OnboardingTask[], section: string): OnboardingTask[] {
  return tasks.filter((task) => task.section === section).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getSectionCompletion(
  tasks: OnboardingTask[],
  section: string,
  completedTaskIds: Set<string>
): { completed: number; total: number; status: "Not Started" | "In Progress" | "Complete" } {
  const sectionTasks = getTasksBySection(tasks, section);
  const requiredTasks = sectionTasks.filter((t) => !t.optional);
  const completed = sectionTasks.filter((t) => completedTaskIds.has(t.id)).length;
  const completedRequired = requiredTasks.filter((t) => completedTaskIds.has(t.id)).length;
  const total = requiredTasks.length;

  let status: "Not Started" | "In Progress" | "Complete";
  if (completedRequired === 0) {
    status = "Not Started";
  } else if (completedRequired >= total) {
    status = "Complete";
  } else {
    status = "In Progress";
  }

  return { completed: completedRequired, total, status };
}

export function getAllSections(levelId: number): string[] {
  if (levelId === 1) {
    return ["1A", "1B", "1C", "1D", "1E"];
  }
  return [];
}

export function getCurrentFocusSection(
  tasks: OnboardingTask[],
  completedTaskIds: Set<string>
): string | null {
  const sections = ["1A", "1B", "1C", "1D", "1E"];
  for (const section of sections) {
    const completion = getSectionCompletion(tasks, section, completedTaskIds);
    if (completion.status !== "Complete") {
      return section;
    }
  }
  return null; // All sections complete
}

