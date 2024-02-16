'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';
import { SidebarItemContext } from './SidebarItemContext';
export const SidebarItemGroup = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useSidebarContext();
    const theme = mergeDeep(rootTheme.itemGroup, customTheme);
    return (_jsx("ul", { "data-testid": "flowbite-sidebar-item-group", className: twMerge(theme.base, className), ...props, children: _jsx(SidebarItemContext.Provider, { value: { isInsideCollapse: false }, children: children }) }));
};
SidebarItemGroup.displayName = 'Sidebar.ItemGroup';
