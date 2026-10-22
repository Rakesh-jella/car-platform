import { Head, Link, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import type { PageProps } from '@/types';

type Vehicle = {
    id: number;
    reference: string;
    brand: string;
    model: string;
    variant: string | null;
    year: number | null;
    listing_type: 'sale' | 'rental';
    fuel_type: string | null;
    transmission: string | null;
    color: string | null;
    image_url?: string | null;
    mileage: number | null;
    selling_price: number;
    rental_price_per_day: number;
    warehouse: {
        name: string;
        city: string | null;
        country: string | null;
    } | null;
    vehicle_model: {
        name: string;
    } | null;
};

const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();
    const isAdminView = Boolean(auth.user?.is_admin || url.startsWith('/admin'));

    const isRental = vehicle.listing_type === 'rental';
    const price = isRental ? vehicle.rental_price_per_day : vehicle.selling_price;

    const backUrl = url.startsWith('/admin')
        ? `/admin/cars?type=${vehicle.listing_type}`
        : `/cars?type=${vehicle.listing_type}`;

    const orderVehicle = () => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post('/store/orders', {
            product_type: 'vehicle',
            product_id: vehicle.id,
            order_type: isRental ? 'rental_booking' : 'booking',
            rental_days: 1,
        });
    };

    const details = [
        ['Model', vehicle.vehicle_model?.name ?? vehicle.model],
        ['Fuel', vehicle.fuel_type ?? '—'],
        ['Transmission', vehicle.transmission ?? '—'],
        ['Color', vehicle.color ?? '—'],
        ['Mileage', vehicle.mileage !== null ? `${vehicle.mileage.toLocaleString()} km` : '—'],
        ['Location', [vehicle.warehouse?.city, vehicle.warehouse?.country].filter(Boolean).join(', ') || 'Contact us'],
    ];

    const content = (
        <section className={isAdminView ? 'space-y-6 max-w-6xl' : 'mx-auto max-w-6xl px-6 py-14'}>
            <Link href={backUrl} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-500 dark:text-slate-400 transition">
                <span>←</span>
                <span>Back to {isRental ? 'rentals' : 'cars for sale'}</span>
            </Link>

            <div className="mt-4 grid gap-8 lg:grid-cols-2">
                {vehicle.image_url ? (
                    <img
                        src={vehicle.image_url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="h-96 w-full rounded-2xl object-cover shadow-lg border border-slate-200 dark:border-slate-800"
                    />
                ) : (
                    <div className="flex h-96 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-7xl" aria-hidden="true">🚘</span>
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                                {vehicle.reference}
                            </span>
                            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                                {isRental ? 'For rent' : 'For sale'}
                            </span>
                        </div>

                        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                            {vehicle.brand} {vehicle.model}
                        </h1>
                        <p className="mt-1 text-xs text-slate-400">
                            {[vehicle.variant, vehicle.year].filter(Boolean).join(' · ')}
                        </p>

                        <div className="mt-6">
                            <p className="text-3xl font-black text-amber-500">
                                {currency.format(price)}
                                {isRental ? <span className="text-sm font-normal text-slate-400"> / day</span> : null}
                            </p>
                            {!isRental && (
                                <p className="mt-1 text-xs text-slate-400">
                                    Reserve today with a ₹50,000 advance deposit.
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={orderVehicle}
                            className="mt-6 w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-sm text-slate-950 hover:bg-amber-300 transition shadow-sm"
                        >
                            {isRental ? 'Request a rental booking' : 'Reserve this vehicle'}
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                        {details.map(([label, value]) => (
                            <div key={label} className="rounded-xl bg-slate-50 dark:bg-slate-950/70 p-3 border border-slate-100 dark:border-slate-800/60">
                                <p className="text-[10px] text-slate-400 uppercase font-semibold">{label}</p>
                                <p className="mt-0.5 text-xs font-bold text-slate-800 dark:text-slate-200">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

    return isAdminView ? (
        <AdminLayout
            title={`${vehicle.brand} ${vehicle.model}`}
            subtitle={`Reference ${vehicle.reference} · ${vehicle.variant ?? ''}`}
        >
            <Head title={`${vehicle.brand} ${vehicle.model}`} />
            {content}
        </AdminLayout>
    ) : (
        <PublicLayout>
            <Head title={`${vehicle.brand} ${vehicle.model}`} />
            {content}
        </PublicLayout>
    );
}
