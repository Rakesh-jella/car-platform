import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useMemo, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { PageProps } from '@/types';

type InventoryItem = {
    id: number;
    warehouse: string;
    part_name: string;
    sku: string;
    category: string;
    unit: string;
    quantity: number;
    reserved_quantity: number;
    available_quantity: number;
    minimum_quantity: number;
    is_low_stock: boolean;
};

type Warehouse = {
    id: number;
    name: string;
    code: string;
    city: string | null;
    country: string | null;
    inventory_count: number;
};

type Transaction = {
    id: number;
    warehouse: string;
    part_name: string;
    sku: string;
    type: string;
    quantity: number;
    reference: string | null;
    created_at: string;
};

function StockRow({ item }: { item: InventoryItem }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: '',
        reference: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const receive = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        post(`/admin/warehouse/${item.id}/receive`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const getCategoryBadge = (cat: string) => {
        switch (cat) {
            case 'parts':
                return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
            case 'styling':
                return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
            case 'sports_racing':
                return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border border-slate-500/20';
        }
    };

    return (
        <tr className="border-t border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <td className="px-5 py-4">
                <p className="font-bold text-xs text-slate-900 dark:text-white">{item.part_name}</p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">SKU: {item.sku}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${getCategoryBadge(item.category)}`}>
                        {item.category.replaceAll('_', ' ')}
                    </span>
                </div>
            </td>

            <td className="px-5 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item.warehouse}</span>
                </span>
            </td>

            <td className="px-5 py-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.quantity} <span className="text-[11px] font-normal text-slate-400">{item.unit}</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                    Avail: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.available_quantity}</span> · Res: {item.reserved_quantity}
                </div>
            </td>

            <td className="px-5 py-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    item.is_low_stock
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${item.is_low_stock ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    <span>{item.is_low_stock ? 'Low Stock' : 'Healthy'}</span>
                </span>
                <p className="mt-0.5 text-[10px] text-slate-400">Min: {item.minimum_quantity}</p>
            </td>

            <td className="px-5 py-4">
                <form onSubmit={receive} className="flex flex-wrap items-center gap-2">
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        aria-label={`Quantity received for ${item.part_name}`}
                        placeholder={`Qty (${item.unit})`}
                        value={data.quantity}
                        onChange={(event) => setData('quantity', event.target.value)}
                        className="w-24 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <input
                        type="text"
                        aria-label={`Purchase reference for ${item.part_name}`}
                        placeholder="PO / Ref #"
                        value={data.reference}
                        onChange={(event) => setData('reference', event.target.value)}
                        className="w-28 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                        type="submit"
                        disabled={processing || isSubmitting}
                        className="rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-300 disabled:opacity-50 transition shadow-sm"
                    >
                        {processing || isSubmitting ? '...' : '+ Receive'}
                    </button>
                </form>
                {errors.quantity && <p className="mt-1 text-[11px] text-rose-500">{errors.quantity}</p>}
            </td>
        </tr>
    );
}

export default function WarehousePage({
    warehouses,
    inventory,
    recentTransactions,
}: {
    warehouses: Warehouse[];
    inventory: InventoryItem[];
    recentTransactions: Transaction[];
}) {
    const { flash } = usePage<PageProps>().props;
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const lowStockCount = inventory.filter((item) => item.is_low_stock).length;

    const filteredInventory = useMemo(() => {
        return inventory.filter((item) => {
            const matchesCategory =
                selectedCategory === 'all'
                    ? true
                    : selectedCategory === 'low_stock'
                    ? item.is_low_stock
                    : item.category === selectedCategory;

            const matchesSearch =
                searchTerm === '' ||
                item.part_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [inventory, selectedCategory, searchTerm]);

    const categories = [
        { id: 'all', label: 'All Items', count: inventory.length },
        { id: 'parts', label: 'Mechanical Parts', count: inventory.filter((i) => i.category === 'parts').length },
        { id: 'styling', label: 'Car Styling', count: inventory.filter((i) => i.category === 'styling').length },
        { id: 'sports_racing', label: 'Sports & Racing', count: inventory.filter((i) => i.category === 'sports_racing').length },
        { id: 'low_stock', label: 'Low Stock Alerts', count: lowStockCount, isAlert: true },
    ];

    return (
        <AdminLayout
            title="Warehouse Inventory & Logistics"
            subtitle="Record supplier purchases, track physical stock across facilities, and monitor low-stock thresholds."
        >
            <Head title="Warehouse Inventory & Logistics" />

            <div className="space-y-8">
                {/* Flash Notice */}
                {flash.success && (
                    <div role="status" className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 shadow-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* LOGISTICS KPI CARDS */}
                <div className="grid gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Warehouse Hubs</p>
                        <h3 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{warehouses.length}</h3>
                        <p className="mt-1 text-xs text-slate-500">Central, port, and regional hubs</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tracked SKUs</p>
                        <h3 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{inventory.length}</h3>
                        <p className="mt-1 text-xs text-slate-500">Active products in warehouse storage</p>
                    </div>

                    <div className={`rounded-2xl border p-6 shadow-sm ${
                        lowStockCount > 0
                            ? 'border-rose-300 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/20'
                            : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
                    }`}>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Depleted / Low Stock</p>
                        <h3 className={`mt-3 text-3xl font-black ${lowStockCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                            {lowStockCount}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">Items below minimum threshold</p>
                    </div>
                </div>

                {/* WAREHOUSE LOCATIONS ROW */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Warehouse Locations</h2>
                        <span className="text-xs text-slate-400">{warehouses.length} Facilities Operational</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {warehouses.map((wh) => (
                            <div
                                key={wh.id}
                                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold text-amber-500">{wh.code}</span>
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                </div>
                                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{wh.name}</h3>
                                <p className="mt-0.5 text-xs text-slate-500">{[wh.city, wh.country].filter(Boolean).join(', ')}</p>
                                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span>Stock lines</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">{wh.inventory_count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* INVENTORY TABLE WITH SEARCH & CATEGORY TABS */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Warehouse Inventory</h2>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Record stock receipts directly to increase inventory in the showroom & store.
                                </p>
                            </div>

                            {/* Search Box */}
                            <div className="relative w-full sm:w-72">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    🔍
                                </span>
                                <input
                                    type="text"
                                    placeholder="Filter by name, SKU, hub..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                />
                            </div>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {categories.map((cat) => {
                                const active = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                                            active
                                                ? cat.isAlert
                                                    ? 'bg-rose-500 text-white'
                                                    : 'bg-amber-400 text-slate-950 shadow-sm'
                                                : cat.isAlert
                                                ? 'border border-rose-300 text-rose-500 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30'
                                                : 'border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:border-amber-400'
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                            active ? 'bg-black/10 dark:bg-white/20' : 'bg-slate-200 dark:bg-slate-800'
                                        }`}>
                                            {cat.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left text-sm">
                            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-950/60">
                                <tr>
                                    <th className="px-5 py-3.5">Item & SKU</th>
                                    <th className="px-5 py-3.5">Warehouse</th>
                                    <th className="px-5 py-3.5">Quantity / Available</th>
                                    <th className="px-5 py-3.5">Health Status</th>
                                    <th className="px-5 py-3.5">Receive New Purchase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventory.map((item) => (
                                    <StockRow key={item.id} item={item} />
                                ))}
                            </tbody>
                        </table>

                        {filteredInventory.length === 0 && (
                            <div className="p-12 text-center text-sm text-slate-400">
                                No items found matching the current search criteria or category filter.
                            </div>
                        )}
                    </div>
                </section>

                {/* RECENT INVENTORY TRANSACTIONS LOG */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Stock Movement Audit</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Supplier receipts and customer storefront order deductions.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-950/60">
                                <tr>
                                    <th className="px-5 py-3.5">Reference</th>
                                    <th className="px-5 py-3.5">Warehouse</th>
                                    <th className="px-5 py-3.5">Product</th>
                                    <th className="px-5 py-3.5">Type</th>
                                    <th className="px-5 py-3.5">Quantity</th>
                                    <th className="px-5 py-3.5">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                                        <td className="px-5 py-3.5 font-mono text-xs font-bold text-amber-500">
                                            {tx.reference ?? `TX-${tx.id}`}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-slate-700 dark:text-slate-300">
                                            {tx.warehouse}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs font-semibold text-slate-900 dark:text-white">
                                            {tx.part_name} <span className="font-mono text-[10px] text-slate-400">({tx.sku})</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                tx.type === 'stock_in'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                            }`}>
                                                {tx.type.replaceAll('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 font-bold text-xs">
                                            {tx.type === 'stock_in' ? `+${tx.quantity}` : `-${tx.quantity}`}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-slate-400">
                                            {tx.created_at}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
