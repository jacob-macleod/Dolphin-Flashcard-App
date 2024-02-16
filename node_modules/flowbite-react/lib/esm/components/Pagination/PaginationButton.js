import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const PaginationButton = ({ active, children, className, onClick, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().pagination, customTheme);
    return (_jsx("button", { type: "button", className: twMerge(active && theme.pages.selector.active, className), onClick: onClick, ...props, children: children }));
};
PaginationButton.displayName = 'Pagination.Button';
export const PaginationNavigation = ({ children, className, onClick, theme: customTheme = {}, disabled = false, ...props }) => {
    const theme = mergeDeep(getTheme().pagination, customTheme);
    return (_jsx("button", { type: "button", className: twMerge(disabled && theme.pages.selector.disabled, className), disabled: disabled, onClick: onClick, ...props, children: children }));
};
PaginationNavigation.displayName = 'Pagination.Navigation';
