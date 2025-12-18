'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { BountyForm } from '@/features/admin-dashboard';
import { updateBounty } from '@/features/admin-dashboard/actions';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Loader2 } from 'lucide-react';

export default function EditBountyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [bounty, setBounty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBounty = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('bounties')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                toast.error('Failed to load bounty');
                router.push('/admin/bounties');
                return;
            }

            setBounty(data);
            setLoading(false);
        };

        if (id) {
            fetchBounty();
        }
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        const result = await updateBounty(id, data);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Bounty updated successfully');
            router.push('/admin/bounties');
        }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/bounties">Bounties</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Edit Bounty</h3>
            </div>

            <div className="rounded-lg border p-6 bg-card text-card-foreground shadow-sm">
                <BountyForm initialData={bounty} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
