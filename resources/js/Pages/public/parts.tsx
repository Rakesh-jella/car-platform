import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import type { PageProps } from '@/types';

type Part = {
    id: number;
    name: string;
    sku: string;
    category: string;
    description: string | null;
    selling_price: number;
    image_url: string | null;
    stock_quantity: number;
};

const categories = [
    { value: 'all', label: 'All gear' },
    { value: 'parts', label: 'Parts' },
    { value: 'styling', label: 'Styling' },
    { value: 'sports_racing', label: 'Sports & racing' },
];

const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function Parts({ parts }: { parts: Part[] }) {
    const [category, setCategory] = useState('all');
    const [orderError, setOrderError] = useState('');
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();
    const isAdminView = Boolean(auth.user?.is_admin || url.startsWith('/admin'));

    const filteredParts = useMemo(
        () => category === 'all' ? parts : parts.filter((part) => part.category === category),
        [category, parts],
    );

    const buyNow = (part: Part) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post('/store/orders', {
            product_type: 'part',
            product_id: part.id,
            order_type: 'purchase',
            quantity: 1,
        }, {
            preserveScroll: true,
            onError: (errors) => setOrderError(errors.product_id ?? 'Unable to place your order. Please try again.'),
        });
    };

    const content = (
        <section className={isAdminView ? 'space-y-6' : 'mx-auto max-w-7xl px-6 py-14'}>
            {!isAdminView && (
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-400">Motive shop</p>
            )}

            <div>
                <h1 className={isAdminView ? 'text-2xl font-bold text-slate-900 dark:text-white' : 'text-4xl font-black sm:text-5xl text-white'}>
                    Parts & performance gear
                </h1>
                <p className={isAdminView ? 'mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-2xl' : 'mt-3 max-w-2xl text-slate-300'}>
                    Shop replacement parts, styling upgrades, and sports and racing equipment.
                </p>
            </div>

            {orderError && <p role="alert" className="mt-6 rounded-xl border border-red-800 bg-red-950 p-4 text-sm text-red-200">{orderError}</p>}

            <div className="flex flex-wrap gap-2 pt-2">
                {categories.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => setCategory(item.value)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            category === item.value
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : isAdminView
                                ? 'border border-slate-200 bg-white text-slate-700 hover:border-amber-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                                : 'border border-slate-700 text-slate-300 hover:border-amber-400'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {filteredParts.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">No products in this category yet</h2>
                    <p className="mt-2 text-xs text-slate-400">New products will appear here when they are added to stock.</p>
                </div>
            ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredParts.map((part) => (
                        <article key={part.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition flex flex-col justify-between">
                            <div>
                                {part.image_url ? (
                                    <img src={part.image_url} alt={part.name} className="h-44 w-full object-cover" />
                                ) : (
                                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950">
                                        <span className="text-4xl text-amber-500" aria-hidden="true">⚙</span>
                                    </div>
                                )}
                                <div className="p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">{part.category.replaceAll('_', ' ')}</p>
                                    <h2 className="mt-1 text-base font-bold text-slate-900 dark:text-white line-clamp-1">{part.name}</h2>
                                    <p className="mt-0.5 text-[11px] font-mono text-slate-400">SKU: {part.sku}</p>
                                    {part.description && <p className="mt-2.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{part.description}</p>}
                                </div>
                            </div>

                            <div className="p-5 pt-0">
                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                                    <p className="text-lg font-black text-slate-900 dark:text-white">{currency.format(part.selling_price)}</p>
                                    <span className="text-xs font-semibold text-emerald-500">{part.stock_quantity} in stock</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => buyNow(part)}
                                    className="mt-3 w-full rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-sm"
                                >
                                    {auth.user ? 'Buy now' : 'Sign in to buy'}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );

    return isAdminView ? (
        <AdminLayout
            title="Parts & Performance Gear Catalog"
            subtitle="Explore replacement components, aesthetic styling upgrades, and track competition gear."
        >
            <Head title="Parts, Styling and Performance Gear" />
            {content}
        </AdminLayout>
    ) : (
        <PublicLayout>
            <Head title="Parts, styling and performance gear" />
            {content}
        </PublicLayout>
    );
}
