'use client';
import { createContext, useContext } from 'react';
export const TableHeadContext = createContext(undefined);
export function useTableHeadContext() {
    const context = useContext(TableHeadContext);
    if (!context) {
        throw new Error('useTableHeadContext should be used within the TableHeadContext provider!');
    }
    return context;
}
