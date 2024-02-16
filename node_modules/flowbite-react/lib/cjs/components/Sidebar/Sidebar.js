"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const SidebarCTA_1 = require("./SidebarCTA");
const SidebarCollapse_1 = require("./SidebarCollapse");
const SidebarContext_1 = require("./SidebarContext");
const SidebarItem_1 = require("./SidebarItem");
const SidebarItemGroup_1 = require("./SidebarItemGroup");
const SidebarItems_1 = require("./SidebarItems");
const SidebarLogo_1 = require("./SidebarLogo");
const SidebarComponent = ({ children, as: Component = 'nav', collapseBehavior = 'collapse', collapsed: isCollapsed = false, theme: customTheme = {}, className, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().sidebar, customTheme);
    return ((0, jsx_runtime_1.jsx)(SidebarContext_1.SidebarContext.Provider, { value: { theme, isCollapsed }, children: (0, jsx_runtime_1.jsx)(Component, { "aria-label": "Sidebar", hidden: isCollapsed && collapseBehavior === 'hide', className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.collapsed[isCollapsed ? 'on' : 'off'], className), ...props, children: (0, jsx_runtime_1.jsx)("div", { className: theme.root.inner, children: children }) }) }));
};
SidebarComponent.displayName = 'Sidebar';
exports.Sidebar = Object.assign(SidebarComponent, {
    Collapse: SidebarCollapse_1.SidebarCollapse,
    CTA: SidebarCTA_1.SidebarCTA,
    Item: SidebarItem_1.SidebarItem,
    Items: SidebarItems_1.SidebarItems,
    ItemGroup: SidebarItemGroup_1.SidebarItemGroup,
    Logo: SidebarLogo_1.SidebarLogo,
});
