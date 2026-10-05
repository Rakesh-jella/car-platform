import { Head, Link } from '@inertiajs/react';

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
        <>
            <Head title="Vehicle Manufacturing" />

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
                        Manufacturing Management
                    </p>

                    <h1 className="mt-4 text-4xl font-bold md:text-6xl">
                        Bill of Materials readiness
                    </h1>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                        Each vehicle model has required parts. The system compares required
                        quantities with available stock to determine production capacity.
                    </p>

                    <div className="mt-12 grid gap-8">
                        {vehicleModels.map((vehicleModel) => (
                            <article
                                key={vehicleModel.code}
                                className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
                            >
                                <div className="flex flex-col justify-between gap-5 border-b border-slate-700 p-6 md:flex-row md:items-center">
                                    <div>
                                        <p className="text-sm text-amber-400">{vehicleModel.code}</p>
                                        <h2 className="mt-1 text-2xl font-bold">{vehicleModel.name}</h2>
                                        {vehicleModel.description && (
                                            <p className="mt-2 text-slate-300">{vehicleModel.description}</p>
                                        )}
                                    </div>

                                    <div className="rounded-lg bg-slate-800 px-5 py-4 text-center">
                                        <p className="text-sm text-slate-300">Current production capacity</p>
                                        <p className="mt-1 text-3xl font-bold text-amber-400">
                                            {vehicleModel.can_build}
                                        </p>
                                        <p className="text-sm text-slate-300">vehicles</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-800 text-sm text-slate-300">
                                            <tr>
                                                <th className="px-6 py-4">Part</th>
                                                <th className="px-6 py-4">SKU</th>
                                                <th className="px-6 py-4">Required per Vehicle</th>
                                                <th className="px-6 py-4">Available</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicleModel.parts.map((part) => (
                                                <tr key={part.sku} className="border-t border-slate-800">
                                                    <td className="px-6 py-4 font-medium">{part.name}</td>
                                                    <td className="px-6 py-4 text-slate-400">{part.sku}</td>
                                                    <td className="px-6 py-4">{part.required}</td>
                                                    <td className="px-6 py-4">{part.available}</td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={
                                                                part.enough
                                                                    ? 'rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-300'
                                                                    : 'rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-300'
                                                            }
                                                        >
                                                            {part.enough ? 'Available' : 'Low stock'}
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
                </section>
            </main>
        </>
    );
}