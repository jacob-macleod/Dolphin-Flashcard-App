"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const Badge_1 = require("../Badge");
const Tooltip_1 = require("../Tooltip");
const SidebarContext_1 = require("./SidebarContext");
const SidebarItemContext_1 = require("./SidebarItemContext");
const ListItem = ({ id, theme, isCollapsed, tooltipChildren, children: wrapperChildren, ...props }) => ((0, jsx_runtime_1.jsx)("li", { ...props, children: isCollapsed ? ((0, jsx_runtime_1.jsx)(Tooltip_1.Tooltip, { content: (0, jsx_runtime_1.jsx)(Children, { id: id, theme: theme, children: tooltipChildren }), placement: "right", children: wrapperChildren })) : (wrapperChildren) }));
const Children = ({ id, theme, children }) => {
    return ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-sidebar-item-content", id: `flowbite-sidebar-item-${id}`, className: (0, tailwind_merge_1.twMerge)(theme.content.base), children: children }));
};
exports.SidebarItem = (0, react_1.forwardRef)(({ active: isActive, as: Component = 'a', children, className, icon: Icon, label, labelColor = 'info', theme: customTheme = {}, ...props }, ref) => {
    const id = (0, react_1.useId)();
    const { theme: rootTheme, isCollapsed } = (0, SidebarContext_1.useSidebarContext)();
    const { isInsideCollapse } = (0, SidebarItemContext_1.useSidebarItemContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.item, customTheme);
    return ((0, jsx_runtime_1.jsx)(ListItem, { theme: theme, className: theme.listItem, id: id, isCollapsed: isCollapsed, tooltipChildren: children, children: (0, jsx_runtime_1.jsxs)(Component, { "aria-labelledby": `flowbite-sidebar-item-${id}`, ref: ref, className: (0, tailwind_merge_1.twMerge)(theme.base, isActive && theme.active, !isCollapsed && isInsideCollapse && theme.collapsed?.insideCollapse, className), ...props, children: [Icon && ((0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": true, "data-testid": "flowbite-sidebar-item-icon", className: (0, tailwind_merge_1.twMerge)(theme.icon?.base, isActive && theme.icon?.active) })), isCollapsed && !Icon && ((0, jsx_runtime_1.jsx)("span", { className: theme.collapsed?.noIcon, children: children.charAt(0).toLocaleUpperCase() ?? '?' })), !isCollapsed && ((0, jsx_runtime_1.jsx)(Children, { id: id, theme: theme, children: children })), !isCollapsed && label && ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { color: labelColor, "data-testid": "flowbite-sidebar-label", hidden: isCollapsed, className: theme.label, children: label }))] }) }));
});
exports.SidebarItem.displayName = 'Sidebar.Item';
