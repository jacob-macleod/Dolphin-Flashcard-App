"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const HelperText = ({ children, className, color = 'default', theme: customTheme = {}, value, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().helperText, customTheme);
    return ((0, jsx_runtime_1.jsx)("p", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.colors[color], className), ...props, children: value ?? children ?? '' }));
};
exports.HelperText = HelperText;
exports.HelperText.displayName = 'HelperText';
