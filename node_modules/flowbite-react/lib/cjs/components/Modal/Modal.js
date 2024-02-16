"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@floating-ui/react");
const react_2 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ModalBody_1 = require("./ModalBody");
const ModalContext_1 = require("./ModalContext");
const ModalFooter_1 = require("./ModalFooter");
const ModalHeader_1 = require("./ModalHeader");
const ModalComponent = (0, react_2.forwardRef)(({ children, className, dismissible = false, onClose, popup, position = 'center', root, show, size = '2xl', theme: customTheme = {}, initialFocus, ...props }, theirRef) => {
    const [headerId, setHeaderId] = (0, react_2.useState)(undefined);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().modal, customTheme);
    const { context } = (0, react_1.useFloating)({
        open: show,
        onOpenChange: () => onClose && onClose(),
    });
    const ref = (0, react_1.useMergeRefs)([context.refs.setFloating, theirRef]);
    const click = (0, react_1.useClick)(context);
    const dismiss = (0, react_1.useDismiss)(context, { outsidePressEvent: 'mousedown', enabled: dismissible });
    const role = (0, react_1.useRole)(context);
    const { getFloatingProps } = (0, react_1.useInteractions)([click, dismiss, role]);
    if (!show) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ModalContext_1.ModalContext.Provider, { value: { theme, popup, onClose, setHeaderId }, children: (0, jsx_runtime_1.jsx)(react_1.FloatingPortal, { root: root, children: (0, jsx_runtime_1.jsx)(react_1.FloatingOverlay, { lockScroll: true, "data-testid": "modal-overlay", className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.positions[position], show ? theme.root.show.on : theme.root.show.off, className), ...props, children: (0, jsx_runtime_1.jsx)(react_1.FloatingFocusManager, { context: context, initialFocus: initialFocus, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, ...getFloatingProps(props), "aria-labelledby": headerId, className: (0, tailwind_merge_1.twMerge)(theme.content.base, theme.root.sizes[size]), children: (0, jsx_runtime_1.jsx)("div", { className: theme.content.inner, children: children }) }) }) }) }) }));
});
ModalComponent.displayName = 'Modal';
ModalHeader_1.ModalHeader.displayName = 'Modal.Header';
ModalBody_1.ModalBody.displayName = 'Modal.Body';
ModalFooter_1.ModalFooter.displayName = 'Modal.Footer';
exports.Modal = Object.assign(ModalComponent, {
    Header: ModalHeader_1.ModalHeader,
    Body: ModalBody_1.ModalBody,
    Footer: ModalFooter_1.ModalFooter,
});
