"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const TableBody_1 = require("./TableBody");
const TableCell_1 = require("./TableCell");
const TableContext_1 = require("./TableContext");
const TableHead_1 = require("./TableHead");
const TableHeadCell_1 = require("./TableHeadCell");
const TableRow_1 = require("./TableRow");
const TableComponent = ({ children, className, striped, hoverable, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().table, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "table-element", className: (0, tailwind_merge_1.twMerge)(theme.root.wrapper), children: (0, jsx_runtime_1.jsxs)(TableContext_1.TableContext.Provider, { value: { theme, striped, hoverable }, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.shadow, className) }), (0, jsx_runtime_1.jsx)("table", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), ...props, children: children })] }) }));
};
TableComponent.displayName = 'Table';
TableHead_1.TableHead.displayName = 'Table.Head';
TableBody_1.TableBody.displayName = 'Table.Body';
TableRow_1.TableRow.displayName = 'Table.Row';
TableCell_1.TableCell.displayName = 'Table.Cell';
TableHeadCell_1.TableHeadCell.displayName = 'Table.HeadCell';
exports.Table = Object.assign(TableComponent, {
    Head: TableHead_1.TableHead,
    Body: TableBody_1.TableBody,
    Row: TableRow_1.TableRow,
    Cell: TableCell_1.TableCell,
    HeadCell: TableHeadCell_1.TableHeadCell,
});
