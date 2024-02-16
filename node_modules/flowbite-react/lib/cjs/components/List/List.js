"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ListItem_1 = require("./ListItem");
const ListComponent = ({ children, className, unstyled, nested, ordered, horizontal, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().list, customTheme);
    const Component = ordered ? 'ol' : 'ul';
    return ((0, jsx_runtime_1.jsx)(Component, { className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.ordered[ordered ? 'on' : 'off'], unstyled && theme.root.unstyled, nested && theme.root.nested, horizontal && theme.root.horizontal, className), ...props, children: children }));
};
ListComponent.displayName = 'List';
ListItem_1.ListItem.displayName = 'List.Item';
exports.List = Object.assign(ListComponent, { Item: ListItem_1.ListItem });
