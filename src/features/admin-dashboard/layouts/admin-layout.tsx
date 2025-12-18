import { ReactNode } from 'react';
import { AdminSidebar } from '../components/admin-sidebar';

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex h-screen bg-background text-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <AdminSidebar />
            <main className="flex-1 overflow-auto p-8 relative z-10">
                {children}
            </main>
        </div>
    );
}
