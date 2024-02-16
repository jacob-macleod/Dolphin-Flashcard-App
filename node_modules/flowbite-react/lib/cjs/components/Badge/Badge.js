"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Badge = ({ children, color = 'info', href, icon: Icon, size = 'xs', className, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().badge, customTheme);
    const Content = () => ((0, jsx_runtime_1.jsxs)("span", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.color[color], theme.root.size[size], theme.icon[Icon ? 'on' : 'off'], className), "data-testid": "flowbite-badge", ...props, children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": true, className: theme.icon.size[size], "data-testid": "flowbite-badge-icon" }), children && (0, jsx_runtime_1.jsx)("span", { children: children })] }));
    return href ? ((0, jsx_runtime_1.jsx)("a", { className: theme.root.href, href: href, children: (0, jsx_runtime_1.jsx)(Content, {}) })) : ((0, jsx_runtime_1.jsx)(Content, {}));
};
exports.Badge = Badge;
exports.Badge.displayName = 'Badge';
