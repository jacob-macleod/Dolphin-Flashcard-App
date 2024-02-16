'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTableContext } from './TableContext';
import { TableHeadContext } from './TableHeadContext';
export const TableHead = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme } = useTableContext();
    const theme = mergeDeep(rootTheme.head, customTheme);
    return (_jsx(TableHeadContext.Provider, { value: { theme }, children: _jsx("thead", { className: twMerge(theme.base, className), ...props, children: _jsx("tr", { children: children }) }) }));
};
