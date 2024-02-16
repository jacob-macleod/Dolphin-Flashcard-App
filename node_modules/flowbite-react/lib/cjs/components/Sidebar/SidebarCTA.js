"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarCTA = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const SidebarContext_1 = require("./SidebarContext");
const SidebarCTA = ({ children, color = 'info', className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isCollapsed } = (0, SidebarContext_1.useSidebarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.cta, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "sidebar-cta", hidden: isCollapsed, className: (0, tailwind_merge_1.twMerge)(theme.base, theme.color[color], className), ...props, children: children }));
};
exports.SidebarCTA = SidebarCTA;
exports.SidebarCTA.displayName = 'Sidebar.CTA';
