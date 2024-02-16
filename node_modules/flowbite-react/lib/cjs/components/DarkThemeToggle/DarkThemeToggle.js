"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkThemeToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const use_is_mounted_1 = require("../../hooks/use-is-mounted");
const merge_deep_1 = require("../../helpers/merge-deep");
const use_theme_mode_1 = require("../../hooks/use-theme-mode");
const theme_store_1 = require("../../theme-store");
const DarkThemeToggle = ({ className, theme: customTheme = {}, iconDark: IconDark = hi_1.HiSun, iconLight: IconLight = hi_1.HiMoon, ...props }) => {
    const isMounted = (0, use_is_mounted_1.useIsMounted)();
    const { computedMode, toggleMode } = (0, use_theme_mode_1.useThemeMode)();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().darkThemeToggle, customTheme);
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Toggle dark mode", "data-testid": "dark-theme-toggle", className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), onClick: toggleMode, ...props, children: [(0, jsx_runtime_1.jsx)(IconDark, { "aria-label": "Currently dark mode", "data-active": isMounted && computedMode === 'dark', className: (0, tailwind_merge_1.twMerge)(theme.root.icon, 'hidden dark:block') }), (0, jsx_runtime_1.jsx)(IconLight, { "aria-label": "Currently light mode", "data-active": isMounted && computedMode === 'light', className: (0, tailwind_merge_1.twMerge)(theme.root.icon, 'dark:hidden') })] }));
};
exports.DarkThemeToggle = DarkThemeToggle;
exports.DarkThemeToggle.displayName = 'DarkThemeToggle';
