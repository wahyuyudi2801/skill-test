/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props as any;

    if (!flash?.success && !flash?.error) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {flash.success && (
                <div className="px-4 py-3 rounded-md bg-green-100 border border-green-300 text-green-800 shadow">
                    ✅ {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="px-4 py-3 rounded-md bg-red-100 border border-red-300 text-red-800 shadow">
                    ❌ {flash.error}
                </div>
            )}
        </div>
    );
}
