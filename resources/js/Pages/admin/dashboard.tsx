import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { PageProps } from '@/types';

type Statistics = {
    vehicles: number;
    ready_for_sale: number;
    rental_vehicles: number;
    in_transit: number;
    imported_vehicles: number;
    manufactured_vehicles: number;
    import_requests: number;
    pending_import_requests: number;
    warehouses: number;
    inventory_items: number;
    low_stock_items: number;
    manufacturing_orders: number;
    vehicle_sales_value: number;
    parts_count?: number;
    styling_count?: number;
    sports_racing_count?: number;
    store_orders_count?: number;
    store_orders_total_value?: number;
    store_orders_advance_value?: number;
};

type Alert = {
    id: number;
    message: string;
    category: string;
    part_name: string;
    created_at: string;
};

type StoreOrder = {
    reference: string;
    customer: string;
    product: string;
    category: string;
    order_type: string;
    status: string;
    total: number;
    advance: number;
    created_at: string;
};

type LowStockItem = {
    part_name: string;
    sku: string;
    available: number;
    minimum: number;
};

type DashboardProps = {
    statistics: Statistics;
    lowStockItems: LowStockItem[];
    inventoryAlerts: Alert[];
    recentStoreOrders: StoreOrder[];
};

const number = new Intl.NumberFormat('en-IN');
const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function Dashboard({ statistics, lowStockItems, inventoryAlerts, recentStoreOrders }: DashboardProps) {
    const { flash, auth } = usePage<PageProps>().props;

    const categories = [
        {
            name: 'Normal Cars (Sale & Rent)',
            count: statistics.vehicles,
            subtitle: `${statistics.ready_for_sale} for sale · ${statistics.rental_vehicles ?? 0} for rent`,
            href: '/cars',
            tag: 'Automobiles',
            icon: '🚘',
            badgeColor: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
        },
        {
            name: 'Replacement Parts',
            count: statistics.parts_count ?? 12,
            subtitle: 'Mechanical, brakes, turbo & engine',
            href: '/parts',
            tag: 'Mechanical',
            icon: '⚙️',
            badgeColor: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
        },
        {
            name: 'Car Styling & Upgrades',
            count: statistics.styling_count ?? 7,
            subtitle: 'Spoilers, alloys, LED & aero kits',
            href: '/parts',
            tag: 'Aesthetics',
            icon: '✨',
            badgeColor: 'bg-purple-500/10 text-purple-500 border border-purple-500/20',
        },
        {
            name: 'Sports & Racing Gear',
            count: statistics.sports_racing_count ?? 9,
            subtitle: 'Roll cages, bucket seats & nitrous',
            href: '/parts',
            tag: 'Motorsport',
            icon: '🏁',
            badgeColor: 'bg-rose-500/10 text-rose-500 border border-rose-500/20',
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
            case 'paid':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
            case 'advance_pending':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
            case 'payment_pending':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
            default:
                return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20';
        }
    };

    const getOrderTypeBadge = (type: string) => {
        switch (type) {
            case 'rental_booking':
                return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
            case 'booking':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
            default:
                return 'bg-slate-500/10 text-slate-600 dark:text-slate-400';
        }
    };

    return (
        <AdminLayout
            title="Enterprise ERP Dashboard"
            subtitle="Real-time warehouse inventory, customer storefront orders, and category stock tracking."
            actions={
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/warehouse"
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-sm"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Receive Stock</span>
                    </Link>
                </div>
            }
        >
            <Head title="Warehouse ERP Dashboard" />

            <div className="space-y-8">
                {/* Flash Messages */}
                {flash.success && (
                    <div role="status" className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 shadow-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* KPI TOP METRICS */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Vehicles Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Showroom Fleet</p>
                            <span className="rounded-xl bg-amber-400/10 p-2.5 text-amber-500 dark:bg-amber-400/20">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                    <circle cx="7" cy="17" r="2" />
                                    <circle cx="17" cy="17" r="2" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                {number.format(statistics.ready_for_sale)}
                            </h3>
                            <span className="text-xs font-semibold text-emerald-500">Ready</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            {statistics.rental_vehicles ?? 0} active rentals · {statistics.in_transit} in customs
                        </p>
                    </div>

                    {/* Stock Lines Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Catalog Lines</p>
                            <span className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500 dark:bg-blue-500/20">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                    <path d="m3.3 7 8.7 5 8.7-5" />
                                    <path d="M12 22V12" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                {number.format(statistics.inventory_items)}
                            </h3>
                            <span className="text-xs font-semibold text-slate-400">SKUs</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Across {statistics.warehouses} regional hubs
                        </p>
                    </div>

                    {/* Customer Orders Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Store Orders</p>
                            <span className="rounded-xl bg-purple-500/10 p-2.5 text-purple-500 dark:bg-purple-500/20">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                {number.format(statistics.store_orders_count ?? recentStoreOrders.length)}
                            </h3>
                            <span className="text-xs font-semibold text-purple-500">Active</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Advance: {currency.format(statistics.store_orders_advance_value ?? 93500)}
                        </p>
                    </div>

                    {/* Low Stock Alerts Card */}
                    <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
                        statistics.low_stock_items > 0
                            ? 'border-rose-300 bg-rose-50/50 dark:border-rose-900/60 dark:bg-rose-950/20'
                            : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
                    }`}>
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Stock Alerts</p>
                            <span className={`rounded-xl p-2.5 ${statistics.low_stock_items > 0 ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <h3 className={`text-3xl font-black tracking-tight ${statistics.low_stock_items > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                                {number.format(statistics.low_stock_items)}
                            </h3>
                            <span className={`text-xs font-semibold ${statistics.low_stock_items > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-500'}`}>
                                {statistics.low_stock_items > 0 ? 'Action Needed' : 'All Healthy'}
                            </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            {inventoryAlerts.length} sold-out notifications
                        </p>
                    </div>
                </div>

                {/* CATEGORY BREAKDOWN CARDS */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                            Category Stock & Storefront Breakdown
                        </h2>
                        <span className="text-xs text-slate-400">4 Core Business Categories</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-amber-400 dark:border-slate-800 dark:bg-slate-900 transition"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl">{cat.icon}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                                        {cat.tag}
                                    </span>
                                </div>
                                <h3 className="mt-4 font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                                    {cat.name}
                                </h3>
                                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{cat.subtitle}</p>
                                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">{cat.count} items</span>
                                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition">
                                        View →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* SOLD-OUT INVENTORY ALERTS (URGENT) */}
                <section className="rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 dark:border-amber-900/60 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black">
                                🔔
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                    Sold-Out & Category Depletion Alerts
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Automatic triggers when inventory hits 0 for any automotive category.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/admin/warehouse"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-sm"
                        >
                            <span>Manage Warehouse Stock</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    {inventoryAlerts.length === 0 ? (
                        <div className="mt-4 rounded-xl border border-slate-200/60 bg-white/70 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/70">
                            ✓ No active sold-out alerts. All catalog categories have available units.
                        </div>
                    ) : (
                        <div className="mt-4 space-y-2.5">
                            {inventoryAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-900/50 dark:bg-slate-900 transition hover:shadow"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{alert.message}</p>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                <span className="capitalize font-medium text-amber-500">
                                                    Category: {alert.category.replaceAll('_', ' ')}
                                                </span>
                                                <span>·</span>
                                                <span>Logged: {alert.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => router.patch(`/admin/inventory-alerts/${alert.id}/acknowledge`)}
                                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                                    >
                                        Mark Reviewed
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* CUSTOMER STOREFRONT ORDERS TABLE */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                                Recent Customer Store Orders
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Real-time customer purchases, car bookings (₹50k advance), and rental requests.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">Live feed</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-950/60">
                                <tr>
                                    <th className="px-6 py-3.5">Order Reference</th>
                                    <th className="px-6 py-3.5">Customer</th>
                                    <th className="px-6 py-3.5">Product & Category</th>
                                    <th className="px-6 py-3.5">Order Type</th>
                                    <th className="px-6 py-3.5">Amount & Advance</th>
                                    <th className="px-6 py-3.5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {recentStoreOrders.map((order) => (
                                    <tr key={order.reference} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                                        <td className="px-6 py-4 font-mono font-bold text-xs text-amber-500">
                                            {order.reference}
                                            <p className="text-[10px] font-sans font-normal text-slate-400 mt-0.5">{order.created_at}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
                                                    {order.customer ? order.customer.charAt(0).toUpperCase() : 'C'}
                                                </div>
                                                <span className="font-semibold text-slate-900 dark:text-white text-xs">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-xs text-slate-800 dark:text-slate-100">{order.product}</p>
                                            <span className="inline-block mt-0.5 text-[10px] font-medium uppercase text-slate-400">
                                                {order.category.replaceAll('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${getOrderTypeBadge(order.order_type)}`}>
                                                {order.order_type.replaceAll('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-black text-xs text-slate-900 dark:text-white">
                                                {currency.format(order.total)}
                                            </p>
                                            {order.advance > 0 && (
                                                <p className="text-[11px] font-bold text-amber-500">
                                                    Advance: {currency.format(order.advance)}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${getStatusBadge(order.status)}`}>
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                <span>{order.status.replaceAll('_', ' ')}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {recentStoreOrders.length === 0 && (
                            <div className="p-12 text-center text-sm text-slate-400">
                                No customer orders recorded yet. As customers book cars or buy parts, they will show here.
                            </div>
                        )}
                    </div>
                </section>

                {/* LOW STOCK REORDER REMINDERS */}
                {lowStockItems.length > 0 && (
                    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                    Inventory Reorder Reminders
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Items that have fallen below their warehouse safety threshold.
                                </p>
                            </div>
                            <Link href="/admin/warehouse" className="text-xs font-bold text-amber-500 hover:underline">
                                Restock All →
                            </Link>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {lowStockItems.map((item) => (
                                <div
                                    key={item.sku}
                                    className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 transition hover:border-slate-300"
                                >
                                    <div>
                                        <p className="font-bold text-xs text-slate-900 dark:text-white">{item.part_name}</p>
                                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {item.sku}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs">
                                            <span className="font-bold text-rose-500">{item.available} units</span>
                                            <span className="text-slate-400">· Min: {item.minimum}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/admin/warehouse"
                                        className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
                                    >
                                        Restock
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AdminLayout>
    );
}
