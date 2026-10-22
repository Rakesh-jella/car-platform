import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import type { PageProps } from '@/types';

type Order = {
    reference: string;
    product_name: string;
    category: string;
    order_type: string;
    quantity: number;
    rental_days: number | null;
    total_amount: string;
    advance_amount: string;
    status: string;
    created_at: string;
};

const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function Orders({ orders }: { orders: Order[] }) {
    const { flash } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <Head title="My orders" />
            <section className="mx-auto max-w-5xl px-6 py-14">
                <h1 className="text-4xl font-black">My orders</h1>
                <p className="mt-2 text-slate-300">Track purchases, reservations, and rental requests.</p>
                {flash.success && <p role="status" className="mt-6 rounded-xl border border-emerald-700 bg-emerald-950 p-4 text-emerald-200">{flash.success}</p>}

                {orders.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-300">
                        You have not placed an order yet.
                    </div>
                ) : (
                    <div className="mt-8 space-y-4">
                        {orders.map((order) => (
                            <article key={order.reference} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">{order.reference} · {order.category.replaceAll('_', ' ')}</p>
                                        <h2 className="mt-2 text-xl font-bold">{order.product_name}</h2>
                                        <p className="mt-1 text-sm capitalize text-slate-400">
                                            {order.order_type.replaceAll('_', ' ')}{order.rental_days ? ` · ${order.rental_days} day(s)` : ''}
                                        </p>
                                    </div>
                                    <div className="sm:text-right">
                                        <p className="font-bold">{currency.format(Number(order.total_amount))}</p>
                                        {Number(order.advance_amount) > 0 && <p className="mt-1 text-sm text-amber-300">Advance due: {currency.format(Number(order.advance_amount))}</p>}
                                        <p className="mt-1 text-sm capitalize text-slate-400">{order.status.replaceAll('_', ' ')}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
