import { createClient } from '@/lib/supabase/server';
import { BountyTable } from '@/features/admin-dashboard';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function AdminBountiesPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const { data: bounties, error } = await supabase
        .from('bounties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bounties:', error);
        return <div>Error loading bounties</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Bounties</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage bounty listings.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/bounties/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Bounty
                    </Link>
                </Button>
            </div>
            <BountyTable bounties={bounties || []} />
        </div>
    );
}
