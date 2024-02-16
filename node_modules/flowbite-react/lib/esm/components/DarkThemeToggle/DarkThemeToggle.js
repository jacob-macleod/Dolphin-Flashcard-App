'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiMoon, HiSun } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { useIsMounted } from '../../hooks/use-is-mounted';
import { mergeDeep } from '../../helpers/merge-deep';
import { useThemeMode } from '../../hooks/use-theme-mode';
import { getTheme } from '../../theme-store';
export const DarkThemeToggle = ({ className, theme: customTheme = {}, iconDark: IconDark = HiSun, iconLight: IconLight = HiMoon, ...props }) => {
    const isMounted = useIsMounted();
    const { computedMode, toggleMode } = useThemeMode();
    const theme = mergeDeep(getTheme().darkThemeToggle, customTheme);
    return (_jsxs("button", { type: "button", "aria-label": "Toggle dark mode", "data-testid": "dark-theme-toggle", className: twMerge(theme.root.base, className), onClick: toggleMode, ...props, children: [_jsx(IconDark, { "aria-label": "Currently dark mode", "data-active": isMounted && computedMode === 'dark', className: twMerge(theme.root.icon, 'hidden dark:block') }), _jsx(IconLight, { "aria-label": "Currently light mode", "data-active": isMounted && computedMode === 'light', className: twMerge(theme.root.icon, 'dark:hidden') })] }));
};
DarkThemeToggle.displayName = 'DarkThemeToggle';
