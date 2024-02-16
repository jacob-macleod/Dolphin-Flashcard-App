'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { useDropdownContext } from './DropdownContext';
import { DropdownDivider } from './DropdownDivider';
export const DropdownHeader = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useDropdownContext();
    const theme = customTheme.header ?? rootTheme.floating.header;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: twMerge(theme, className), ...props, children: children }), _jsx(DropdownDivider, {})] }));
};
