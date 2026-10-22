import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const categories = [
    {
        eyebrow: 'Drive your next car',
        title: 'Cars for sale',
        description: 'Browse available new, imported, and locally prepared cars. Reserve your choice with a ₹50,000 advance.',
        href: '/cars?type=sale',
        action: 'Shop cars',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    },
    {
        eyebrow: 'Flexible journeys',
        title: 'Cars for rent',
        description: 'Find a car for the days you need it. Send a rental booking request directly from the vehicle listing.',
        href: '/cars?type=rental',
        action: 'Browse rentals',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
    },
    {
        eyebrow: 'Parts, styling & performance',
        title: 'Parts and gear',
        description: 'Shop replacement parts, styling upgrades, sports equipment, and racing accessories in one place.',
        href: '/parts',
        action: 'Shop parts & gear',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1400&q=85',
    },
];

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Motive — Cars, parts and gear" />

            <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-400">
                        Your automotive marketplace
                    </p>
                    <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-7xl">
                        Find your next <span className="text-amber-400">drive.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                        Shop cars to buy or rent, and find the parts and performance gear to make every drive yours.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/cars" className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300">
                            Browse cars
                        </Link>
                        <Link href="/parts" className="rounded-xl border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-amber-400">
                            Parts & gear
                        </Link>
                    </div>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                    alt="Sports car on a mountain road"
                    className="h-[360px] w-full rounded-3xl object-cover md:h-[480px]"
                />
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Shop by category</p>
                        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Everything for the road</h2>
                    </div>
                    <p className="text-sm text-slate-400">Customer shopping only. Warehouse operations are handled separately.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {categories.map((category) => (
                        <article key={category.title} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                            <img src={category.image} alt="" className="h-48 w-full object-cover" />
                            <div className="p-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">{category.eyebrow}</p>
                                <h3 className="mt-2 text-2xl font-black">{category.title}</h3>
                                <p className="mt-3 min-h-20 leading-6 text-slate-300">{category.description}</p>
                                <Link href={category.href} className="mt-5 inline-flex font-bold text-amber-400 hover:text-amber-300">
                                    {category.action} <span className="ml-2" aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
