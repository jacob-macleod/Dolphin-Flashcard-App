"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const DropdownContext_1 = require("./DropdownContext");
const DropdownDivider_1 = require("./DropdownDivider");
const DropdownHeader = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = (0, DropdownContext_1.useDropdownContext)();
    const theme = customTheme.header ?? rootTheme.floating.header;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme, className), ...props, children: children }), (0, jsx_runtime_1.jsx)(DropdownDivider_1.DropdownDivider, {})] }));
};
exports.DropdownHeader = DropdownHeader;
