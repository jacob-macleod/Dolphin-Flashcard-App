"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kbd = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Kbd = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().kbd, customTheme);
    return ((0, jsx_runtime_1.jsxs)("span", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), "data-testid": "flowbite-kbd", ...props, children: [Icon && (0, jsx_runtime_1.jsx)(Icon, { className: theme.root.icon, "data-testid": "flowbite-kbd-icon" }), children] }));
};
exports.Kbd = Kbd;
exports.Kbd.displayName = 'Kbd';
