import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';

type Customer = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    country: string | null;
    address: string | null;
};

type Props = {
    customers: Customer[];
};

type CustomerForm = {
    name: string;
    email: string;
    phone: string;
    country: string;
    address: string;
};

type CustomerField = {
    field: Exclude<keyof CustomerForm, 'address'>;
    label: string;
    required: boolean;
    type: 'text' | 'email';
};

const customerFields: CustomerField[] = [
    { field: 'name', label: 'Customer Name', required: true, type: 'text' },
    { field: 'email', label: 'Email Address', required: false, type: 'email' },
    { field: 'phone', label: 'Phone Number', required: false, type: 'text' },
    { field: 'country', label: 'Country / Jurisdiction', required: false, type: 'text' },
];

const emptyForm: CustomerForm = {
    name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
};

export default function Customers({ customers }: Props) {
    const [form, setForm] = useState<CustomerForm>(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    function submit(event: FormEvent) {
        event.preventDefault();

        setErrors({});

        router.post('/admin/customers', form, {
            onSuccess: () => {
                setForm(emptyForm);
                setErrors({});
            },
            onError: (validationErrors) => setErrors(validationErrors),
        });
    }

    return (
        <AdminLayout
            title="Customer Relationship Directory"
            subtitle="Manage client accounts, dealership buyers, and international trade leads."
        >
            <div className="grid gap-8 xl:grid-cols-[440px_1fr] max-w-[1720px] mx-auto">
                <form
                    onSubmit={submit}
                    className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm space-y-6 transition-colors"
                >
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Register New Customer</h2>
                        <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                            Add a buyer or partner account into the central ERP database.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {customerFields.map(({ field, label, required, type }) => (
                            <label key={field} className="block">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{label}</span>

                                <input
                                    required={required}
                                    type={type}
                                    value={form[field]}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            [field]: event.target.value,
                                        }))
                                    }
                                    className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                />

                                {errors[field] && (
                                    <p className="mt-1 text-xs text-rose-500 font-semibold">
                                        {errors[field]}
                                    </p>
                                )}
                            </label>
                        ))}

                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Street / Billing Address</span>

                            <textarea
                                rows={3}
                                value={form.address}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        address: event.target.value,
                                    }))
                                }
                                className="mt-1.5 w-full rounded-2xl border-0 bg-[#f4f5f7] dark:bg-slate-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            />

                            {errors.address && (
                                <p className="mt-1 text-xs text-rose-500 font-semibold">
                                    {errors.address}
                                </p>
                            )}
                        </label>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#ffa31a] hover:bg-[#ff9400] px-5 py-4 font-bold text-white shadow-md shadow-amber-500/25 transition mt-2"
                        >
                            Save Customer Record
                        </button>
                    </div>
                </form>

                <section className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm transition-colors">
                    <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-slate-800">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Customer Directory</h2>
                            <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                                Verified trade and retail customer records.
                            </p>
                        </div>
                        <span className="rounded-full bg-gray-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                            {customers.length} Accounts
                        </span>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="border-b border-gray-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                <tr>
                                    <th className="pb-3.5">Customer Name</th>
                                    <th className="pb-3.5">Email</th>
                                    <th className="pb-3.5">Phone</th>
                                    <th className="pb-3.5">Country</th>
                                    <th className="pb-3.5">Address</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {customers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="transition hover:bg-gray-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="py-4 font-bold text-slate-900 dark:text-white">{customer.name}</td>
                                        <td className="py-4 text-slate-600 dark:text-slate-300">{customer.email || '—'}</td>
                                        <td className="py-4 text-slate-600 dark:text-slate-300">{customer.phone || '—'}</td>
                                        <td className="py-4">
                                            {customer.country ? (
                                                <span className="inline-flex rounded-md bg-gray-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {customer.country}
                                                </span>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="py-4 text-slate-500 dark:text-slate-400">{customer.address || '—'}</td>
                                    </tr>
                                ))}

                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-400 dark:text-slate-500">
                                            No customers have been registered yet.
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