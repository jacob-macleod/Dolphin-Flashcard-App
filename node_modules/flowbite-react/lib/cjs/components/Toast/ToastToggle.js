"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const ToastContext_1 = require("./ToastContext");
const ToastToggle = ({ className, onClick, theme: customTheme = {}, xIcon: XIcon = hi_1.HiX, onDismiss, ...props }) => {
    const { theme: rootTheme, duration, isClosed, isRemoved, setIsClosed, setIsRemoved } = (0, ToastContext_1.useToastContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.toggle, customTheme);
    const handleClick = (e) => {
        if (onClick)
            onClick(e);
        if (onDismiss) {
            onDismiss();
            return;
        }
        setIsClosed(!isClosed);
        setTimeout(() => setIsRemoved(!isRemoved), duration);
    };
    return ((0, jsx_runtime_1.jsx)("button", { "aria-label": "Close", onClick: handleClick, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: (0, jsx_runtime_1.jsx)(XIcon, { "aria-hidden": true, className: theme.icon }) }));
};
exports.ToastToggle = ToastToggle;
