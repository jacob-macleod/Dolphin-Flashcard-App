"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterTitle = ({ as: Component = 'h2', className, theme: customTheme = {}, title, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.title, customTheme);
    return ((0, jsx_runtime_1.jsx)(Component, { "data-testid": "flowbite-footer-title", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: title }));
};
exports.FooterTitle = FooterTitle;
