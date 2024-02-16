"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ListGroupItem_1 = require("./ListGroupItem");
const ListGroupComponent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().listGroup, customTheme);
    return ((0, jsx_runtime_1.jsx)("ul", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), ...props, children: children }));
};
ListGroupComponent.displayName = 'ListGroup';
ListGroupItem_1.ListGroupItem.displayName = 'ListGroup.Item';
exports.ListGroup = Object.assign(ListGroupComponent, {
    Item: ListGroupItem_1.ListGroupItem,
});
