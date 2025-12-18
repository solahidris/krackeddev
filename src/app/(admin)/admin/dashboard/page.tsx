export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight mb-4">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="text-sm font-medium text-muted-foreground">Admin Status</div>
                    <div className="text-2xl font-bold mt-2">Active</div>
                </div>
            </div>
        </div>
    );
}
