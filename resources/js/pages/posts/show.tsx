import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/formatted-date';
import { type BreadcrumbItem, type SharedData } from '@/types'; // Import SharedData
import { Head, Link, usePage } from '@inertiajs/react'; // Tambah usePage

// ... (Type PostType tetap sama)

export default function Show({ post }: { post: PostType }) {
    // Ambil data auth dari SharedData Inertia
    const { auth } = usePage<SharedData>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: '/posts' },
        { title: 'View Detail', href: `/posts/${post.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.title} />

            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-xl border bg-white p-6 dark:bg-gray-900 lg:p-10">

                    <div className="mb-8 border-b pb-6 dark:border-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <Link href="/posts" className="text-sm text-gray-500 hover:text-blue-600">
                                ← Back to List
                            </Link>

                            {auth.user && post.user_id === auth.user.id && (
                                <div className="flex gap-2">
                                    <Link
                                        href={`/posts/${post.id}/edit`}
                                        className="rounded-md bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-500"
                                    >
                                        Edit Post
                                    </Link>
                                </div>
                            )}
                        </div>

                        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Author: <strong>{post.user.name}</strong></span>
                            <span>•</span>
                            <span>{formatDate(post.published_at)}</span>
                        </div>
                    </div>

                    <article className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-lg text-gray-800 dark:text-gray-300">
                            {post.content}
                        </div>
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}
