"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const ModalContext_1 = require("./ModalContext");
const ModalHeader = ({ as: Component = 'h3', children, className, theme: customTheme = {}, id, ...props }) => {
    const innerHeaderId = (0, react_1.useId)();
    const headerId = id || innerHeaderId;
    const { theme: rootTheme, popup, onClose, setHeaderId } = (0, ModalContext_1.useModalContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.header, customTheme);
    (0, react_1.useLayoutEffect)(() => {
        setHeaderId(headerId);
        return () => setHeaderId(undefined);
    }, [headerId, setHeaderId]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, popup && theme.popup, className), ...props, children: [(0, jsx_runtime_1.jsx)(Component, { id: headerId, className: theme.title, children: children }), (0, jsx_runtime_1.jsx)("button", { "aria-label": "Close", className: theme.close.base, type: "button", onClick: onClose, children: (0, jsx_runtime_1.jsx)(hi_1.HiOutlineX, { "aria-hidden": true, className: theme.close.icon }) })] }));
};
exports.ModalHeader = ModalHeader;
