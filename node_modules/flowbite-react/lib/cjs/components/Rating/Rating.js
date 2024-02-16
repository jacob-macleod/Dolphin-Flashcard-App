"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const RatingAdvanced_1 = require("./RatingAdvanced");
const RatingContext_1 = require("./RatingContext");
const RatingStar_1 = require("./RatingStar");
const RatingComponent = ({ children, className, size = 'sm', theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().rating, customTheme);
    return ((0, jsx_runtime_1.jsx)(RatingContext_1.RatingContext.Provider, { value: { theme, size }, children: (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), ...props, children: children }) }));
};
RatingComponent.displayName = 'Rating';
RatingStar_1.RatingStar.displayName = 'Rating.Star';
RatingAdvanced_1.RatingAdvanced.displayName = 'Rating.Advanced';
exports.Rating = Object.assign(RatingComponent, {
    Star: RatingStar_1.RatingStar,
    Advanced: RatingAdvanced_1.RatingAdvanced,
});
