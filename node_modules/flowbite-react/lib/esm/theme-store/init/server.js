import { setTheme } from '..';
export function ThemeServerInit({ theme }) {
    setTheme(theme);
    return null;
}
