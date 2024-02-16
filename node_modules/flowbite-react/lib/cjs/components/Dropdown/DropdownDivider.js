"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownDivider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const DropdownContext_1 = require("./DropdownContext");
const DropdownDivider = ({ className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = (0, DropdownContext_1.useDropdownContext)();
    const theme = customTheme.divider ?? rootTheme.floating.divider;
    return (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme, className), ...props });
};
exports.DropdownDivider = DropdownDivider;
