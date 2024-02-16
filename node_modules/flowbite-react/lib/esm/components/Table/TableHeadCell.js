'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableHeadContext } from './TableHeadContext';
export const TableHeadCell = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: headTheme } = useTableHeadContext();
    const theme = mergeDeep(headTheme.cell, customTheme);
    return (_jsx("th", { className: twMerge(theme.base, className), ...props, children: children }));
};
