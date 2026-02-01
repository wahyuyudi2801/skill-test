import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Interface untuk mencocokkan struktur Pagination Laravel
interface Post {
    id: number;
    title: string;
    content: string; // Pastikan content ikut di select pada backend jika ingin ditampilkan
    published_at: string;
    user: { name: string };
}

interface PaginationProps {
    data: Post[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface Props extends SharedData {
    posts: PaginationProps; // Data sekarang berbentuk objek pagination
}

export default function Welcome({ posts }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Latest Posts" />

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-12 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-12 w-full max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <div className="text-xl font-bold tracking-tight">MyBlog</div>
                        <div className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="rounded-sm border border-[#19140035] px-5 py-1.5 hover:bg-black/5 dark:border-[#3E3E3A]">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-5 py-1.5">Log in</Link>
                                    <Link href={route('register')} className="rounded-sm border border-[#19140035] px-5 py-1.5 dark:border-[#3E3E3A]">Register</Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-4xl">
                    <h1 className="text-4xl font-semibold mb-10">Latest Posts</h1>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Perhatikan akses ke posts.data */}
                        {posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <div key={post.id} className="flex flex-col justify-between rounded-xl border border-[#19140015] bg-white p-6 shadow-sm dark:border-[#3E3E3A] dark:bg-[#111111]">
                                    <div>
                                        <div className="mb-4 text-xs text-gray-400">
                                            {new Date(post.published_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'long', year: 'numeric'
                                            })}
                                        </div>
                                        <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <span className="text-xs text-gray-500 text-italic">By {post.user.name}</span>
                                        <Link href={`/welcome/${post.id}`} className="text-sm font-semibold text-blue-600">Read →</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No posts available.</p>
                        )}
                    </div>

                    {/* Pagination Links */}
                    <div className="mt-12 flex flex-wrap justify-center gap-1">
                        {posts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 text-sm rounded-md border ${
                                    link.active
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-[#111] dark:border-[#3E3E3A] dark:text-gray-300'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
