'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { Tooltip } from '../Tooltip';
import { useSidebarContext } from './SidebarContext';
import { SidebarItemContext } from './SidebarItemContext';
export const SidebarCollapse = ({ children, className, icon: Icon, label, chevronIcon: ChevronIcon = HiChevronDown, renderChevronIcon, open = false, theme: customTheme = {}, ...props }) => {
    const id = useId();
    const [isOpen, setOpen] = useState(open);
    const { theme: rootTheme, isCollapsed } = useSidebarContext();
    const theme = mergeDeep(rootTheme.collapse, customTheme);
    useEffect(() => setOpen(open), [open]);
    const Wrapper = ({ children }) => (_jsx("li", { children: isCollapsed && !isOpen ? (_jsx(Tooltip, { content: label, placement: "right", children: children })) : (children) }));
    return (_jsxs(Wrapper, { children: [_jsxs("button", { id: `flowbite-sidebar-collapse-${id}`, onClick: () => setOpen(!isOpen), title: label, type: "button", className: twMerge(theme.button, className), ...props, children: [Icon && (_jsx(Icon, { "aria-hidden": true, "data-testid": "flowbite-sidebar-collapse-icon", className: twMerge(theme.icon.base, theme.icon.open[isOpen ? 'on' : 'off']) })), isCollapsed ? (_jsx("span", { className: "sr-only", children: label })) : (_jsxs(_Fragment, { children: [_jsx("span", { "data-testid": "flowbite-sidebar-collapse-label", className: theme.label.base, children: label }), renderChevronIcon ? (renderChevronIcon(theme, isOpen)) : (_jsx(ChevronIcon, { "aria-hidden": true, className: twMerge(theme.label.icon.base, theme.label.icon.open[isOpen ? 'on' : 'off']) }))] }))] }), _jsx("ul", { "aria-labelledby": `flowbite-sidebar-collapse-${id}`, hidden: !isOpen, className: theme.list, children: _jsx(SidebarItemContext.Provider, { value: { isInsideCollapse: true }, children: children }) })] }));
};
SidebarCollapse.displayName = 'Sidebar.Collapse';
