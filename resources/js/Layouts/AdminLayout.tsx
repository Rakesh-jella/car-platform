import { Link, router, usePage } from '@inertiajs/react';
import { ReactNode, useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { getInitialTheme, applyTheme, setupSystemThemeListener, ThemeMode } from '@/theme';

type AdminLayoutProps = {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    actions?: ReactNode;
    hideDefaultTitle?: boolean;
};

const navItems = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
    },
    {
        label: 'Export Orders',
        href: '/admin/export-orders',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        label: 'Import Requests',
        href: '/import',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        label: 'Vehicle Inventory',
        href: '/cars',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: 'Warehouse & Stock',
        href: '/warehouse',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5v-2.2A8 8 0 0 1 4 12a8 8 0 0 1 16 0c0 3.3-2 6.2-5 7.3v2.2c4.1-1.3 7-5.1 7-9.5A10 10 0 0 0 12 2z" />
                <path d="m14 10-3 3" />
            </svg>
        ),
    },
    {
        label: 'Manufacturing',
        href: '/manufacturing',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        label: 'Customers CRM',
        href: '/admin/customers',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
    },
];

export default function AdminLayout({
    children,
    title = 'Dashboard',
    subtitle,
    actions,
    hideDefaultTitle = false,
}: AdminLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();

    // Theme state: light | dark | system
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const [selectedTab, setSelectedTab] = useState<'Rent' | 'Buy' | 'Sell'>('Rent');
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const initial = getInitialTheme();
        setThemeMode(initial);
        applyTheme(initial);

        const cleanup = setupSystemThemeListener(() => {
            // Re-render if needed
        });
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
        return url.startsWith(path);
    };

    return (
        <div className="w-full min-h-screen bg-[#f4f5f8] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-[#ffa31a] selection:text-white transition-colors duration-200 flex flex-col md:flex-row">
            
            {/* FULL-HEIGHT SLIM LEFT SIDEBAR */}
            <aside className="w-full md:w-[84px] bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col items-center py-6 px-3 shrink-0 justify-between md:sticky md:top-0 md:h-screen z-30 transition-colors">
                <div className="flex flex-col items-center w-full">
                    {/* Motive Logo Squircle */}
                    <Link
                        href="/admin"
                        className="group relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff9400] to-[#ffa826] shadow-md shadow-amber-500/25 transition hover:scale-105"
                        title="Motive Admin"
                    >
                        <span className="font-extrabold text-2xl text-white tracking-tighter">M</span>
                    </Link>

                    {/* Section Label */}
                    <p className="mt-7 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                        Menu
                    </p>

                    {/* Navigation Stack */}
                    <nav className="mt-3 flex md:flex-col items-center gap-2 w-full">
                        {navItems.map((item) => {
                            const active = isCurrent(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition duration-150 ${
                                        active
                                            ? 'bg-gray-100 dark:bg-slate-800 text-slate-950 dark:text-amber-400 shadow-sm'
                                            : 'text-gray-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60'
                                    }`}
                                    title={item.label}
                                >
                                    {item.icon}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Utility Icons */}
                <div className="flex md:flex-col items-center gap-2 w-full pt-4">
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                        title="Search"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    <Link
                        href="/profile"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                        title="Profile & Settings"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </Link>

                    <Link
                        href="/"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                        title="Website / Showroom"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </Link>
                </div>
            </aside>

            {/* FULL-SCREEN MAIN CONTENT BODY */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* TOP HEADER BAR */}
                <header className="flex items-center justify-between px-6 sm:px-10 lg:px-14 py-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 sticky top-0 z-20 shrink-0 transition-colors">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Motive
                            </h1>
                        </Link>
                        {title && !hideDefaultTitle && (
                            <span className="hidden sm:inline-flex items-center text-sm font-semibold text-gray-400 dark:text-slate-500">
                                / {title}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Segmented Tab: Rent / Buy / Sell */}
                        <div className="hidden md:flex items-center rounded-full bg-gray-100 dark:bg-slate-800 p-1 shadow-inner border border-gray-200/70 dark:border-slate-700/60">
                            {(['Rent', 'Buy', 'Sell'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setSelectedTab(tab)}
                                    className={`rounded-full px-5 py-1.5 text-xs font-bold transition duration-150 ${
                                        selectedTab === tab
                                            ? 'bg-[#ffa31a] text-white shadow-sm'
                                            : 'text-gray-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* 3-OPTION THEME SELECTOR: LIGHT / DARK / SYSTEM */}
                        <div className="flex items-center rounded-2xl bg-gray-100 dark:bg-slate-800 p-1 border border-gray-200/70 dark:border-slate-700/60 shadow-inner">
                            <button
                                type="button"
                                onClick={() => handleThemeChange('light')}
                                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                                    themeMode === 'light'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                                <span className="hidden sm:inline">Light</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleThemeChange('dark')}
                                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                                    themeMode === 'dark'
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                title="Dark Mode"
                            >
                                <svg className="h-3.5 w-3.5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                                <span className="hidden sm:inline">Dark</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleThemeChange('system')}
                                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                                    themeMode === 'system'
                                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                title="System Mode"
                            >
                                <svg className="h-3.5 w-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                                <span className="hidden sm:inline">System</span>
                            </button>
                        </div>

                        {/* Top Utility Icons */}
                        <div className="hidden lg:flex items-center gap-3 text-gray-400 dark:text-slate-400">
                            {/* Support */}
                            <button
                                type="button"
                                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
                                title="Support"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                </svg>
                            </button>

                            {/* Notifications */}
                            <button
                                type="button"
                                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition relative"
                                title="Notifications"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-[#ffa31a]" />
                            </button>
                        </div>

                        {/* User Profile Chip with Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2.5 rounded-full bg-gray-50 dark:bg-slate-800 pl-1.5 pr-3.5 py-1.5 shadow-sm border border-gray-200/80 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700/60 transition"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-xs text-white overflow-hidden shadow-inner">
                                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                    {auth?.user?.name?.split(' ')[0] || 'Admin'}
                                </span>
                                <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-2xl border border-gray-100 dark:border-slate-800 z-50">
                                    <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{auth?.user?.name || 'Administrator'}</p>
                                        <p className="text-[11px] text-gray-400 truncate">{auth?.user?.email || 'admin@carplatform.com'}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/cars"
                                        className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                                    >
                                        Live Showroom
                                    </Link>
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

                {/* MAIN EXPANSIVE CONTENT CONTAINER */}
                <main className="w-full flex-1 px-6 sm:px-10 lg:px-14 py-8">
                    {!hideDefaultTitle && (title || subtitle || actions) && (
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                {title && (
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                        {title}
                                    </h2>
                                )}
                                {subtitle && (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
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
