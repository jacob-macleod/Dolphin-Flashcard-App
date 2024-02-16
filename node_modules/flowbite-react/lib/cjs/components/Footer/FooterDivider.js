"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterDivider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterDivider = ({ className, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer.divider, customTheme);
    return (0, jsx_runtime_1.jsx)("hr", { "data-testid": "footer-divider", className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props });
};
exports.FooterDivider = FooterDivider;
