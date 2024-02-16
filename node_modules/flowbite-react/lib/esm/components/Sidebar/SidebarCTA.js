'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';
export const SidebarCTA = ({ children, color = 'info', className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isCollapsed } = useSidebarContext();
    const theme = mergeDeep(rootTheme.cta, customTheme);
    return (_jsx("div", { "data-testid": "sidebar-cta", hidden: isCollapsed, className: twMerge(theme.base, theme.color[color], className), ...props, children: children }));
};
SidebarCTA.displayName = 'Sidebar.CTA';
