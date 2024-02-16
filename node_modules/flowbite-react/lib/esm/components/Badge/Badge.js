import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Badge = ({ children, color = 'info', href, icon: Icon, size = 'xs', className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().badge, customTheme);
    const Content = () => (_jsxs("span", { className: twMerge(theme.root.base, theme.root.color[color], theme.root.size[size], theme.icon[Icon ? 'on' : 'off'], className), "data-testid": "flowbite-badge", ...props, children: [Icon && _jsx(Icon, { "aria-hidden": true, className: theme.icon.size[size], "data-testid": "flowbite-badge-icon" }), children && _jsx("span", { children: children })] }));
    return href ? (_jsx("a", { className: theme.root.href, href: href, children: _jsx(Content, {}) })) : (_jsx(Content, {}));
};
Badge.displayName = 'Badge';
