export type ThemeMode = 'light' | 'dark' | 'system';

export function getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('motive_theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }
    return 'light';
}

export function applyTheme(mode: ThemeMode) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('motive_theme', mode);
    } catch {
        // ignore storage errors
    }

    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = mode === 'dark' || (mode === 'system' && prefersDark);

    if (shouldBeDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

export function setupSystemThemeListener(onSystemChange: (isDark: boolean) => void) {
    if (typeof window === 'undefined') return () => {};
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
        const currentMode = localStorage.getItem('motive_theme') as ThemeMode;
        if (currentMode === 'system') {
            applyTheme('system');
            onSystemChange(e.matches);
        }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
}
