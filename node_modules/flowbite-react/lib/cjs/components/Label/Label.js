"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Label = ({ children, className, color = 'default', disabled = false, theme: customTheme = {}, value, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().label, customTheme);
    return ((0, jsx_runtime_1.jsx)("label", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.colors[color], disabled && theme.root.disabled, className), "data-testid": "flowbite-label", ...props, children: value ?? children ?? '' }));
};
exports.Label = Label;
exports.Label.displayName = 'Label';
