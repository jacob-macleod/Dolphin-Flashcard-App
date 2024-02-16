"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ButtonGroup = ({ children, className, outline, pill, theme: customTheme = {}, ...props }) => {
    const items = (0, react_1.useMemo)(() => react_1.Children.map(children, (child, index) => (0, react_1.cloneElement)(child, {
        outline,
        pill,
        positionInGroup: index === 0 ? 'start' : index === children.length - 1 ? 'end' : 'middle',
    })), [children, outline, pill]);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().buttonGroup, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), role: "group", ...props, children: items }));
};
exports.ButtonGroup = ButtonGroup;
exports.ButtonGroup.displayName = 'Button.Group';
