'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';
export const SidebarItems = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useSidebarContext();
    const theme = mergeDeep(rootTheme.items, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, className), "data-testid": "flowbite-sidebar-items", ...props, children: children }));
};
SidebarItems.displayName = 'Sidebar.Items';
