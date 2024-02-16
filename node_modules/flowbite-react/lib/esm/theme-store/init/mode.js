'use client';
import { setThemeMode } from '..';
import { useThemeMode } from '../../hooks/use-theme-mode';
export function ThemeModeInit({ mode }) {
    if (mode)
        setThemeMode(mode);
    useThemeMode();
    return null;
}
