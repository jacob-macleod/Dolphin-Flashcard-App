import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Checkbox = forwardRef(({ className, color = 'default', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().checkbox, customTheme);
    return (_jsx("input", { ref: ref, type: "checkbox", className: twMerge(theme.root.base, theme.root.color[color], className), ...props }));
});
Checkbox.displayName = 'Checkbox';
