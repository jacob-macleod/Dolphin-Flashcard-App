"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const fa_1 = require("react-icons/fa");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const NavbarContext_1 = require("./NavbarContext");
const NavbarToggle = ({ barIcon: BarIcon = fa_1.FaBars, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isOpen, setIsOpen } = (0, NavbarContext_1.useNavbarContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.toggle, customTheme);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return ((0, jsx_runtime_1.jsxs)("button", { "data-testid": "flowbite-navbar-toggle", onClick: handleClick, className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Open main menu" }), (0, jsx_runtime_1.jsx)(BarIcon, { "aria-hidden": true, className: theme.icon })] }));
};
exports.NavbarToggle = NavbarToggle;
