'use client';
import { createContext, useContext } from 'react';
export const DatepickerContext = createContext(undefined);
export function useDatePickerContext() {
    const context = useContext(DatepickerContext);
    if (!context) {
        throw new Error('useDatePickerContext should be used within the DatePickerContext provider!');
    }
    return context;
}
