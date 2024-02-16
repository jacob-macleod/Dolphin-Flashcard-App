"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
exports.Checkbox = (0, react_1.forwardRef)(({ className, color = 'default', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().checkbox, customTheme);
    return ((0, jsx_runtime_1.jsx)("input", { ref: ref, type: "checkbox", className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.color[color], className), ...props }));
});
exports.Checkbox.displayName = 'Checkbox';
