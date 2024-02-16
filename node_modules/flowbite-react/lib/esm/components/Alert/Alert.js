import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Alert = ({ additionalContent, children, className, color = 'info', icon: Icon, onDismiss, rounded = true, theme: customTheme = {}, withBorderAccent, ...props }) => {
    const theme = mergeDeep(getTheme().alert, customTheme);
    return (_jsxs("div", { className: twMerge(theme.base, theme.color[color], rounded && theme.rounded, withBorderAccent && theme.borderAccent, className), role: "alert", ...props, children: [_jsxs("div", { className: theme.wrapper, "data-testid": "flowbite-alert-wrapper", children: [Icon && _jsx(Icon, { className: theme.icon, "data-testid": "flowbite-alert-icon" }), _jsx("div", { children: children }), typeof onDismiss === 'function' && (_jsx("button", { "aria-label": "Dismiss", className: twMerge(theme.closeButton.base, theme.closeButton.color[color]), onClick: onDismiss, type: "button", children: _jsx(HiX, { "aria-hidden": true, className: theme.closeButton.icon }) }))] }), additionalContent && _jsx("div", { children: additionalContent })] }));
};
Alert.displayName = 'Alert';
