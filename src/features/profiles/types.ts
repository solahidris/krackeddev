export interface GithubContributionDay {
    color: string;
    contributionCount: number;
    date: string;
}

export interface GithubContributionWeek {
    contributionDays: GithubContributionDay[];
}

export interface GithubLanguage {
    name: string;
    color: string;
    percentage: number;
}

export interface GithubStats {
    totalContributions: number;
    contributionCalendar: GithubContributionWeek[];
    topLanguages: GithubLanguage[];
    username: string; // GitHub username
    avatarUrl: string;
}
