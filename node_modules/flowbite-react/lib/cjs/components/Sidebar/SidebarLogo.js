"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarLogo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const SidebarContext_1 = require("./SidebarContext");
const SidebarLogo = ({ children, className, href, img, imgAlt = '', theme: customTheme = {}, ...props }) => {
    const id = (0, react_1.useId)();
    const { theme: rootTheme, isCollapsed } = (0, SidebarContext_1.useSidebarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.logo, customTheme);
    return ((0, jsx_runtime_1.jsxs)("a", { "aria-labelledby": `flowbite-sidebar-logo-${id}`, href: href, className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [(0, jsx_runtime_1.jsx)("img", { alt: imgAlt, src: img, className: theme.img }), (0, jsx_runtime_1.jsx)("span", { className: theme.collapsed[isCollapsed ? 'on' : 'off'], id: `flowbite-sidebar-logo-${id}`, children: children })] }));
};
exports.SidebarLogo = SidebarLogo;
exports.SidebarLogo.displayName = 'Sidebar.Logo';
