'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableBodyContext } from './TableBodyContext';
export const TableCell = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: bodyTheme } = useTableBodyContext();
    const theme = mergeDeep(bodyTheme.cell, customTheme);
    return (_jsx("td", { className: twMerge(theme.base, className), ...props, children: children }));
};
