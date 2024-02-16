"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterCopyright = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterCopyright = ({ by, className, href, theme: customTheme = {}, year, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.copyright, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "flowbite-footer-copyright", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: ["\u00A9 ", year, href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: theme.href, children: by })) : ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-footer-copyright-span", className: theme.span, children: by }))] }));
};
exports.FooterCopyright = FooterCopyright;
