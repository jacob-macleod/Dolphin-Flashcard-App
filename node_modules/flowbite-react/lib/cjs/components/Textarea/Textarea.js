"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const HelperText_1 = require("../HelperText");
exports.Textarea = (0, react_1.forwardRef)(({ className, color = 'gray', helperText, shadow, theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().textarea, customTheme);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("textarea", { ref: ref, className: (0, tailwind_merge_1.twMerge)(theme.base, theme.colors[color], theme.withShadow[shadow ? 'on' : 'off'], className), ...props }), helperText && (0, jsx_runtime_1.jsx)(HelperText_1.HelperText, { color: color, children: helperText })] }));
});
exports.Textarea.displayName = 'Textarea';
