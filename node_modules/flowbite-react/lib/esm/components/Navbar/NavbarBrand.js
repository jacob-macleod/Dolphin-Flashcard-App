'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useNavbarContext } from './NavbarContext';
export const NavbarBrand = ({ as: Component = 'a', children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useNavbarContext();
    const theme = mergeDeep(rootTheme.brand, customTheme);
    return (_jsx(Component, { className: twMerge(theme.base, className), ...props, children: children }));
};
