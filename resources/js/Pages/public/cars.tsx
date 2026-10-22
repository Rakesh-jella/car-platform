import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
    price: number;
    warehouse: string | null;
};

type CarsPageProps = {
    vehicles: Vehicle[];
    listingType: 'sale' | 'rental';
};

const currency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export default function Cars({ vehicles, listingType }: CarsPageProps) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();
    const isAdminView = Boolean(auth.user?.is_admin || url.startsWith('/admin'));

    const isRental = listingType === 'rental';
    const [rentalDays, setRentalDays] = useState(1);
    const [orderError, setOrderError] = useState('');

    const buyUrl = url.startsWith('/admin') ? '/admin/cars?type=sale' : '/cars?type=sale';
    const rentUrl = url.startsWith('/admin') ? '/admin/cars?type=rental' : '/cars?type=rental';

    const orderVehicle = (vehicle: Vehicle) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post('/store/orders', {
            product_type: 'vehicle',
            product_id: vehicle.id,
            order_type: isRental ? 'rental_booking' : 'booking',
            rental_days: rentalDays,
        }, {
            preserveScroll: true,
            onError: (errors) => setOrderError(errors.product_id ?? errors.rental_days ?? 'Unable to place your order. Please try again.'),
        });
    };

    const content = (
        <section className={isAdminView ? 'space-y-6' : 'mx-auto max-w-7xl px-6 py-14'}>
            {!isAdminView && (
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-400">Motive showroom</p>
            )}

            <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                    <h1 className={isAdminView ? 'text-2xl font-bold text-slate-900 dark:text-white' : 'text-4xl font-black sm:text-5xl text-white'}>
                        {isRental ? 'Cars for rent' : 'Cars for sale'}
                    </h1>
                    <p className={isAdminView ? 'mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-2xl' : 'mt-3 max-w-2xl text-slate-300'}>
                        {isRental
                            ? 'Choose your ride and send a rental request. Rental requests are confirmed by our team.'
                            : 'Browse available cars. Reserve a car with a ₹50,000 advance and follow your order in My orders.'}
                    </p>
                </div>

                {orderError && <p role="alert" className="mt-6 rounded-xl border border-red-800 bg-red-950 p-4 text-sm text-red-200">{orderError}</p>}

                <div className="flex flex-wrap items-center gap-4">
                    {isRental && (
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Duration:
                            <select
                                value={rentalDays}
                                onChange={(event) => setRentalDays(Number(event.target.value))}
                                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            >
                                {Array.from({ length: 30 }, (_, index) => index + 1).map((days) => (
                                    <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </label>
                    )}

                    <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900 shadow-inner">
                        <Link href={buyUrl} className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${!isRental ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                            Buy
                        </Link>
                        <Link href={rentUrl} className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${isRental ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                            Rent
                        </Link>
                    </div>
                </div>
            </div>

            {vehicles.length === 0 ? (
                <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">No {isRental ? 'rental cars' : 'cars for sale'} available right now</h2>
                    <p className="mt-2 text-xs text-slate-400">Please check back soon for new arrivals.</p>
                </div>
            ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles.map((vehicle) => (
                        <article key={vehicle.reference} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition">
                            {vehicle.image_url ? (
                                <img src={vehicle.image_url} alt={`${vehicle.brand} ${vehicle.model}`} className="h-48 w-full object-cover" />
                            ) : (
                                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950">
                                    <span className="text-5xl" aria-hidden="true">🚘</span>
                                </div>
                            )}
                            <div className="p-6">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-500">{vehicle.reference}</p>
                                <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">{vehicle.brand} {vehicle.model}</h2>
                                <p className="mt-1 text-xs text-slate-400">{[vehicle.variant, vehicle.year].filter(Boolean).join(' · ')}</p>
                                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    <span>⛽ {vehicle.fuel_type ?? '—'}</span>
                                    <span>⚙️ {vehicle.transmission ?? '—'}</span>
                                    <span>🎨 {vehicle.color ?? '—'}</span>
                                    <span>📍 {vehicle.warehouse ?? 'Available'}</span>
                                </div>
                                <div className="mt-6 flex items-end justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                                    <div>
                                        <p className="text-[11px] text-slate-400">{isRental ? 'Per day' : 'Price'}</p>
                                        <p className="text-xl font-black text-amber-500">
                                            {currency.format(vehicle.price)}{isRental ? <span className="text-xs font-normal text-slate-400"> / day</span> : null}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Link href={`/cars/${vehicle.reference}`} className="text-xs font-semibold text-slate-500 hover:text-amber-500 dark:text-slate-400">Details →</Link>
                                        <button
                                            type="button"
                                            onClick={() => orderVehicle(vehicle)}
                                            className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-sm"
                                        >
                                            {isRental ? 'Request rental' : auth.user ? 'Reserve · ₹50,000' : 'Sign in to reserve'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );

    return isAdminView ? (
        <AdminLayout
            title={isRental ? 'Showroom: Cars for Rent' : 'Showroom: Cars for Sale'}
            subtitle={
                isRental
                    ? 'Rental booking fleet with daily pricing and availability.'
                    : 'Showroom vehicle inventory ready for purchase or advance reservation.'
            }
        >
            <Head title={isRental ? 'Cars for Rent' : 'Cars for Sale'} />
            {content}
        </AdminLayout>
    ) : (
        <PublicLayout>
            <Head title={isRental ? 'Cars for rent' : 'Cars for sale'} />
            {content}
        </PublicLayout>
    );
}
