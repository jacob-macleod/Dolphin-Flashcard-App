import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Radio = forwardRef(({ className, theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().radio, customTheme);
    return _jsx("input", { ref: ref, type: "radio", className: twMerge(theme.root.base, className), ...props });
});
Radio.displayName = 'Radio';
