'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useNavbarContext } from './NavbarContext';
export const NavbarLink = ({ active, as: Component = 'a', disabled, children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useNavbarContext();
    const theme = mergeDeep(rootTheme.link, customTheme);
    return (_jsx("li", { children: _jsx(Component, { className: twMerge(theme.base, active && theme.active.on, !active && !disabled && theme.active.off, theme.disabled[disabled ? 'on' : 'off'], className), ...props, children: children }) }));
};
