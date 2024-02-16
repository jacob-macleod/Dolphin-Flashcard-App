"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarCollapse = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const NavbarContext_1 = require("./NavbarContext");
const NavbarCollapse = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isOpen } = (0, NavbarContext_1.useNavbarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.collapse, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "flowbite-navbar-collapse", className: (0, tailwind_merge_1.twMerge)(theme.base, theme.hidden[!isOpen ? 'on' : 'off'], className), ...props, children: (0, jsx_runtime_1.jsx)("ul", { className: theme.list, children: children }) }));
};
exports.NavbarCollapse = NavbarCollapse;
