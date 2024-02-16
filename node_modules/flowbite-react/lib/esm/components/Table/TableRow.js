'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableContext } from './TableContext';
export const TableRow = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, hoverable, striped } = useTableContext();
    const theme = mergeDeep(rootTheme.row, customTheme);
    return (_jsx("tr", { "data-testid": "table-row-element", className: twMerge(theme.base, striped && theme.striped, hoverable && theme.hovered, className), ...props, children: children }));
};
