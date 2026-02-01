import { Link } from '@inertiajs/react';

export type LinkType = {
    url: string | null;
    label: string;
    active: boolean;
};

export function Pagination({ links }: { links: LinkType[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-1 mt-6">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? ''}
                    preserveScroll
                    className={`
                        px-3 py-1 rounded-md text-sm
                        ${link.active
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        ${!link.url && 'opacity-50 pointer-events-none'}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
