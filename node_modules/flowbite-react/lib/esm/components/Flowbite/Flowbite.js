import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeInit } from '../../theme-store/init';
export const Flowbite = ({ children, theme }) => {
    return (_jsxs(_Fragment, { children: [_jsx(ThemeInit, { mode: theme?.mode, theme: theme?.theme }), children] }));
};
Flowbite.displayName = 'Flowbite';
