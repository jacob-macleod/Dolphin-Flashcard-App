import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeClientInit } from './client';
import { ThemeModeInit } from './mode';
import { ThemeServerInit } from './server';
export function ThemeInit({ mode, theme }) {
    return (_jsxs(_Fragment, { children: [_jsx(ThemeModeInit, { mode: mode }), _jsx(ThemeServerInit, { theme: theme }), _jsx(ThemeClientInit, { theme: theme })] }));
}
