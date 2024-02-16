"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const HelperText_1 = require("../HelperText");
exports.Select = (0, react_1.forwardRef)(({ addon, children, className, color = 'gray', helperText, icon: Icon, shadow, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().select, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), children: [addon && (0, jsx_runtime_1.jsx)("span", { className: theme.addon, children: addon }), (0, jsx_runtime_1.jsxs)("div", { className: theme.field.base, children: [Icon && ((0, jsx_runtime_1.jsx)("div", { className: theme.field.icon.base, children: (0, jsx_runtime_1.jsx)(Icon, { className: theme.field.icon.svg }) })), (0, jsx_runtime_1.jsx)("select", { className: (0, tailwind_merge_1.twMerge)(theme.field.select.base, theme.field.select.colors[color], theme.field.select.sizes[sizing], theme.field.select.withIcon[Icon ? 'on' : 'off'], theme.field.select.withAddon[addon ? 'on' : 'off'], theme.field.select.withShadow[shadow ? 'on' : 'off']), ...props, ref: ref, children: children }), helperText && (0, jsx_runtime_1.jsx)(HelperText_1.HelperText, { color: color, children: helperText })] })] }));
});
exports.Select.displayName = 'Select';
