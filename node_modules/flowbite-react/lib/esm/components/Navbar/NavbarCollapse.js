'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useNavbarContext } from './NavbarContext';
export const NavbarCollapse = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isOpen } = useNavbarContext();
    const theme = mergeDeep(rootTheme.collapse, customTheme);
    return (_jsx("div", { "data-testid": "flowbite-navbar-collapse", className: twMerge(theme.base, theme.hidden[!isOpen ? 'on' : 'off'], className), ...props, children: _jsx("ul", { className: theme.list, children: children }) }));
};
