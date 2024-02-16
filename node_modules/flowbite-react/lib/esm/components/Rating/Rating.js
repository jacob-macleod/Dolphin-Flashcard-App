'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { RatingAdvanced } from './RatingAdvanced';
import { RatingContext } from './RatingContext';
import { RatingStar } from './RatingStar';
const RatingComponent = ({ children, className, size = 'sm', theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().rating, customTheme);
    return (_jsx(RatingContext.Provider, { value: { theme, size }, children: _jsx("div", { className: twMerge(theme.root.base, className), ...props, children: children }) }));
};
RatingComponent.displayName = 'Rating';
RatingStar.displayName = 'Rating.Star';
RatingAdvanced.displayName = 'Rating.Advanced';
export const Rating = Object.assign(RatingComponent, {
    Star: RatingStar,
    Advanced: RatingAdvanced,
});
