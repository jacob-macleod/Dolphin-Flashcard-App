import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const ListGroupItem = ({ active: isActive, children, className, href, icon: Icon, onClick, theme: customTheme = {}, disabled, ...props }) => {
    const theme = mergeDeep(getTheme().listGroup.item, customTheme);
    const isLink = typeof href !== 'undefined';
    const Component = isLink ? 'a' : 'button';
    return (_jsx("li", { className: twMerge(theme.base, className), children: _jsxs(Component, { href: href, onClick: onClick, type: isLink ? undefined : 'button', disabled: disabled, className: twMerge(theme.link.active[isActive ? 'on' : 'off'], theme.link.disabled[disabled ? 'on' : 'off'], theme.link.base, theme.link.href[isLink ? 'on' : 'off']), ...props, children: [Icon && _jsx(Icon, { "aria-hidden": true, "data-testid": "flowbite-list-group-item-icon", className: theme.link.icon }), children] }) }));
};
