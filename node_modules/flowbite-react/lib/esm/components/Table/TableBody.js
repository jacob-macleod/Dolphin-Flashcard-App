'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { TableBodyContext } from './TableBodyContext';
import { useTableContext } from './TableContext';
export const TableBody = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useTableContext();
    const theme = mergeDeep(rootTheme.body, customTheme);
    return (_jsx(TableBodyContext.Provider, { value: { theme }, children: _jsx("tbody", { className: twMerge(theme.base, className), ...props, children: children }) }));
};
