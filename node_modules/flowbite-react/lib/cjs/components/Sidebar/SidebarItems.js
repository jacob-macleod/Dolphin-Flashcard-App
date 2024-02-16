"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItems = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const SidebarContext_1 = require("./SidebarContext");
const SidebarItems = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = (0, SidebarContext_1.useSidebarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.items, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), "data-testid": "flowbite-sidebar-items", ...props, children: children }));
};
exports.SidebarItems = SidebarItems;
exports.SidebarItems.displayName = 'Sidebar.Items';
