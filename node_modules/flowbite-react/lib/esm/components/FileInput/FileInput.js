import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { HelperText } from '../HelperText';
export const FileInput = forwardRef(({ className, color = 'gray', helperText, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().fileInput, customTheme);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: twMerge(theme.root.base, className), children: _jsx("div", { className: theme.field.base, children: _jsx("input", { className: twMerge(theme.field.input.base, theme.field.input.colors[color], theme.field.input.sizes[sizing]), ...props, type: "file", ref: ref }) }) }), helperText && _jsx(HelperText, { color: color, children: helperText })] }));
});
FileInput.displayName = 'FileInput';
