import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FloatingLabel = forwardRef(({ label, helperText, color = 'default', sizing = 'md', variant, disabled = false, theme: customTheme = {}, className, ...props }, ref) => {
    const randomId = useId();
    const theme = mergeDeep(getTheme().floatingLabel, customTheme);
    return (_jsxs("div", { children: [_jsxs("div", { className: twMerge('relative', variant === 'standard' ? 'z-0' : ''), children: [_jsx("input", { type: "text", id: props.id ? props.id : 'floatingLabel' + randomId, "aria-describedby": "outlined_success_help", className: twMerge(theme.input[color][variant][sizing], className), placeholder: " ", "data-testid": "floating-label", disabled: disabled, ...props, ref: ref }), _jsx("label", { htmlFor: props.id ? props.id : 'floatingLabel' + randomId, className: twMerge(theme.label[color][variant][sizing], className), children: label })] }), _jsx("p", { id: 'outlined_helper_text' + randomId, className: twMerge(theme.helperText[color], className), children: helperText })] }));
});
FloatingLabel.displayName = 'FloatingLabel';
