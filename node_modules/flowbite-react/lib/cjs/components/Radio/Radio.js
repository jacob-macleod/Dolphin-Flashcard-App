"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
exports.Radio = (0, react_1.forwardRef)(({ className, theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().radio, customTheme);
    return (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "radio", className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), ...props });
});
exports.Radio.displayName = 'Radio';
