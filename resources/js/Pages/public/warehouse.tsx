import { Head, Link } from '@inertiajs/react';

type Warehouse = {
    id: number;
    name: string;
    code: string;
    city: string | null;
    country: string | null;
    inventory_count: number;
};

type InventoryItem = {
    id: number;
    warehouse: string;
    part_name: string;
    sku: string;
    unit: string;
    quantity: number;
    reserved_quantity: number;
    available_quantity: number;
    minimum_quantity: number;
    is_low_stock: boolean;
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

type WarehousePageProps = {
    warehouses: Warehouse[];
    inventory: InventoryItem[];
    recentTransactions: Transaction[];
};

export default function Warehouse({
    warehouses,
    inventory,
    recentTransactions,
}: WarehousePageProps) {
    const lowStockCount = inventory.filter((item) => item.is_low_stock).length;

    return (
        <>
            <Head title="Warehouse Management" />

            <main className="min-h-screen bg-slate-950 text-white">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <Link href="/" className="text-xl font-bold tracking-wide">
                        CAR<span className="text-amber-400">PLATFORM</span>
                    </Link>

                    <Link href="/" className="text-sm text-slate-300 hover:text-amber-400">
                        ← Back to Home
                    </Link>
                </header>

                <section className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                        Warehouse Management
                    </p>

                    <h1 className="mt-4 text-4xl font-bold md:text-6xl">
                        Parts and inventory overview
                    </h1>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">Warehouses</p>
                            <p className="mt-2 text-4xl font-bold text-amber-400">
                                {warehouses.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">Inventory items</p>
                            <p className="mt-2 text-4xl font-bold text-amber-400">
                                {inventory.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">Low-stock alerts</p>
                            <p className="mt-2 text-4xl font-bold text-red-400">
                                {lowStockCount}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold">Warehouses</h2>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            {warehouses.map((warehouse) => (
                                <article
                                    key={warehouse.id}
                                    className="rounded-xl border border-slate-700 bg-slate-900 p-6"
                                >
                                    <p className="text-sm font-semibold text-amber-400">
                                        {warehouse.code}
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold">{warehouse.name}</h3>
                                    <p className="mt-2 text-slate-400">
                                        {[warehouse.city, warehouse.country].filter(Boolean).join(', ')}
                                    </p>
                                    <p className="mt-5 text-sm text-slate-300">
                                        {warehouse.inventory_count} part types stored
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                        <div className="border-b border-slate-700 p-6">
                            <h2 className="text-2xl font-bold">Current inventory</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800 text-sm text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4">Part</th>
                                        <th className="px-6 py-4">Warehouse</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Reserved</th>
                                        <th className="px-6 py-4">Available</th>
                                        <th className="px-6 py-4">Minimum</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.map((item) => (
                                        <tr key={item.id} className="border-t border-slate-800">
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{item.part_name}</p>
                                                <p className="text-sm text-slate-400">{item.sku}</p>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{item.warehouse}</td>
                                            <td className="px-6 py-4">{item.quantity}</td>
                                            <td className="px-6 py-4">{item.reserved_quantity}</td>
                                            <td className="px-6 py-4 font-semibold">
                                                {item.available_quantity} {item.unit}
                                            </td>
                                            <td className="px-6 py-4">{item.minimum_quantity}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={
                                                        item.is_low_stock
                                                            ? 'rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-300'
                                                            : 'rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-300'
                                                    }
                                                >
                                                    {item.is_low_stock ? 'Low stock' : 'Healthy'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                        <div className="border-b border-slate-700 p-6">
                            <h2 className="text-2xl font-bold">Recent stock transactions</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800 text-sm text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Part</th>
                                        <th className="px-6 py-4">Warehouse</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Quantity</th>
                                        <th className="px-6 py-4">Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="border-t border-slate-800">
                                            <td className="px-6 py-4 text-sm text-slate-400">
                                                {transaction.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {transaction.part_name}
                                                <span className="ml-2 text-sm text-slate-400">
                                                    {transaction.sku}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{transaction.warehouse}</td>
                                            <td className="px-6 py-4 capitalize">
                                                {transaction.type.replace('_', ' ')}
                                            </td>
                                            <td className="px-6 py-4">{transaction.quantity}</td>
                                            <td className="px-6 py-4 text-slate-400">
                                                {transaction.reference ?? '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}