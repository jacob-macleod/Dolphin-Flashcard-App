import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { HelperText } from '../HelperText';
export const TextInput = forwardRef(({ addon, className, color = 'gray', helperText, icon: Icon, rightIcon: RightIcon, shadow, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().textInput, customTheme);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: twMerge(theme.base, className), children: [addon && _jsx("span", { className: theme.addon, children: addon }), _jsxs("div", { className: theme.field.base, children: [Icon && (_jsx("div", { className: theme.field.icon.base, children: _jsx(Icon, { className: theme.field.icon.svg }) })), RightIcon && (_jsx("div", { "data-testid": "right-icon", className: theme.field.rightIcon.base, children: _jsx(RightIcon, { className: theme.field.rightIcon.svg }) })), _jsx("input", { className: twMerge(theme.field.input.base, theme.field.input.colors[color], theme.field.input.sizes[sizing], theme.field.input.withIcon[Icon ? 'on' : 'off'], theme.field.input.withRightIcon[RightIcon ? 'on' : 'off'], theme.field.input.withAddon[addon ? 'on' : 'off'], theme.field.input.withShadow[shadow ? 'on' : 'off']), ...props, ref: ref })] })] }), helperText && _jsx(HelperText, { color: color, children: helperText })] }));
});
TextInput.displayName = 'TextInput';
