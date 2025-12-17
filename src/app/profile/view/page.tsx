import { getProfile, fetchGithubStats } from "@/features/profiles/actions";
import { ProfilePageClient } from "@/features/profiles/components/profile-page-client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfileViewPage() {
    const { data: profile, error } = await getProfile();
    const { data: githubStats } = await fetchGithubStats();

    if (error === "Not authenticated") {
        redirect("/");
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-destructive">Profile Not Found</h1>
                    <p className="text-muted-foreground">
                        Could not retrieve your profile data. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-secondary/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 w-full">
                <ProfilePageClient initialData={profile} githubStats={githubStats} />
            </div>
        </div>
    );
}
