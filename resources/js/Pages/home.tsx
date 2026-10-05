import { Head, Link } from '@inertiajs/react';

const navigation = [
    { label: 'Showroom Fleet', href: '/cars' },
    { label: 'Import Vehicle', href: '/import' },
    { label: 'Export Operations', href: '/export' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'Warehouse & Stock', href: '/warehouse' },
    { label: 'Contact', href: '/contact' },
];

const services = [
    {
        title: 'Vehicle Import Services',
        text: 'Source luxury and specialty vehicles globally with complete end-to-end logistics, shipping, port inspection, customs clearance, and verified delivery.',
        icon: '🚢',
    },
    {
        title: 'Worldwide Vehicle Export',
        text: 'Export certified vehicles with international regulatory documentation, freight tracking, transparent agreed valuation, and multi-port delivery.',
        icon: '🌐',
    },
    {
        title: 'Assembly & Manufacturing',
        text: 'Manage state-of-the-art vehicle assembly pipelines, parts inventory, quality control benchmarks, and direct showroom readiness.',
        icon: '🏭',
    },
];

export default function Home() {
    return (
        <>
            <Head title="Motive - Next-Gen Automotive Platform" />

            <main className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-[#ffa31a] selection:text-white">
                {/* Expansive Full-Width Header */}
                <header className="mx-auto flex max-w-[1720px] items-center justify-between px-8 sm:px-12 py-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff9400] to-[#ffa826] font-black text-2xl text-white shadow-lg shadow-amber-500/25">
                            M
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition">
                            MOTIVE <span className="text-[#ffa31a] text-xs font-bold uppercase tracking-widest ml-1 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">Platform</span>
                        </span>
                    </Link>

                    <nav className="hidden gap-8 text-sm font-semibold text-slate-300 lg:flex items-center">
                        {navigation.map((item) => (
                            <Link key={item.label} href={item.href} className="transition hover:text-amber-400">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="rounded-2xl bg-gradient-to-r from-[#ffa31a] to-amber-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-xl hover:scale-105 transition"
                        >
                            Enter Admin ERP →
                        </Link>
                    </div>
                </header>

                {/* Big Hero Section */}
                <section className="mx-auto grid max-w-[1720px] gap-14 px-8 sm:px-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ffa31a]">
                            <span className="h-2 w-2 rounded-full bg-[#ffa31a] animate-pulse"></span>
                            All-In-One Automotive Ecosystem
                        </div>

                        <h1 className="text-6xl font-black leading-none tracking-tight sm:text-7xl xl:text-8xl">
                            Move mobility
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffa31a] via-amber-300 to-amber-500">
                                forward.
                            </span>
                        </h1>

                        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300 font-normal">
                            A high-performance automotive enterprise platform designed for international vehicle importing, global export routing, local assembly manufacturing, and live showroom dealership management.
                        </p>

                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <Link
                                href="/cars"
                                className="rounded-2xl bg-[#ffa31a] hover:bg-[#ff9400] px-8 py-4 text-sm sm:text-base font-black text-slate-950 shadow-lg shadow-amber-500/30 transition hover:scale-105"
                            >
                                Explore Showroom Fleet
                            </Link>

                            <Link
                                href="/admin"
                                className="rounded-2xl border-2 border-slate-700 bg-slate-900/60 px-8 py-4 text-sm sm:text-base font-bold text-white transition hover:border-[#ffa31a] hover:text-[#ffa31a]"
                            >
                                Open Motive Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-20 blur-xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                            alt="Premium luxury automobile"
                            className="relative h-[480px] lg:h-[580px] w-full rounded-3xl object-cover shadow-2xl border border-slate-800"
                        />
                    </div>
                </section>

                {/* Services Section */}
                <section className="bg-slate-900/90 border-t border-slate-800/80 px-8 sm:px-12 py-24">
                    <div className="mx-auto max-w-[1720px]">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffa31a]">
                                End-to-End Enterprise Logistics
                            </p>
                            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight">
                                Integrated platform for the complete vehicle lifecycle.
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-8 md:grid-cols-3">
                            {services.map((service) => (
                                <article
                                    key={service.title}
                                    className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 lg:p-10 shadow-lg hover:border-amber-500/50 transition duration-200"
                                >
                                    <span className="text-4xl mb-6 block">{service.icon}</span>
                                    <h3 className="text-2xl font-black text-white">{service.title}</h3>
                                    <p className="mt-4 leading-relaxed text-slate-300 text-sm sm:text-base">{service.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}