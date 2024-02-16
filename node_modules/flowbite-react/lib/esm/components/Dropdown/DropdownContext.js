'use client';
import { createContext, useContext } from 'react';
export const DropdownContext = createContext(undefined);
export function useDropdownContext() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('useDropdownContext should be used within the DropdownContext provider!');
    }
    return context;
}
