'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useMergeRefs, useRole, } from '@floating-ui/react';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { ModalBody } from './ModalBody';
import { ModalContext } from './ModalContext';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
const ModalComponent = forwardRef(({ children, className, dismissible = false, onClose, popup, position = 'center', root, show, size = '2xl', theme: customTheme = {}, initialFocus, ...props }, theirRef) => {
    const [headerId, setHeaderId] = useState(undefined);
    const theme = mergeDeep(getTheme().modal, customTheme);
    const { context } = useFloating({
        open: show,
        onOpenChange: () => onClose && onClose(),
    });
    const ref = useMergeRefs([context.refs.setFloating, theirRef]);
    const click = useClick(context);
    const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown', enabled: dismissible });
    const role = useRole(context);
    const { getFloatingProps } = useInteractions([click, dismiss, role]);
    if (!show) {
        return null;
    }
    return (_jsx(ModalContext.Provider, { value: { theme, popup, onClose, setHeaderId }, children: _jsx(FloatingPortal, { root: root, children: _jsx(FloatingOverlay, { lockScroll: true, "data-testid": "modal-overlay", className: twMerge(theme.root.base, theme.root.positions[position], show ? theme.root.show.on : theme.root.show.off, className), ...props, children: _jsx(FloatingFocusManager, { context: context, initialFocus: initialFocus, children: _jsx("div", { ref: ref, ...getFloatingProps(props), "aria-labelledby": headerId, className: twMerge(theme.content.base, theme.root.sizes[size]), children: _jsx("div", { className: theme.content.inner, children: children }) }) }) }) }) }));
});
ModalComponent.displayName = 'Modal';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';
export const Modal = Object.assign(ModalComponent, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
});
