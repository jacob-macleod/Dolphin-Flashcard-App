import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { HelperText } from '../HelperText';
export const Select = forwardRef(({ addon, children, className, color = 'gray', helperText, icon: Icon, shadow, sizing = 'md', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().select, customTheme);
    return (_jsxs("div", { className: twMerge(theme.base, className), children: [addon && _jsx("span", { className: theme.addon, children: addon }), _jsxs("div", { className: theme.field.base, children: [Icon && (_jsx("div", { className: theme.field.icon.base, children: _jsx(Icon, { className: theme.field.icon.svg }) })), _jsx("select", { className: twMerge(theme.field.select.base, theme.field.select.colors[color], theme.field.select.sizes[sizing], theme.field.select.withIcon[Icon ? 'on' : 'off'], theme.field.select.withAddon[addon ? 'on' : 'off'], theme.field.select.withShadow[shadow ? 'on' : 'off']), ...props, ref: ref, children: children }), helperText && _jsx(HelperText, { color: color, children: helperText })] })] }));
});
Select.displayName = 'Select';
