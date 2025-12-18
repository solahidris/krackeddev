import { fetchUsers } from '@/features/admin-dashboard/actions';
import { UserTable } from '@/features/admin-dashboard/components/user-table';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'User Management | Admin | KrackedDevs',
};

export default async function UsersPage() {
    const { data: users, error } = await fetchUsers();

    if (error) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error || 'Failed to load users. Please check your connection and try again.'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white">
                    User Management
                </h1>
                <p className="text-gray-400">
                    View and manage user accounts. Banning a user will revoke their access immediately.
                </p>
            </div>

            <UserTable users={users || []} />
        </div>
    );
}
