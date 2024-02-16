"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const NavbarBrand_1 = require("./NavbarBrand");
const NavbarCollapse_1 = require("./NavbarCollapse");
const NavbarContext_1 = require("./NavbarContext");
const NavbarLink_1 = require("./NavbarLink");
const NavbarToggle_1 = require("./NavbarToggle");
const NavbarComponent = ({ border, children, className, fluid = false, menuOpen, rounded, theme: customTheme = {}, ...props }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(menuOpen);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().navbar, customTheme);
    return ((0, jsx_runtime_1.jsx)(NavbarContext_1.NavbarContext.Provider, { value: { theme, isOpen, setIsOpen }, children: (0, jsx_runtime_1.jsx)("nav", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.bordered[border ? 'on' : 'off'], theme.root.rounded[rounded ? 'on' : 'off'], className), ...props, children: (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.inner.base, theme.root.inner.fluid[fluid ? 'on' : 'off']), children: children }) }) }));
};
NavbarComponent.displayName = 'Navbar';
NavbarBrand_1.NavbarBrand.displayName = 'Navbar.Brand';
NavbarCollapse_1.NavbarCollapse.displayName = 'Navbar.Collapse';
NavbarLink_1.NavbarLink.displayName = 'Navbar.Link';
NavbarToggle_1.NavbarToggle.displayName = 'Navbar.Toggle';
exports.Navbar = Object.assign(NavbarComponent, {
    Brand: NavbarBrand_1.NavbarBrand,
    Collapse: NavbarCollapse_1.NavbarCollapse,
    Link: NavbarLink_1.NavbarLink,
    Toggle: NavbarToggle_1.NavbarToggle,
});
