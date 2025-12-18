import { getAnalyticsData } from '@/features/admin-dashboard/actions';
import { AnalyticsMap } from '@/features/admin-dashboard/components/analytics/analytics-map';
import { TechStackChart } from '@/features/admin-dashboard/components/analytics/tech-stack-chart';
import { RoleDistributionChart } from '@/features/admin-dashboard/components/analytics/role-distribution-chart';
import { UserGrowthChart } from '@/features/admin-dashboard/components/analytics/user-growth-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Code, Crown } from 'lucide-react';

export default async function AdminDashboardPage() {
    const { data, error } = await getAnalyticsData();

    if (error || !data) {
        return (
            <div className="p-8 text-center text-destructive">
                Failed to load analytics data: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            {/* Metrics Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Registered developers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Skill</CardTitle>
                        <Code className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.stackDistribution[0]?.name || '-'}</div>
                        <p className="text-xs text-muted-foreground">Most popular tech</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Role</CardTitle>
                        <Crown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">{data.roleDistribution.sort((a, b) => b.value - a.value)[0]?.name || '-'}</div>
                        <p className="text-xs text-muted-foreground">Highest distribution</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* User Map - Wide */}
                <div className="col-span-4">
                    <AnalyticsMap data={data.locationDistribution} />
                </div>

                {/* Role Distribution - Side */}
                <div className="col-span-3">
                    <RoleDistributionChart data={data.roleDistribution} />
                </div>

                {/* Growth - Wide */}
                <div className="col-span-4">
                    <UserGrowthChart data={data.userGrowth} />
                </div>

                {/* Tech Stack - Side */}
                <div className="col-span-3">
                    <TechStackChart data={data.stackDistribution} />
                </div>
            </div>
        </div>
    );
}
