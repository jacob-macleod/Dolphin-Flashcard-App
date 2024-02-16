import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const RangeSlider = forwardRef(({ className, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().rangeSlider, customTheme);
    return (_jsx(_Fragment, { children: _jsx("div", { "data-testid": "flowbite-range-slider", className: twMerge(theme.root.base, className), children: _jsx("div", { className: theme.field.base, children: _jsx("input", { ref: ref, type: "range", className: twMerge(theme.field.input.base, theme.field.input.sizes[sizing]), ...props }) }) }) }));
});
RangeSlider.displayName = 'RangeSlider';
