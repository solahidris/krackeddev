import Link from 'next/link';

export function AdminSidebar() {
    return (
        <aside className="w-64 min-h-screen border-r bg-background p-4">
            <div className="font-bold mb-6 px-4">Admin Panel</div>
            <nav className="space-y-2">
                <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                    Dashboard
                </Link>
            </nav>
        </aside>
    );
}
