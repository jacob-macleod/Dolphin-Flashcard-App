'use client';
import { createContext, useContext } from 'react';
export const TableBodyContext = createContext(undefined);
export function useTableBodyContext() {
    const context = useContext(TableBodyContext);
    if (!context) {
        throw new Error('useTableBodyContext should be used within the TableBodyContext provider!');
    }
    return context;
}
