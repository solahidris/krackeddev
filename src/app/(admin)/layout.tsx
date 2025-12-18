import { AdminLayout } from '@/features/admin-dashboard';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}
