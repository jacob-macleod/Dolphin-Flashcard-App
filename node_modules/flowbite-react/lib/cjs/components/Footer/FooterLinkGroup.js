"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterLinkGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterLinkGroup = ({ children, className, col = false, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.groupLink, customTheme);
    return ((0, jsx_runtime_1.jsx)("ul", { "data-testid": "footer-groupLink", className: (0, tailwind_merge_1.twMerge)(theme.base, col && theme.col, className), ...props, children: children }));
};
exports.FooterLinkGroup = FooterLinkGroup;
