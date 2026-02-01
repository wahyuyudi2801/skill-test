import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Posts', href: '/posts' },
    { title: 'Create', href: '/posts/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        is_draft: true,
        published_at: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />

            <div className="w-full mx-auto p-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">

                    <h1 className="text-xl font-semibold mb-6">
                        Create New Post
                    </h1>

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
                                className="w-full rounded-md border px-3 py-2 text-sm"
                                placeholder="Post title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
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
                                className="w-full rounded-md border px-3 py-2 text-sm"
                                placeholder="Write your post..."
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        {/* Draft Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_draft}
                                onChange={e =>
                                    setData('is_draft', e.target.checked)
                                }
                            />
                            <label className="text-sm">
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
                                    onChange={e =>
                                        setData('published_at', e.target.value)
                                    }
                                    className="rounded-md border px-3 py-2 text-sm"
                                />
                                {errors.published_at && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.published_at}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Link
                                href="/posts"
                                className="px-4 py-2 border rounded-md text-sm"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                            >
                                {processing ? 'Saving...' : 'Save Post'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </AppLayout>
    );
}
