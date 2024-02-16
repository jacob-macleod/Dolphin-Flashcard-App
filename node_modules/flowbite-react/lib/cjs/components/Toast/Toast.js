"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ToastContext_1 = require("./ToastContext");
const ToastToggle_1 = require("./ToastToggle");
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
    const [isClosed, setIsClosed] = (0, react_1.useState)(false);
    const [isRemoved, setIsRemoved] = (0, react_1.useState)(false);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().toast, customTheme);
    if (isRemoved) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ToastContext_1.ToastContext.Provider, { value: { theme, duration, isClosed, isRemoved, setIsClosed, setIsRemoved }, children: (0, jsx_runtime_1.jsx)("div", { "data-testid": "flowbite-toast", role: "alert", className: (0, tailwind_merge_1.twMerge)(theme.root.base, durationClasses[duration], isClosed && theme.root.closed, className), ...props, children: children }) }));
};
ToastComponent.displayName = 'Toast';
ToastToggle_1.ToastToggle.displayName = 'Toast.Toggle';
exports.Toast = Object.assign(ToastComponent, {
    Toggle: ToastToggle_1.ToastToggle,
});
