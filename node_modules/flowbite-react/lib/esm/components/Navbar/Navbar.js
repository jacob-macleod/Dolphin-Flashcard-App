'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { NavbarBrand } from './NavbarBrand';
import { NavbarCollapse } from './NavbarCollapse';
import { NavbarContext } from './NavbarContext';
import { NavbarLink } from './NavbarLink';
import { NavbarToggle } from './NavbarToggle';
const NavbarComponent = ({ border, children, className, fluid = false, menuOpen, rounded, theme: customTheme = {}, ...props }) => {
    const [isOpen, setIsOpen] = useState(menuOpen);
    const theme = mergeDeep(getTheme().navbar, customTheme);
    return (_jsx(NavbarContext.Provider, { value: { theme, isOpen, setIsOpen }, children: _jsx("nav", { className: twMerge(theme.root.base, theme.root.bordered[border ? 'on' : 'off'], theme.root.rounded[rounded ? 'on' : 'off'], className), ...props, children: _jsx("div", { className: twMerge(theme.root.inner.base, theme.root.inner.fluid[fluid ? 'on' : 'off']), children: children }) }) }));
};
NavbarComponent.displayName = 'Navbar';
NavbarBrand.displayName = 'Navbar.Brand';
NavbarCollapse.displayName = 'Navbar.Collapse';
NavbarLink.displayName = 'Navbar.Link';
NavbarToggle.displayName = 'Navbar.Toggle';
export const Navbar = Object.assign(NavbarComponent, {
    Brand: NavbarBrand,
    Collapse: NavbarCollapse,
    Link: NavbarLink,
    Toggle: NavbarToggle,
});
