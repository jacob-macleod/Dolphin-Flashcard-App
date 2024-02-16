"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Alert = ({ additionalContent, children, className, color = 'info', icon: Icon, onDismiss, rounded = true, theme: customTheme = {}, withBorderAccent, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().alert, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, theme.color[color], rounded && theme.rounded, withBorderAccent && theme.borderAccent, className), role: "alert", ...props, children: [(0, jsx_runtime_1.jsxs)("div", { className: theme.wrapper, "data-testid": "flowbite-alert-wrapper", children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { className: theme.icon, "data-testid": "flowbite-alert-icon" }), (0, jsx_runtime_1.jsx)("div", { children: children }), typeof onDismiss === 'function' && ((0, jsx_runtime_1.jsx)("button", { "aria-label": "Dismiss", className: (0, tailwind_merge_1.twMerge)(theme.closeButton.base, theme.closeButton.color[color]), onClick: onDismiss, type: "button", children: (0, jsx_runtime_1.jsx)(hi_1.HiX, { "aria-hidden": true, className: theme.closeButton.icon }) }))] }), additionalContent && (0, jsx_runtime_1.jsx)("div", { children: additionalContent })] }));
};
exports.Alert = Alert;
exports.Alert.displayName = 'Alert';
