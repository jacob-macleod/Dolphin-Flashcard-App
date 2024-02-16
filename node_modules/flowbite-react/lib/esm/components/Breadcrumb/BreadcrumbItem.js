import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const BreadcrumbItem = forwardRef(({ children, className, href, icon: Icon, theme: customTheme = {}, ...props }, ref) => {
    const isLink = typeof href !== 'undefined';
    const Component = isLink ? 'a' : 'span';
    const theme = mergeDeep(getTheme().breadcrumb.item, customTheme);
    return (_jsxs("li", { className: twMerge(theme.base, className), ...props, children: [_jsx(HiOutlineChevronRight, { "aria-hidden": true, className: theme.chevron, "data-testid": "flowbite-breadcrumb-separator" }), _jsxs(Component, { ref: ref, className: theme.href[isLink ? 'on' : 'off'], "data-testid": "flowbite-breadcrumb-item", href: href, children: [Icon && _jsx(Icon, { "aria-hidden": true, className: theme.icon }), children] })] }));
});
BreadcrumbItem.displayName = 'Breadcrumb.Item';
