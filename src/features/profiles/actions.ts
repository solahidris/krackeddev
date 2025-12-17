"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ProfileData = {
    id: string;
    role: string;
    developer_role: string | null;
    stack: string[];
    bio: string | null;
    location: string | null;
    username: string | null;
};

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function updateProfile(data: Partial<ProfileData>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const { error } = await (supabase.from("profiles") as any)
        .update({
            developer_role: data.role as any, // Cast to any or import DeveloperRole type if needed, or simply string if DB accepts it. DB type is DeveloperRole enum.
            stack: data.stack,
            bio: data.bio,
            location: data.location,
            username: data.username,
            updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/profile/view");
    revalidatePath("/profile");
    return { success: true };
}
import { GithubStats, GithubLanguage } from "./types";

export async function fetchGithubStats(): Promise<{ data?: GithubStats; error?: string }> {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.provider_token) {
        return { error: "No GitHub token found. Please sign in with GitHub." };
    }

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.provider_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query {
                        viewer {
                            login
                            avatarUrl
                            contributionsCollection {
                                contributionCalendar {
                                    totalContributions
                                    weeks {
                                        contributionDays {
                                            contributionCount
                                            date
                                            color
                                        }
                                    }
                                }
                            }
                            repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
                                nodes {
                                    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                                        edges {
                                            size
                                            node {
                                                name
                                                color
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
            }),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        const json = await response.json();

        if (json.errors) {
            console.error("GitHub API Errors:", json.errors);
            return { error: "Failed to fetch GitHub stats" };
        }

        const data = json.data.viewer;

        // Process Languages
        const languageMap = new Map<string, { size: number; color: string }>();
        let totalSize = 0;

        data.repositories.nodes.forEach((repo: any) => {
            repo.languages.edges.forEach((edge: any) => {
                const { size, node } = edge;
                const { name, color } = node;

                if (languageMap.has(name)) {
                    const current = languageMap.get(name)!;
                    languageMap.set(name, { ...current, size: current.size + size });
                } else {
                    languageMap.set(name, { size, color });
                }
                totalSize += size;
            });
        });

        const topLanguages: GithubLanguage[] = Array.from(languageMap.entries())
            .map(([name, { size, color }]) => ({
                name,
                color,
                percentage: size / totalSize,
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5); // Top 5

        return {
            data: {
                username: data.login,
                avatarUrl: data.avatarUrl,
                totalContributions: data.contributionsCollection.contributionCalendar.totalContributions,
                contributionCalendar: data.contributionsCollection.contributionCalendar.weeks,
                topLanguages,
            },
        };

    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { error: "Failed to connect to GitHub" };
    }
}
