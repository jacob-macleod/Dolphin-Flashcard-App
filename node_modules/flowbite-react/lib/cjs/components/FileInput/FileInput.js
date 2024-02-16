"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const HelperText_1 = require("../HelperText");
exports.FileInput = (0, react_1.forwardRef)(({ className, color = 'gray', helperText, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().fileInput, customTheme);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), children: (0, jsx_runtime_1.jsx)("div", { className: theme.field.base, children: (0, jsx_runtime_1.jsx)("input", { className: (0, tailwind_merge_1.twMerge)(theme.field.input.base, theme.field.input.colors[color], theme.field.input.sizes[sizing]), ...props, type: "file", ref: ref }) }) }), helperText && (0, jsx_runtime_1.jsx)(HelperText_1.HelperText, { color: color, children: helperText })] }));
});
exports.FileInput.displayName = 'FileInput';
