"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TableContext_1 = require("./TableContext");
const TableRow = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, hoverable, striped } = (0, TableContext_1.useTableContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.row, customTheme);
    return ((0, jsx_runtime_1.jsx)("tr", { "data-testid": "table-row-element", className: (0, tailwind_merge_1.twMerge)(theme.base, striped && theme.striped, hoverable && theme.hovered, className), ...props, children: children }));
};
exports.TableRow = TableRow;
