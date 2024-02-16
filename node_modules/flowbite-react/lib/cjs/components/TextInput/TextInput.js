"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const HelperText_1 = require("../HelperText");
exports.TextInput = (0, react_1.forwardRef)(({ addon, className, color = 'gray', helperText, icon: Icon, rightIcon: RightIcon, shadow, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().textInput, customTheme);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), children: [addon && (0, jsx_runtime_1.jsx)("span", { className: theme.addon, children: addon }), (0, jsx_runtime_1.jsxs)("div", { className: theme.field.base, children: [Icon && ((0, jsx_runtime_1.jsx)("div", { className: theme.field.icon.base, children: (0, jsx_runtime_1.jsx)(Icon, { className: theme.field.icon.svg }) })), RightIcon && ((0, jsx_runtime_1.jsx)("div", { "data-testid": "right-icon", className: theme.field.rightIcon.base, children: (0, jsx_runtime_1.jsx)(RightIcon, { className: theme.field.rightIcon.svg }) })), (0, jsx_runtime_1.jsx)("input", { className: (0, tailwind_merge_1.twMerge)(theme.field.input.base, theme.field.input.colors[color], theme.field.input.sizes[sizing], theme.field.input.withIcon[Icon ? 'on' : 'off'], theme.field.input.withRightIcon[RightIcon ? 'on' : 'off'], theme.field.input.withAddon[addon ? 'on' : 'off'], theme.field.input.withShadow[shadow ? 'on' : 'off']), ...props, ref: ref })] })] }), helperText && (0, jsx_runtime_1.jsx)(HelperText_1.HelperText, { color: color, children: helperText })] }));
});
exports.TextInput.displayName = 'TextInput';
