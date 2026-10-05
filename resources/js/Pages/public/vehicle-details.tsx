import { Head, Link } from '@inertiajs/react';

type Vehicle = {
    reference: string;
    vin: string | null;
    brand: string;
    model: string;
    variant: string | null;
    year: number | null;
    source: string;
    status: string;
    fuel_type: string | null;
    transmission: string | null;
    color: string | null;
    mileage: number | null;
    purchase_cost: number;
    import_cost: number;
    production_cost: number;
    total_cost: number;
    selling_price: number;
    purchased_at: string | null;
    arrived_at: string | null;
    ready_for_sale_at: string | null;
    notes: string | null;
    warehouse: {
        name: string;
        code: string;
        city: string | null;
        country: string | null;
    } | null;
    vehicle_model: {
        name: string;
        code: string;
    } | null;
};

type VehicleDetailsProps = {
    vehicle: Vehicle;
};

function label(value: string) {
    return value.replaceAll('_', ' ');
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
    const details = [
        ['Vehicle ID', vehicle.reference],
        ['VIN', vehicle.vin ?? 'Not assigned'],
        ['Source', label(vehicle.source)],
        ['Status', label(vehicle.status)],
        ['Fuel Type', vehicle.fuel_type ?? '—'],
        ['Transmission', vehicle.transmission ?? '—'],
        ['Colour', vehicle.color ?? '—'],
        ['Mileage', vehicle.mileage !== null ? `${vehicle.mileage.toLocaleString()} km` : '—'],
        ['Warehouse', vehicle.warehouse?.name ?? 'In transit / not assigned'],
        ['Purchase Date', vehicle.purchased_at ?? '—'],
        ['Arrival Date', vehicle.arrived_at ?? '—'],
        ['Ready for Sale', vehicle.ready_for_sale_at ?? '—'],
    ];

    return (
        <>
            <Head title={`${vehicle.brand} ${vehicle.model}`} />

            <main className="min-h-screen bg-slate-950 text-white">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <Link href="/" className="text-xl font-bold tracking-wide">
                        CAR<span className="text-amber-400">PLATFORM</span>
                    </Link>

                    <Link href="/cars" className="text-sm text-slate-300 hover:text-amber-400">
                        ← All Vehicles
                    </Link>
                </header>

                <section className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                        {vehicle.reference}
                    </p>

                    <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h1 className="text-4xl font-bold md:text-6xl">
                                {vehicle.brand} {vehicle.model}
                            </h1>
                            <p className="mt-3 text-xl text-slate-300">
                                {[vehicle.variant, vehicle.year].filter(Boolean).join(' · ')}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">Selling price</p>
                            <p className="text-4xl font-bold text-amber-400">
                                ${vehicle.selling_price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-slate-700 bg-slate-900 p-7">
                                <h2 className="text-2xl font-bold">Vehicle tracking</h2>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {details.map(([name, value]) => (
                                        <div key={name} className="rounded-lg bg-slate-800 p-4">
                                            <p className="text-sm text-slate-400">{name}</p>
                                            <p className="mt-1 capitalize text-white">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-7">
                                <h2 className="text-2xl font-bold">Lifecycle status</h2>
                                <div className="mt-5 flex items-center gap-3">
                                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                                    <p className="capitalize text-lg">{label(vehicle.status)}</p>
                                </div>
                                <p className="mt-4 leading-7 text-slate-300">
                                    {vehicle.notes ?? 'No additional tracking notes are available.'}
                                </p>
                            </div>
                        </div>

                        <aside className="rounded-xl border border-slate-700 bg-slate-900 p-7">
                            <h2 className="text-xl font-bold">Cost summary</h2>

                            <div className="mt-6 space-y-4 text-slate-300">
                                <div className="flex justify-between gap-4">
                                    <span>Purchase cost</span>
                                    <span>${vehicle.purchase_cost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span>Import cost</span>
                                    <span>${vehicle.import_cost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span>Production cost</span>
                                    <span>${vehicle.production_cost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between gap-4 border-t border-slate-700 pt-4 font-bold text-white">
                                    <span>Total cost</span>
                                    <span>${vehicle.total_cost.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="mt-8 block rounded-lg bg-amber-400 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-300"
                            >
                                Request a quotation
                            </Link>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    );
}