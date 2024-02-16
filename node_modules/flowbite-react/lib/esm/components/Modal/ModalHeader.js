'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useLayoutEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useModalContext } from './ModalContext';
export const ModalHeader = ({ as: Component = 'h3', children, className, theme: customTheme = {}, id, ...props }) => {
    const innerHeaderId = useId();
    const headerId = id || innerHeaderId;
    const { theme: rootTheme, popup, onClose, setHeaderId } = useModalContext();
    const theme = mergeDeep(rootTheme.header, customTheme);
    useLayoutEffect(() => {
        setHeaderId(headerId);
        return () => setHeaderId(undefined);
    }, [headerId, setHeaderId]);
    return (_jsxs("div", { className: twMerge(theme.base, popup && theme.popup, className), ...props, children: [_jsx(Component, { id: headerId, className: theme.title, children: children }), _jsx("button", { "aria-label": "Close", className: theme.close.base, type: "button", onClick: onClose, children: _jsx(HiOutlineX, { "aria-hidden": true, className: theme.close.icon }) })] }));
};
