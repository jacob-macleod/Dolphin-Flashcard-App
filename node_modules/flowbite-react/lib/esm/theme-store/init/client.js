'use client';
import { setTheme } from '..';
export function ThemeClientInit({ theme }) {
    setTheme(theme);
    return null;
}
