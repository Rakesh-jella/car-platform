import { Head, Link } from '@inertiajs/react';

type PublicPageProps = {
    title: string;
    description: string;
};

export default function PublicPage({ title, description }: PublicPageProps) {
    return (
        <>
            <Head title={title} />

            <main className="min-h-screen bg-slate-950 text-white">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <Link href="/" className="text-xl font-bold tracking-wide">
                        CAR<span className="text-amber-400">PLATFORM</span>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-slate-300 transition hover:text-amber-400"
                    >
                        ← Back to Home
                    </Link>
                </header>

                <section className="mx-auto max-w-4xl px-6 py-24 md:py-36">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                        Car Platform
                    </p>

                    <h1 className="mt-5 text-5xl font-bold md:text-7xl">{title}</h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                        {description}
                    </p>

                    <Link
                        href="/contact"
                        className="mt-10 inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
                    >
                        Contact Our Team
                    </Link>
                </section>
            </main>
        </>
    );
}