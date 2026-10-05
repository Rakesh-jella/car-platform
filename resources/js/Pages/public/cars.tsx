import { Head, Link } from '@inertiajs/react';

type Vehicle = {
    reference: string;
    brand: string;
    model: string;
    variant: string | null;
    year: number | null;
    source: string;
    status: string;
    fuel_type: string | null;
    transmission: string | null;
    color: string | null;
    selling_price: number;
    warehouse: string | null;
};

type CarsPageProps = {
    vehicles: Vehicle[];
};

function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

function formatSource(source: string) {
    return source === 'manufactured' ? 'Locally Manufactured' : 'Imported';
}

export default function Cars({ vehicles }: CarsPageProps) {
    return (
        <>
            <Head title="Motive - Vehicle Showroom & Fleet" />

            <main className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-[#ffa31a] selection:text-white">
                {/* Expansive Header */}
                <header className="mx-auto flex max-w-[1720px] items-center justify-between px-8 sm:px-12 py-8 border-b border-slate-800/80">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff9400] to-[#ffa826] font-black text-2xl text-white shadow-lg shadow-amber-500/25">
                            M
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            MOTIVE <span className="text-[#ffa31a] text-xs font-bold uppercase tracking-widest ml-1 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">Showroom</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition">
                            ← Return to Home
                        </Link>
                        <Link
                            href="/admin"
                            className="rounded-2xl bg-[#ffa31a] px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:bg-[#ff9400] transition"
                        >
                            Admin ERP Dashboard
                        </Link>
                    </div>
                </header>

                <section className="mx-auto max-w-[1720px] px-8 sm:px-12 py-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#ffa31a]">
                                Active Fleet Portfolio
                            </span>
                            <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
                                Track Every Vehicle.
                            </h1>
                            <p className="mt-3 max-w-3xl text-base sm:text-lg text-slate-300 font-normal">
                                Browse imported and locally assembled vehicles with live status, specs, facility allocation, and direct retail booking.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4">
                            <span className="text-xs uppercase font-bold text-slate-400">Total Catalogued</span>
                            <p className="text-3xl font-black text-[#ffa31a] mt-1">{vehicles.length} Units</p>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {vehicles.map((vehicle) => (
                            <article
                                key={vehicle.reference}
                                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl hover:border-amber-400/60 transition duration-300 flex flex-col justify-between"
                            >
                                <div className="relative flex h-52 items-end bg-gradient-to-br from-slate-800 via-slate-850 to-slate-950 p-6 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                                            vehicle.source === 'manufactured'
                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                        }`}>
                                            {formatSource(vehicle.source)}
                                        </span>
                                    </div>
                                    <p className="font-mono text-xs font-bold text-amber-400 tracking-wider">
                                        {vehicle.reference}
                                    </p>
                                </div>

                                <div className="p-7 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition">
                                                    {vehicle.brand} {vehicle.model}
                                                </h2>
                                                <p className="mt-1 text-xs font-semibold text-slate-400">
                                                    {[vehicle.variant, vehicle.year].filter(Boolean).join(' · ')}
                                                </p>
                                            </div>

                                            <span className="shrink-0 rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 text-xs font-bold capitalize text-amber-300">
                                                {formatStatus(vehicle.status)}
                                            </span>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-300 bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
                                            <p><span className="text-slate-500 font-medium">Fuel:</span> {vehicle.fuel_type ?? '—'}</p>
                                            <p><span className="text-slate-500 font-medium">Gear:</span> {vehicle.transmission ?? '—'}</p>
                                            <p><span className="text-slate-500 font-medium">Color:</span> {vehicle.color ?? '—'}</p>
                                            <p><span className="text-slate-500 font-medium">Loc:</span> {vehicle.warehouse ?? 'In transit'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                                        <div>
                                            <span className="text-[11px] text-slate-400 font-medium block">Valuation</span>
                                            <span className="text-2xl font-black text-emerald-400">
                                                ${vehicle.selling_price.toLocaleString()}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/cars/${vehicle.reference}`}
                                            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#ffa31a] hover:text-[#ffa31a]"
                                        >
                                            Inspect →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}