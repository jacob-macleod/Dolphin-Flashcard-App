"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarBrand = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const NavbarContext_1 = require("./NavbarContext");
const NavbarBrand = ({ as: Component = 'a', children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = (0, NavbarContext_1.useNavbarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.brand, customTheme);
    return ((0, jsx_runtime_1.jsx)(Component, { className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: children }));
};
exports.NavbarBrand = NavbarBrand;
