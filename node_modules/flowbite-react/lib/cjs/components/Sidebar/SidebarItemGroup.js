"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItemGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const SidebarContext_1 = require("./SidebarContext");
const SidebarItemContext_1 = require("./SidebarItemContext");
const SidebarItemGroup = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = (0, SidebarContext_1.useSidebarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.itemGroup, customTheme);
    return ((0, jsx_runtime_1.jsx)("ul", { "data-testid": "flowbite-sidebar-item-group", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: (0, jsx_runtime_1.jsx)(SidebarItemContext_1.SidebarItemContext.Provider, { value: { isInsideCollapse: false }, children: children }) }));
};
exports.SidebarItemGroup = SidebarItemGroup;
exports.SidebarItemGroup.displayName = 'Sidebar.ItemGroup';
