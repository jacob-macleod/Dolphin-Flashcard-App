"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@floating-ui/react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const ButtonBase_1 = require("../Button/ButtonBase");
const DropdownContext_1 = require("./DropdownContext");
const DropdownItem = ({ children, className, icon: Icon, onClick, theme: customTheme = {}, ...props }) => {
    const { ref, index } = (0, react_1.useListItem)({ label: typeof children === 'string' ? children : undefined });
    const { theme: rootTheme, activeIndex, dismissOnClick, getItemProps, handleSelect } = (0, DropdownContext_1.useDropdownContext)();
    const isActive = activeIndex === index;
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.floating.item, customTheme);
    const theirProps = props;
    return ((0, jsx_runtime_1.jsx)("li", { role: "menuitem", className: theme.container, children: (0, jsx_runtime_1.jsxs)(ButtonBase_1.ButtonBase, { ref: ref, className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...theirProps, ...getItemProps({
                onClick: () => {
                    onClick && onClick();
                    dismissOnClick && handleSelect(null);
                },
            }), tabIndex: isActive ? 0 : -1, children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { className: theme.icon }), children] }) }));
};
exports.DropdownItem = DropdownItem;
