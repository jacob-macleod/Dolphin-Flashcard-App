'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { Badge } from '../Badge';
import { Tooltip } from '../Tooltip';
import { useSidebarContext } from './SidebarContext';
import { useSidebarItemContext } from './SidebarItemContext';
const ListItem = ({ id, theme, isCollapsed, tooltipChildren, children: wrapperChildren, ...props }) => (_jsx("li", { ...props, children: isCollapsed ? (_jsx(Tooltip, { content: _jsx(Children, { id: id, theme: theme, children: tooltipChildren }), placement: "right", children: wrapperChildren })) : (wrapperChildren) }));
const Children = ({ id, theme, children }) => {
    return (_jsx("span", { "data-testid": "flowbite-sidebar-item-content", id: `flowbite-sidebar-item-${id}`, className: twMerge(theme.content.base), children: children }));
};
export const SidebarItem = forwardRef(({ active: isActive, as: Component = 'a', children, className, icon: Icon, label, labelColor = 'info', theme: customTheme = {}, ...props }, ref) => {
    const id = useId();
    const { theme: rootTheme, isCollapsed } = useSidebarContext();
    const { isInsideCollapse } = useSidebarItemContext();
    const theme = mergeDeep(rootTheme.item, customTheme);
    return (_jsx(ListItem, { theme: theme, className: theme.listItem, id: id, isCollapsed: isCollapsed, tooltipChildren: children, children: _jsxs(Component, { "aria-labelledby": `flowbite-sidebar-item-${id}`, ref: ref, className: twMerge(theme.base, isActive && theme.active, !isCollapsed && isInsideCollapse && theme.collapsed?.insideCollapse, className), ...props, children: [Icon && (_jsx(Icon, { "aria-hidden": true, "data-testid": "flowbite-sidebar-item-icon", className: twMerge(theme.icon?.base, isActive && theme.icon?.active) })), isCollapsed && !Icon && (_jsx("span", { className: theme.collapsed?.noIcon, children: children.charAt(0).toLocaleUpperCase() ?? '?' })), !isCollapsed && (_jsx(Children, { id: id, theme: theme, children: children })), !isCollapsed && label && (_jsx(Badge, { color: labelColor, "data-testid": "flowbite-sidebar-label", hidden: isCollapsed, className: theme.label, children: label }))] }) }));
});
SidebarItem.displayName = 'Sidebar.Item';
