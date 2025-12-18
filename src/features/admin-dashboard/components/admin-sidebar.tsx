import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Target, Users } from 'lucide-react';

interface SidebarContentProps {
    className?: string;
    onLinkClick?: () => void;
}

export function AdminSidebarContent({ className, onLinkClick }: SidebarContentProps) {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="font-bold mb-6 px-4 text-xl tracking-tight">Admin Panel</div>
            <nav className="space-y-1">
                <Link
                    href="/admin/dashboard"
                    onClick={onLinkClick}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>
                <Link
                    href="/admin/bounties"
                    onClick={onLinkClick}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                    <Target className="w-4 h-4" />
                    Bounties
                </Link>
                <Link
                    href="/admin/users"
                    onClick={onLinkClick}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                    <Users className="w-4 h-4" />
                    Users
                </Link>
            </nav>
        </div>
    );
}

export function AdminSidebar() {
    return (
        <aside className="hidden md:block w-64 min-h-screen border-r bg-background p-4 relative z-10">
            <AdminSidebarContent />
        </aside>
    );
}
