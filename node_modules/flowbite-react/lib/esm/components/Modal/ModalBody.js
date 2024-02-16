'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useModalContext } from './ModalContext';
export const ModalBody = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, popup } = useModalContext();
    const theme = mergeDeep(rootTheme.body, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, popup && [theme.popup], className), ...props, children: children }));
};
