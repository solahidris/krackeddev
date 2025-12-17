"use client";

import React from "react";
import { GithubContributionWeek } from "../types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface GithubGraphProps {
    data: GithubContributionWeek[];
    totalContributions: number;
}

export function GithubGraph({ data, totalContributions }: GithubGraphProps) {
    if (!data || data.length === 0) return null;

    // We only show the last 20 weeks to fit nicely
    const recentWeeks = data.slice(-20);

    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2 text-neon-primary font-mono text-sm uppercase tracking-widest">
                    <Activity className="w-4 h-4" />
                    Contribution Matrix
                </CardTitle>
                <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-neon-primary font-bold">{totalContributions}</span> Cycles
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-1 justify-end overflow-hidden">
                    {recentWeeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-1">
                            {week.contributionDays.map((day, dIndex) => {
                                // Calculate intensity based on contribution count (mock logic since color comes from GitHub but handled here for theme consistency if needed)
                                // We trust GitHub's color usually, but for Cyberpunk we might want to override or use opacity
                                // For now, let's use a green scale based on count if color is generic

                                const hasContribution = day.contributionCount > 0;

                                return (
                                    <div
                                        key={`${wIndex}-${dIndex}`}
                                        className={cn(
                                            "w-3 h-3 rounded-[1px] transition-all duration-500 hover:scale-125",
                                            hasContribution ? "bg-neon-primary shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "bg-white/5"
                                        )}
                                        style={{
                                            opacity: hasContribution ? Math.min(0.2 + (day.contributionCount * 0.15), 1) : 1
                                        }}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
