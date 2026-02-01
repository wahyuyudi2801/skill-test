import { LinkType, Pagination } from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/formatted-date';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'My Posts', href: '/my-posts' }];

type PostType = {
    id: number;
    user_id: number;
    title: string;
    is_draft: boolean;
    published_at: string;
};

type PostDataPagination = {
    current_page: number;
    data: PostType[];
    from: number;
    to: number;
    total: number;
    links: LinkType[];
};

export default function Index({ posts }: { posts: PostDataPagination }) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus post ini?')) {
            router.delete(`/posts/${id}`);
        }
    };

    const getStatusBadge = (post: any) => {
        // Jika post.is_draft true (bernilai 1 atau true), langsung Draft
        if (post.is_draft) {
            return { label: 'Draft', class: 'bg-gray-500' };
        }

        // Jika tidak ada tanggal publikasi, anggap Draft atau error handling
        if (!post.published_at) {
            return { label: 'Draft', class: 'bg-gray-500' };
        }

        const publishDate = new Date(post.published_at).getTime();
        const now = new Date().getTime();

        // Membandingkan tahun, bulan, hari, jam, hingga menit
        if (publishDate > now) {
            return { label: 'Scheduled', class: 'bg-amber-500' };
        }

        return { label: 'Published', class: 'bg-green-600' };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Posts" />

            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-xl border bg-white p-4 dark:bg-gray-900">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Posts List</h1>
                        <Link href="/posts/create" className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            + Create Post
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left dark:bg-gray-800">
                                    <th className="p-3 text-sm">No</th>
                                    <th className="p-3 text-sm">Title</th>
                                    <th className="p-3 text-sm">Published</th>
                                    <th className="p-3 text-sm">Is Draft</th>
                                    <th className="p-3 text-center text-sm">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts.data.length ? (
                                    posts.data.map((post, index) => (
                                        <tr key={post.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="p-3">{(posts.current_page - 1) * 10 + index + 1}</td>
                                            <td className="p-3 font-medium">{post.title}</td>
                                            <td className="p-3 text-sm">{formatDate(post.published_at)}</td>
                                            <td className="p-3 text-sm">
                                                <div className={`rounded ${getStatusBadge(post).class} px-3 py-1 text-center text-sm text-white`}>
                                                    {getStatusBadge(post).label}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/posts/${post.id}`}
                                                        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={`/posts/${post.id}/edit`}
                                                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">
                                            No Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        {/* Info jumlah data */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {posts.total > 0 ? `Showing ${posts.from}–${posts.to} from ${posts.total} data` : 'Tidak ada data'}
                        </p>

                        {/* Pagination */}
                        <Pagination links={posts.links} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
