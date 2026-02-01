import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Stats {
    total_posts: number;
    total_users: number;
    published_posts: number;
}

interface Props {
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Statistik Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                    {/* Card Total Users */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white p-6 dark:bg-[#111]">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-muted-foreground">Total Users</span>
                            <span className="text-3xl font-bold tracking-tight">{stats.total_users}</span>
                        </div>
                        <div className="mt-4 text-xs text-green-600 font-medium">
                            Active Members
                        </div>
                    </div>

                    {/* Card Total Posts */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white p-6 dark:bg-[#111]">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-muted-foreground">Total Posts</span>
                            <span className="text-3xl font-bold tracking-tight">{stats.total_posts}</span>
                        </div>
                        <div className="mt-4 text-xs text-blue-600 font-medium">
                            All drafts & published
                        </div>
                    </div>

                    {/* Card Published Posts */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white p-6 dark:bg-[#111]">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-muted-foreground">Published</span>
                            <span className="text-3xl font-bold tracking-tight">{stats.published_posts}</span>
                        </div>
                        <div className="mt-4 text-xs text-amber-600 font-medium">
                            Live on website
                        </div>
                    </div>

                </div>

                {/* Main Content Area (e.g., Recent Activity) */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-6 bg-white dark:bg-[#111]">
                    <h2 className="text-lg font-semibold mb-4">Welcome back!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Ini adalah area dashboard utama Anda. Anda bisa memantau pertumbuhan konten dan interaksi pengguna di sini.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
