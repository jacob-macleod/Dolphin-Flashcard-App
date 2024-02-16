"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingStar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const RatingContext_1 = require("./RatingContext");
const RatingStar = ({ className, filled = true, starIcon: Icon = hi_1.HiStar, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, size = 'sm' } = (0, RatingContext_1.useRatingContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.star, customTheme);
    return ((0, jsx_runtime_1.jsx)(Icon, { "data-testid": "flowbite-rating-star", className: (0, tailwind_merge_1.twMerge)(theme.sizes[size], theme[filled ? 'filled' : 'empty'], className), ...props }));
};
exports.RatingStar = RatingStar;
