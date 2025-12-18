'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ActionResult, BountyInputData, AnalyticsData } from './types';
import { BountySchema } from './schemas';
import { UserRole, Profile } from '@/types/database';

// Helper to check admin role
async function checkAdmin(): Promise<ActionResult<boolean>> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: 'Not authenticated' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!profile || (profile as { role: UserRole }).role !== 'admin') {
        return { data: null, error: 'Unauthorized: Admin access required' };
    }

    return { data: true, error: null };
}

export async function createBounty(data: BountyInputData): Promise<ActionResult<any>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const validation = BountySchema.safeParse(data);
    if (!validation.success) {
        return { data: null, error: validation.error.issues[0].message };
    }

    const supabase = await createClient();
    const { data: bounty, error } = await (supabase
        .from('bounties') as any)
        .insert({
            title: data.title,
            slug: data.slug,
            description: data.description,
            long_description: data.long_description,
            reward_amount: data.reward_amount,
            status: data.status,
            type: data.type,
            company_name: data.company_name,
            skills: data.skills,
            difficulty: data.difficulty,
            deadline: data.deadline || null,
            requirements: data.requirements,
            repository_url: data.repository_url,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating bounty:', error);
        return { data: null, error: 'Failed to create bounty' };
    }

    revalidatePath('/admin/bounties');
    return { data: bounty, error: null };
}

export async function updateBounty(id: string, data: BountyInputData): Promise<ActionResult<any>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const validation = BountySchema.safeParse(data);
    if (!validation.success) {
        return { data: null, error: validation.error.issues[0].message };
    }

    const supabase = await createClient();
    const { data: bounty, error } = await (supabase
        .from('bounties') as any)
        .update({
            title: data.title,
            slug: data.slug,
            description: data.description,
            long_description: data.long_description,
            reward_amount: data.reward_amount,
            status: data.status,
            type: data.type,
            company_name: data.company_name,
            skills: data.skills,
            updated_at: new Date().toISOString(),
            difficulty: data.difficulty,
            deadline: data.deadline || null,
            requirements: data.requirements,
            repository_url: data.repository_url,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating bounty:', error);
        return { data: null, error: 'Failed to update bounty' };
    }

    revalidatePath('/admin/bounties');
    return { data: bounty, error: null };
}

export async function deleteBounty(id: string): Promise<ActionResult<boolean>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const supabase = await createClient();
    const { error } = await supabase
        .from('bounties')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting bounty:', error);
        return { data: null, error: 'Failed to delete bounty' };
    }

    revalidatePath('/admin/bounties');
    return { data: true, error: null };
}

// User Management Actions

export async function fetchUsers(): Promise<ActionResult<Profile[]>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const supabase = await createClient();
    const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50); // Pagination cap for safety

    if (error) {
        console.error('Error fetching users:', error);
        return { data: null, error: 'Failed to fetch users' };
    }

    return { data: users as Profile[], error: null };
}

export async function toggleUserBan(userId: string, currentStatus: 'active' | 'banned'): Promise<ActionResult<boolean>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    const supabase = await createClient();

    const { error } = await (supabase
        .from('profiles') as any)
        .update({ status: newStatus })
        .eq('id', userId);

    if (error) {
        console.error('Error toggling ban:', error);
        return { data: null, error: `Failed to ${newStatus === 'banned' ? 'ban' : 'unban'} user` };
    }

    revalidatePath('/admin/users');
    return { data: true, error: null };
}

export async function getAnalyticsData(): Promise<ActionResult<AnalyticsData>> {
    const authCheck = await checkAdmin();
    if (authCheck.error) return { data: null, error: authCheck.error };

    const supabase = await createClient();
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('location, stack, developer_role, created_at');

    if (error) {
        console.error('Error fetching analytics data:', error);
        return { data: null, error: 'Failed to fetch analytics data' };
    }

    // Process Data
    const locationMap = new Map<string, number>();
    const stackMap = new Map<string, number>();
    const roleMap = new Map<string, number>();
    const growthMap = new Map<string, number>();

    profiles.forEach((profile: any) => {
        // Location
        if (profile.location) {
            const loc = profile.location.trim(); // Simplified state matching
            locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
        }

        // Stack
        if (profile.stack && Array.isArray(profile.stack)) {
            profile.stack.forEach((tech: string) => {
                stackMap.set(tech, (stackMap.get(tech) || 0) + 1);
            });
        }

        // Role
        if (profile.developer_role) {
            roleMap.set(profile.developer_role, (roleMap.get(profile.developer_role) || 0) + 1);
        }

        // Growth (Monthly)
        if (profile.created_at) {
            const date = new Date(profile.created_at);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            growthMap.set(key, (growthMap.get(key) || 0) + 1);
        }
    });

    // Format for Recharts
    const locationDistribution = Array.from(locationMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const stackDistribution = Array.from(stackMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Top 10

    const roleDistribution = Array.from(roleMap.entries())
        .map(([name, value]) => ({ name, value }));

    // Accumulate growth
    const sortedDates = Array.from(growthMap.keys()).sort();
    let cumulative = 0;
    const userGrowth = sortedDates.map(date => {
        cumulative += growthMap.get(date)!;
        return { date, count: cumulative };
    });

    return {
        data: {
            totalUsers: profiles.length,
            locationDistribution,
            stackDistribution,
            roleDistribution,
            userGrowth
        },
        error: null
    };
}
