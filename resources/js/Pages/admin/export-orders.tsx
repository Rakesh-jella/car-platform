import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Customer = {
    id: number;
    name: string;
    email: string | null;
    country: string | null;
};

type Vehicle = {
    id: number;
    reference: string;
    brand: string;
    model: string;
    year: number;
    selling_price: string;
};

type ExportOrder = {
    id: number;
    reference: string;
    status: string;
    agreed_price: string;
    currency: string;
    order_date: string;
    customer: { name: string };
    vehicle: { reference: string; brand: string; model: string };
};

type Props = {
    orders: ExportOrder[];
    customers: Customer[];
    availableVehicles: Vehicle[];
};

export default function ExportOrders({
    orders,
    customers,
    availableVehicles,
}: Props) {
    const [form, setForm] = useState({
        customer_id: '',
        vehicle_id: '',
        reference: `EXP-${Date.now()}`,
        agreed_price: '',
        currency: 'USD',
        order_date: new Date().toISOString().slice(0, 10),
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    function submit(event: FormEvent) {
        event.preventDefault();

        router.post('/admin/export-orders', form, {
            onError: (validationErrors) => setErrors(validationErrors),
        });
    }

    return (
        <AdminLayout
            title="Export Logistics & Orders"
            subtitle="Coordinate international destination delivery, contracts, and export pipelines."
        >
            <div className="grid gap-8 xl:grid-cols-[440px_1fr] max-w-[1720px] mx-auto">
                <form
                    onSubmit={submit}
                    className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm space-y-6 transition-colors"
                >
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Create Export Order</h2>
                        <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                            Book an available vehicle for export delivery.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Customer</span>
                            <select
                                required
                                value={form.customer_id}
                                onChange={(event) =>
                                    setForm({ ...form, customer_id: event.target.value })
                                }
                                className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            >
                                <option value="">Select a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                        {customer.country ? ` — ${customer.country}` : ''}
                                    </option>
                                ))}
                            </select>
                            {errors.customer_id && (
                                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.customer_id}</p>
                            )}
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Available Vehicle</span>
                            <select
                                required
                                value={form.vehicle_id}
                                onChange={(event) =>
                                    setForm({ ...form, vehicle_id: event.target.value })
                                }
                                className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            >
                                <option value="">Select a ready-for-sale vehicle</option>
                                {availableVehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.reference} — {vehicle.brand} {vehicle.model} ({vehicle.year})
                                    </option>
                                ))}
                            </select>
                            {errors.vehicle_id && (
                                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.vehicle_id}</p>
                            )}
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Order Reference</span>
                            <input
                                required
                                value={form.reference}
                                onChange={(event) =>
                                    setForm({ ...form, reference: event.target.value })
                                }
                                className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            />
                            {errors.reference && (
                                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.reference}</p>
                            )}
                        </label>

                        <div className="grid grid-cols-[1fr_110px] gap-3">
                            <label className="block">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Agreed Price</span>
                                <input
                                    required
                                    min="0"
                                    step="0.01"
                                    type="number"
                                    value={form.agreed_price}
                                    onChange={(event) =>
                                        setForm({ ...form, agreed_price: event.target.value })
                                    }
                                    className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Currency</span>
                                <input
                                    required
                                    maxLength={3}
                                    value={form.currency}
                                    onChange={(event) =>
                                        setForm({ ...form, currency: event.target.value.toUpperCase() })
                                    }
                                    className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white uppercase font-bold text-center focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Order Date</span>
                            <input
                                required
                                type="date"
                                value={form.order_date}
                                onChange={(event) =>
                                    setForm({ ...form, order_date: event.target.value })
                                }
                                className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#ffa31a] hover:bg-[#ff9400] px-5 py-4 font-bold text-white shadow-md shadow-amber-500/25 transition mt-2"
                        >
                            Create Export Order
                        </button>
                    </div>
                </form>

                <section className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm transition-colors">
                    <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-slate-800">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Active Export Registrations</h2>
                            <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                                Live track of confirmed international delivery orders.
                            </p>
                        </div>
                        <span className="rounded-full bg-gray-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                            {orders.length} Records
                        </span>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="border-b border-gray-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                <tr>
                                    <th className="pb-3.5">Reference</th>
                                    <th className="pb-3.5">Customer</th>
                                    <th className="pb-3.5">Vehicle</th>
                                    <th className="pb-3.5">Agreed Value</th>
                                    <th className="pb-3.5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {orders.map((order) => (
                                    <tr key={order.id} className="transition hover:bg-gray-50 dark:hover:bg-slate-800/40">
                                        <td className="py-4 font-mono font-bold text-[#ffa31a]">{order.reference}</td>
                                        <td className="py-4 font-semibold text-slate-800 dark:text-slate-200">{order.customer.name}</td>
                                        <td className="py-4 text-slate-600 dark:text-slate-300">
                                            {order.vehicle.reference} — {order.vehicle.brand} {order.vehicle.model}
                                        </td>
                                        <td className="py-4 font-black text-slate-900 dark:text-white">
                                            {order.currency} {Number(order.agreed_price).toLocaleString()}
                                        </td>
                                        <td className="py-4">
                                            <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold capitalize text-amber-500">
                                                {order.status.replaceAll('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-400 dark:text-slate-500">
                                            No export orders have been created yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}