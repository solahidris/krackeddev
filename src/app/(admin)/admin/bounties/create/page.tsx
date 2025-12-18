'use client';

import { useRouter } from 'next/navigation';
import { BountyForm } from '@/features/admin-dashboard';
import { createBounty } from '@/features/admin-dashboard/actions';
import { toast } from 'sonner';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function CreateBountyPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        const result = await createBounty(data);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Bounty created successfully');
            router.push('/admin/bounties');
        }
    };

    return (
        <div className="space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/bounties">Bounties</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Create Bounty</h3>
            </div>

            <div className="rounded-lg border p-6 bg-card text-card-foreground shadow-sm">
                <BountyForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
