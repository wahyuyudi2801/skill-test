import { Head, Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    content: string;
    published_at: string;
    user: { name: string };
}

interface Props {
    post: Post;
}

export default function WelcomeShow({ post }: Props) {
    return (
        <>
            <Head title={post.title} />

            <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] pb-20">
                {/* Simple Header */}
                <nav className="border-b border-gray-100 dark:border-[#1e1e1e] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="text-sm font-medium flex items-center gap-2 hover:text-blue-600 transition-colors">
                            ← Back to Feed
                        </Link>
                        <div className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                            Post Detail
                        </div>
                    </div>
                </nav>

                <article className="max-w-3xl mx-auto px-6 pt-16 lg:pt-24">
                    {/* Meta Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
                            <span className="font-medium text-[#1b1b18] dark:text-white">{post.user.name}</span>
                            <span>•</span>
                            <span>
                                {new Date(post.published_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                    </header>

                    {/* Content Section */}
                    <section className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Menggunakan whitespace-pre-wrap agar line break dari textarea terjaga */}
                        <div className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                            {post.content}
                        </div>
                    </section>

                    <hr className="my-16 border-gray-100 dark:border-[#1e1e1e]" />

                    {/* Footer Post */}
                    <footer className="bg-gray-50 dark:bg-[#111] rounded-2xl p-8 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Written by</p>
                            <p className="font-semibold text-lg">{post.user.name}</p>
                        </div>
                        <Link
                            href="/"
                            className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                        >
                            Follow Author
                        </Link>
                    </footer>
                </article>
            </div>
        </>
    );
}
