'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { ToastContext } from './ToastContext';
import { ToastToggle } from './ToastToggle';
const durationClasses = {
    75: 'duration-75',
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    500: 'duration-500',
    700: 'duration-700',
    1000: 'duration-1000',
};
const ToastComponent = ({ children, className, duration = 300, theme: customTheme = {}, ...props }) => {
    const [isClosed, setIsClosed] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const theme = mergeDeep(getTheme().toast, customTheme);
    if (isRemoved) {
        return null;
    }
    return (_jsx(ToastContext.Provider, { value: { theme, duration, isClosed, isRemoved, setIsClosed, setIsRemoved }, children: _jsx("div", { "data-testid": "flowbite-toast", role: "alert", className: twMerge(theme.root.base, durationClasses[duration], isClosed && theme.root.closed, className), ...props, children: children }) }));
};
ToastComponent.displayName = 'Toast';
ToastToggle.displayName = 'Toast.Toggle';
export const Toast = Object.assign(ToastComponent, {
    Toggle: ToastToggle,
});
