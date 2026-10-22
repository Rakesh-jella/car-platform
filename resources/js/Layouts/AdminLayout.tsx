import { Link, router, usePage } from '@inertiajs/react';
import { ReactNode, useState, useEffect } from 'react';
import type { PageProps } from '@/types';
import { getInitialTheme, applyTheme, setupSystemThemeListener, ThemeMode } from '@/theme';

type AdminLayoutProps = {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    actions?: ReactNode;
    hideDefaultTitle?: boolean;
};

type NavIconName = 'dashboard' | 'warehouse' | 'export' | 'manufacturing' | 'customers' | 'cars' | 'parts';

type NavItem = {
    label: string;
    href: string;
    icon: NavIconName;
    badge?: string | number;
    badgeColor?: string;
};

type NavGroup = {
    group: string;
    items: NavItem[];
};

function NavIcon({ name, active }: { name: NavIconName; active: boolean }) {
    const colorClass = active ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-200';
    switch (name) {
        case 'dashboard':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                </svg>
            );
        case 'warehouse':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                </svg>
            );
        case 'export':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
            );
        case 'manufacturing':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <path d="M12 22v-4" />
                    <path d="m19.07 19.07-2.83-2.83" />
                    <path d="M22 12h-4" />
                    <path d="m19.07 4.93-2.83 2.83" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        case 'customers':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );
        case 'cars':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                </svg>
            );
        case 'parts':
            return (
                <svg className={`h-5 w-5 ${colorClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            );
    }
}

const navGroups: NavGroup[] = [
    {
        group: 'Main Operations',
        items: [
            { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
            {
                label: 'Warehouse & Stock',
                href: '/admin/warehouse',
                icon: 'warehouse',
                badge: 'Live',
                badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            },
            { label: 'Export Orders', href: '/admin/export-orders', icon: 'export' },
        ],
    },
    {
        group: 'Production & Customers',
        items: [
            { label: 'Manufacturing (BOM)', href: '/admin/manufacturing', icon: 'manufacturing' },
            { label: 'Customers', href: '/admin/customers', icon: 'customers' },
        ],
    },
    {
        group: 'Storefront Links',
        items: [
            { label: 'Cars Showroom', href: '/cars', icon: 'cars' },
            { label: 'Parts & Gear Shop', href: '/parts', icon: 'parts' },
        ],
    },
];

export default function AdminLayout({
    children,
    title = 'Warehouse ERP',
    subtitle,
    actions,
    hideDefaultTitle = false,
}: AdminLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const initial = getInitialTheme();
        setThemeMode(initial);
        applyTheme(initial);

        const cleanup = setupSystemThemeListener(() => {});
        return cleanup;
    }, []);

    const handleThemeChange = (mode: ThemeMode) => {
        setThemeMode(mode);
        applyTheme(mode);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const isCurrent = (path: string) => {
        if (path === '/admin') {
            return url === '/admin' || url === '/admin/';
        }
        if (path.includes('/cars')) {
            return url.includes('/cars');
        }
        if (path.includes('/parts')) {
            return url.includes('/parts');
        }
        return url.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950 transition-colors duration-200 flex flex-col md:flex-row">
            
            {/* MOBILE HEADER BAR */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
                <Link href="/admin" className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
                        <span className="font-black text-lg text-slate-950">M</span>
                    </div>
                    <div>
                        <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">MOTIVE</span>
                        <span className="ml-1 text-[10px] font-black uppercase tracking-wider text-amber-500">ERP</span>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleThemeChange(themeMode === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Toggle theme"
                    >
                        {themeMode === 'dark' ? (
                            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Open menu"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileMenuOpen ? (
                                <path d="M18 6 6 18M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* EXPANSIVE SIDEBAR (DESKTOP & MOBILE DRAWER) */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
                    mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Brand Header */}
                    <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-3 group">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition">
                                <span className="font-black text-xl text-slate-950">M</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">MOTIVE</span>
                                    <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-black text-amber-500 uppercase tracking-wider">ERP</span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium">Warehouse & Logistics</p>
                            </div>
                        </Link>
                        {mobileMenuOpen && (
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="md:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Navigation Stack */}
                    <div className="p-4 space-y-6 flex-1">
                        {navGroups.map((group) => (
                            <div key={group.group}>
                                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                                    {group.group}
                                </p>
                                <nav className="space-y-1">
                                    {group.items.map((item) => {
                                        const active = isCurrent(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                                                    active
                                                        ? 'bg-amber-400/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-400/20'
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <NavIcon name={item.icon} active={active} />
                                                    <span>{item.label}</span>
                                                </div>
                                                {item.badge && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        ))}
                    </div>

                    {/* User Profile Mini Footer */}
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-sm text-slate-950 shadow-inner shrink-0">
                                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                        {auth?.user?.name || 'Administrator'}
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">Admin Access</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                title="Log out"
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* BACKDROP FOR MOBILE */}
            {mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            {/* EXPANSIVE MAIN WRAPPER */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* MODERN TOP APP BAR */}
                <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30 transition-colors">
                    {/* Left Breadcrumb & Page Info */}
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                            <span className="text-slate-900 dark:text-white font-bold">Admin ERP</span>
                            <span>/</span>
                            <span className="text-amber-500 font-semibold">{title}</span>
                        </div>
                    </div>

                    {/* Right Toolbar */}
                    <div className="flex items-center gap-4">
                        
                        {/* Live Storefront Button */}
                        <Link
                            href="/cars"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:text-amber-500 transition shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Live Storefront</span>
                            <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </Link>

                        {/* 3-STATE THEME SELECTOR: LIGHT / DARK / SYSTEM */}
                        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
                            <button
                                type="button"
                                onClick={() => handleThemeChange('light')}
                                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                                    themeMode === 'light'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                title="Light Mode"
                            >
                                <svg className="h-3.5 w-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                </svg>
                                <span>Light</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleThemeChange('dark')}
                                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                                    themeMode === 'dark'
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                title="Dark Mode"
                            >
                                <svg className="h-3.5 w-3.5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                                <span>Dark</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleThemeChange('system')}
                                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                                    themeMode === 'system'
                                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                title="System Mode"
                            >
                                <svg className="h-3.5 w-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                                <span>System</span>
                            </button>
                        </div>

                        {/* User Profile Chip with Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2.5 rounded-full bg-slate-50 dark:bg-slate-800/80 pl-1.5 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition shadow-sm"
                            >
                                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-xs text-slate-950 shadow-inner">
                                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                    {auth?.user?.name?.split(' ')[0] || 'Admin'}
                                </span>
                                <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-2xl border border-slate-100 dark:border-slate-800 z-50">
                                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{auth?.user?.name || 'Administrator'}</p>
                                        <p className="text-[11px] text-slate-400 truncate">{auth?.user?.email || 'admin@carplatform.com'}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/admin/warehouse"
                                        className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        Stock Management
                                    </Link>
                                    <Link
                                        href="/cars"
                                        className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        Customer Showroom
                                    </Link>
                                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* MAIN PAGE CONTAINER */}
                <main className="w-full flex-1 px-4 sm:px-8 lg:px-10 py-6 max-w-[1600px] mx-auto">
                    {!hideDefaultTitle && (title || subtitle || actions) && (
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                {title && (
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                        {title}
                                    </h1>
                                )}
                                {subtitle && (
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            {actions && <div className="flex items-center gap-3">{actions}</div>}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
