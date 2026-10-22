import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

type Part = {
    name: string;
    sku: string;
    available: number;
    required: number;
    enough: boolean;
};

type VehicleModel = {
    name: string;
    code: string;
    description: string | null;
    parts: Part[];
    can_build: number;
};

type ManufacturingPageProps = {
    vehicleModels: VehicleModel[];
};

export default function Manufacturing({ vehicleModels }: ManufacturingPageProps) {
    return (
        <AdminLayout
            title="Manufacturing & Bill of Materials"
            subtitle="Monitor production readiness, verify BOM part availability, and calculate vehicle assembly capacity."
        >
            <Head title="Manufacturing (BOM)" />

            <div className="space-y-8">
                {/* Overview Header Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                                Assembly Readiness Engine
                            </span>
                            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                                Bill of Materials (BOM) Breakdown
                            </h2>
                            <p className="mt-1 text-xs text-slate-400 max-w-2xl">
                                The system compares real-time warehouse inventory quantities with required parts per vehicle model to determine current production capability.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>{vehicleModels.length} Active Vehicle Models</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Model Cards */}
                <div className="space-y-6">
                    {vehicleModels.map((vehicleModel) => (
                        <article
                            key={vehicleModel.code}
                            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-amber-500 bg-amber-400/10 px-2 py-0.5 rounded-md">
                                            {vehicleModel.code}
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {vehicleModel.name}
                                        </h3>
                                    </div>
                                    {vehicleModel.description && (
                                        <p className="mt-1.5 text-xs text-slate-400 max-w-xl">
                                            {vehicleModel.description}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 text-center dark:border-amber-900/60 dark:bg-amber-950/30 min-w-48">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Production Capacity
                                    </p>
                                    <p className="mt-1 text-3xl font-black text-amber-500">
                                        {vehicleModel.can_build}
                                    </p>
                                    <p className="text-[11px] font-semibold text-slate-400">assembled vehicles</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left text-sm">
                                    <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-950/60">
                                        <tr>
                                            <th className="px-6 py-3.5">Component Part</th>
                                            <th className="px-6 py-3.5">SKU</th>
                                            <th className="px-6 py-3.5">Required per Vehicle</th>
                                            <th className="px-6 py-3.5">Available in Warehouse</th>
                                            <th className="px-6 py-3.5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                        {vehicleModel.parts.map((part) => (
                                            <tr key={part.sku} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                                                <td className="px-6 py-4 font-bold text-xs text-slate-900 dark:text-white">
                                                    {part.name}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                                    {part.sku}
                                                </td>
                                                <td className="px-6 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    {part.required} units
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">
                                                    {part.available} units
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                                            part.enough
                                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                                        }`}
                                                    >
                                                        <span className={`h-1.5 w-1.5 rounded-full ${part.enough ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                        <span>{part.enough ? 'Sufficient Stock' : 'Deficit / Restock'}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
