import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type PublicLayoutProps = {
    children: ReactNode;
};

const links = [
    { label: 'Vehicles', href: '/cars' },
    { label: 'Import', href: '/import' },
    { label: 'Export', href: '/export' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'Contact', href: '/contact' },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-950/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/" className="text-xl font-bold tracking-wide">
                        CAR<span className="text-amber-400">PLATFORM</span>
                    </Link>

                    <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
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

                    <Link
                        href="/login"
                        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
                    >
                        Admin Login
                    </Link>
                </div>
            </header>

            {children}

            <footer className="border-t border-slate-800 bg-slate-900 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Car Platform. Import, export and manufacturing.</p>
                    <p>Business management platform for the vehicle lifecycle.</p>
                </div>
            </footer>
        </main>
    );
}
