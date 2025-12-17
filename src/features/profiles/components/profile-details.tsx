"use client";

import { ProfileData } from "../actions";
import { GithubStats } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Terminal, Code2, User } from "lucide-react";
import { GithubGraph } from "./github-graph";
import { TopLanguages } from "./top-languages";

interface ProfileDetailsProps {
    profile: ProfileData;
    githubStats?: GithubStats;
    onEdit: () => void;
}

export function ProfileDetails({ profile, githubStats, onEdit }: ProfileDetailsProps) {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-mono tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {profile.username || "Anonymous Netrunner"}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span className="font-mono text-sm uppercase tracking-widest">
                            {profile.role || "Unclassified"}
                        </span>
                    </div>
                </div>
                <Button
                    onClick={onEdit}
                    variant="cyberpunk"
                    className="w-full md:w-auto min-w-[120px]"
                >
                    Edit Profile
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-neon-primary font-mono text-sm uppercase tracking-widest">
                                <Terminal className="w-4 h-4" />
                                Bio / Lore
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                                {profile.bio || "No lore data available for this user."}
                            </p>
                        </CardContent>
                    </Card>

                    {githubStats && (
                        <GithubGraph
                            data={githubStats.contributionCalendar}
                            totalContributions={githubStats.totalContributions}
                        />
                    )}
                </div>

                {/* Stats / Attributes Column */}
                <div className="space-y-6">
                    {/* Location */}
                    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-neon-secondary font-mono text-sm uppercase tracking-widest">
                                <MapPin className="w-4 h-4" />
                                Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-300 font-mono text-sm">
                                {profile.location || "Unknown Location"}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Tech Stack */}
                    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-neon-cyan font-mono text-sm uppercase tracking-widest">
                                <Code2 className="w-4 h-4" />
                                Tech Arsenal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {profile.stack && profile.stack.length > 0 ? (
                                    profile.stack.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="border-white/20 text-zinc-300 font-mono text-xs hover:border-neon-cyan hover:text-neon-cyan transition-colors"
                                        >
                                            {tech}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground text-xs font-mono">No tech stack declared</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {githubStats && (
                        <TopLanguages languages={githubStats.topLanguages} />
                    )}
                </div>
            </div>
        </div>
    );
}
