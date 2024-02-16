"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterBrand = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterBrand = ({ alt, className, children, href, name, src, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.brand, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { children: href ? ((0, jsx_runtime_1.jsxs)("a", { "data-testid": "flowbite-footer-brand", href: href, className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [(0, jsx_runtime_1.jsx)("img", { alt: alt, src: src, className: theme.img }), (0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-footer-brand-span", className: theme.span, children: name }), children] })) : ((0, jsx_runtime_1.jsx)("img", { alt: alt, "data-testid": "flowbite-footer-brand", src: src, className: (0, tailwind_merge_1.twMerge)(theme.img, className), ...props })) }));
};
exports.FooterBrand = FooterBrand;
