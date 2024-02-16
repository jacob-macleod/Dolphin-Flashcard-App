"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSlider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
exports.RangeSlider = (0, react_1.forwardRef)(({ className, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().rangeSlider, customTheme);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { "data-testid": "flowbite-range-slider", className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), children: (0, jsx_runtime_1.jsx)("div", { className: theme.field.base, children: (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "range", className: (0, tailwind_merge_1.twMerge)(theme.field.input.base, theme.field.input.sizes[sizing]), ...props }) }) }) }));
});
exports.RangeSlider.displayName = 'RangeSlider';
