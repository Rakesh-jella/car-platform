import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import type { PageProps } from '@/types';

type PublicLayoutProps = {
    children: ReactNode;
};

const links = [
    { label: 'Cars for sale', href: '/cars?type=sale' },
    { label: 'Cars for rent', href: '/cars?type=rental' },
    { label: 'Parts & gear', href: '/parts' },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-950/95">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <Link href="/" className="text-xl font-bold tracking-wide">
                        MOTIVE<span className="text-amber-400"> MARKET</span>
                    </Link>

                    <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300 md:gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-amber-400"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 text-sm font-semibold">
                        {auth.user ? (
                            <Link href="/my-orders" className="text-slate-200 hover:text-amber-400">My orders</Link>
                        ) : (
                            <>
                                <Link href="/login" className="text-slate-200 hover:text-amber-400">Sign in</Link>
                                <Link href="/register" className="rounded-lg bg-amber-400 px-4 py-2 text-slate-950 hover:bg-amber-300">Create account</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {children}

            <footer className="border-t border-slate-800 bg-slate-900 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Motive Market. Cars, parts and performance gear.</p>
                    <p>Find it. Book it. Drive it.</p>
                </div>
            </footer>
        </main>
    );
}
