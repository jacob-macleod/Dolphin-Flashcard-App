"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationNavigation = exports.PaginationButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const PaginationButton = ({ active, children, className, onClick, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().pagination, customTheme);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(active && theme.pages.selector.active, className), onClick: onClick, ...props, children: children }));
};
exports.PaginationButton = PaginationButton;
exports.PaginationButton.displayName = 'Pagination.Button';
const PaginationNavigation = ({ children, className, onClick, theme: customTheme = {}, disabled = false, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().pagination, customTheme);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(disabled && theme.pages.selector.disabled, className), disabled: disabled, onClick: onClick, ...props, children: children }));
};
exports.PaginationNavigation = PaginationNavigation;
exports.PaginationNavigation.displayName = 'Pagination.Navigation';
