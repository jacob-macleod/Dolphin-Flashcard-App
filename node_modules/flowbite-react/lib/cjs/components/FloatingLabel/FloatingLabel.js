"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingLabel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
exports.FloatingLabel = (0, react_1.forwardRef)(({ label, helperText, color = 'default', sizing = 'md', variant, disabled = false, theme: customTheme = {}, className, ...props }, ref) => {
    const randomId = (0, react_1.useId)();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().floatingLabel, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)('relative', variant === 'standard' ? 'z-0' : ''), children: [(0, jsx_runtime_1.jsx)("input", { type: "text", id: props.id ? props.id : 'floatingLabel' + randomId, "aria-describedby": "outlined_success_help", className: (0, tailwind_merge_1.twMerge)(theme.input[color][variant][sizing], className), placeholder: " ", "data-testid": "floating-label", disabled: disabled, ...props, ref: ref }), (0, jsx_runtime_1.jsx)("label", { htmlFor: props.id ? props.id : 'floatingLabel' + randomId, className: (0, tailwind_merge_1.twMerge)(theme.label[color][variant][sizing], className), children: label })] }), (0, jsx_runtime_1.jsx)("p", { id: 'outlined_helper_text' + randomId, className: (0, tailwind_merge_1.twMerge)(theme.helperText[color], className), children: helperText })] }));
});
exports.FloatingLabel.displayName = 'FloatingLabel';
