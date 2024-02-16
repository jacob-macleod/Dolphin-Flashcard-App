'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';
export const SidebarLogo = ({ children, className, href, img, imgAlt = '', theme: customTheme = {}, ...props }) => {
    const id = useId();
    const { theme: rootTheme, isCollapsed } = useSidebarContext();
    const theme = mergeDeep(rootTheme.logo, customTheme);
    return (_jsxs("a", { "aria-labelledby": `flowbite-sidebar-logo-${id}`, href: href, className: twMerge(theme.base, className), ...props, children: [_jsx("img", { alt: imgAlt, src: img, className: theme.img }), _jsx("span", { className: theme.collapsed[isCollapsed ? 'on' : 'off'], id: `flowbite-sidebar-logo-${id}`, children: children })] }));
};
SidebarLogo.displayName = 'Sidebar.Logo';
