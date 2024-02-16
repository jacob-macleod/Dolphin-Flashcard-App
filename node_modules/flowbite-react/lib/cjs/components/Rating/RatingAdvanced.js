"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingAdvanced = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const RatingAdvanced = ({ children, className, percentFilled = 0, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().ratingAdvanced, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: theme.label, children: children }), (0, jsx_runtime_1.jsx)("div", { className: theme.progress.base, children: (0, jsx_runtime_1.jsx)("div", { className: theme.progress.fill, "data-testid": "flowbite-rating-fill", style: { width: `${percentFilled}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: theme.progress.label, children: `${percentFilled}%` })] }));
};
exports.RatingAdvanced = RatingAdvanced;
