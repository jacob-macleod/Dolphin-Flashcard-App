'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableContext } from './TableContext';
import { TableHead } from './TableHead';
import { TableHeadCell } from './TableHeadCell';
import { TableRow } from './TableRow';
const TableComponent = ({ children, className, striped, hoverable, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().table, customTheme);
    return (_jsx("div", { "data-testid": "table-element", className: twMerge(theme.root.wrapper), children: _jsxs(TableContext.Provider, { value: { theme, striped, hoverable }, children: [_jsx("div", { className: twMerge(theme.root.shadow, className) }), _jsx("table", { className: twMerge(theme.root.base, className), ...props, children: children })] }) }));
};
TableComponent.displayName = 'Table';
TableHead.displayName = 'Table.Head';
TableBody.displayName = 'Table.Body';
TableRow.displayName = 'Table.Row';
TableCell.displayName = 'Table.Cell';
TableHeadCell.displayName = 'Table.HeadCell';
export const Table = Object.assign(TableComponent, {
    Head: TableHead,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    HeadCell: TableHeadCell,
});
