import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

// Definisikan interface untuk Post agar TypeScript lebih akurat
interface Post {
    id: number;
    title: string;
    content: string;
    is_draft: boolean;
    published_at: string | null;
}

interface Props {
    post: Post;
}

export default function Edit({ post: postData }: Props) {
    // Breadcrumbs dinamis untuk menunjukkan kita sedang mengedit
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: '/posts' },
        { title: 'Edit Post', href: `/posts/${postData.id}/edit` },
    ];

    // Inisialisasi useForm dengan data yang sudah ada
    const { data, setData, patch, processing, errors } = useForm({
        title: postData.title || '',
        content: postData.content || '',
        is_draft: Boolean(postData.is_draft),
        published_at: postData.published_at || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Menggunakan patch untuk update data
        patch(`/posts/${postData.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit - ${data.title}`} />

            <div className="w-full mx-auto p-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-semibold">
                            Edit Post
                        </h1>
                        <span className="text-xs text-gray-500">ID: {postData.id}</span>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent dark:border-gray-700"
                                placeholder="Post title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Content
                            </label>
                            <textarea
                                rows={6}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent dark:border-gray-700"
                                placeholder="Write your post..."
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>

                        {/* Draft Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                id="is_draft"
                                type="checkbox"
                                checked={data.is_draft}
                                onChange={e => setData('is_draft', e.target.checked)}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="is_draft" className="text-sm select-none">
                                Save as draft
                            </label>
                        </div>

                        {/* Published At (only if not draft) */}
                        {!data.is_draft && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Published At
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={e => setData('published_at', e.target.value)}
                                    className="rounded-md border px-3 py-2 text-sm bg-transparent dark:border-gray-700"
                                />
                                {errors.published_at && (
                                    <p className="text-red-500 text-sm mt-1">{errors.published_at}</p>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-800">
                            <Link
                                href="/posts"
                                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Updating...' : 'Update Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
