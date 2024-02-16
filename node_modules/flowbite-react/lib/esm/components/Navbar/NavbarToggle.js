'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaBars } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useNavbarContext } from './NavbarContext';
export const NavbarToggle = ({ barIcon: BarIcon = FaBars, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, isOpen, setIsOpen } = useNavbarContext();
    const theme = mergeDeep(rootTheme.toggle, customTheme);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (_jsxs("button", { "data-testid": "flowbite-navbar-toggle", onClick: handleClick, className: twMerge(theme.base, className), ...props, children: [_jsx("span", { className: "sr-only", children: "Open main menu" }), _jsx(BarIcon, { "aria-hidden": true, className: theme.icon })] }));
};
