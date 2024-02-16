"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
exports.BreadcrumbItem = (0, react_1.forwardRef)(({ children, className, href, icon: Icon, theme: customTheme = {}, ...props }, ref) => {
    const isLink = typeof href !== 'undefined';
    const Component = isLink ? 'a' : 'span';
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().breadcrumb.item, customTheme);
    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [(0, jsx_runtime_1.jsx)(hi_1.HiOutlineChevronRight, { "aria-hidden": true, className: theme.chevron, "data-testid": "flowbite-breadcrumb-separator" }), (0, jsx_runtime_1.jsxs)(Component, { ref: ref, className: theme.href[isLink ? 'on' : 'off'], "data-testid": "flowbite-breadcrumb-item", href: href, children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": true, className: theme.icon }), children] })] }));
});
exports.BreadcrumbItem.displayName = 'Breadcrumb.Item';
