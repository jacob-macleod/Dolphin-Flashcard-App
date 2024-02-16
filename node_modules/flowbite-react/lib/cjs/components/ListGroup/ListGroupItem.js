"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroupItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ListGroupItem = ({ active: isActive, children, className, href, icon: Icon, onClick, theme: customTheme = {}, disabled, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().listGroup.item, customTheme);
    const isLink = typeof href !== 'undefined';
    const Component = isLink ? 'a' : 'button';
    return ((0, jsx_runtime_1.jsx)("li", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), children: (0, jsx_runtime_1.jsxs)(Component, { href: href, onClick: onClick, type: isLink ? undefined : 'button', disabled: disabled, className: (0, tailwind_merge_1.twMerge)(theme.link.active[isActive ? 'on' : 'off'], theme.link.disabled[disabled ? 'on' : 'off'], theme.link.base, theme.link.href[isLink ? 'on' : 'off']), ...props, children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": true, "data-testid": "flowbite-list-group-item-icon", className: theme.link.icon }), children] }) }));
};
exports.ListGroupItem = ListGroupItem;
