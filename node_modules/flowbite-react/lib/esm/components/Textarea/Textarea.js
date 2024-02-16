import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { HelperText } from '../HelperText';
export const Textarea = forwardRef(({ className, color = 'gray', helperText, shadow, theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().textarea, customTheme);
    return (_jsxs(_Fragment, { children: [_jsx("textarea", { ref: ref, className: twMerge(theme.base, theme.colors[color], theme.withShadow[shadow ? 'on' : 'off'], className), ...props }), helperText && _jsx(HelperText, { color: color, children: helperText })] }));
});
Textarea.displayName = 'Textarea';
