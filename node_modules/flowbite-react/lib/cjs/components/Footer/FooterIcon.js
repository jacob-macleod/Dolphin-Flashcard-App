"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterIcon = ({ ariaLabel, className, href, icon: Icon, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.icon, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { children: href ? ((0, jsx_runtime_1.jsx)("a", { "aria-label": ariaLabel, "data-testid": "flowbite-footer-icon", href: href, className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: (0, jsx_runtime_1.jsx)(Icon, { className: theme.size }) })) : ((0, jsx_runtime_1.jsx)(Icon, { "data-testid": "flowbite-footer-icon", className: theme.size, ...props })) }));
};
exports.FooterIcon = FooterIcon;
