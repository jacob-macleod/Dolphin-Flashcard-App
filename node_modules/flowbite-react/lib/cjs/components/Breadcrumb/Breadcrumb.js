"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const BreadcrumbItem_1 = require("./BreadcrumbItem");
const BreadcrumbComponent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().breadcrumb.root, customTheme);
    return ((0, jsx_runtime_1.jsx)("nav", { "aria-label": "Breadcrumb", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: (0, jsx_runtime_1.jsx)("ol", { className: theme.list, children: children }) }));
};
BreadcrumbComponent.displayName = 'Breadcrumb';
exports.Breadcrumb = Object.assign(BreadcrumbComponent, {
    Item: BreadcrumbItem_1.BreadcrumbItem,
});
