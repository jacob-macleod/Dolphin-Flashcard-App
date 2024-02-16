import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { BreadcrumbItem } from './BreadcrumbItem';
const BreadcrumbComponent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().breadcrumb.root, customTheme);
    return (_jsx("nav", { "aria-label": "Breadcrumb", className: twMerge(theme.base, className), ...props, children: _jsx("ol", { className: theme.list, children: children }) }));
};
BreadcrumbComponent.displayName = 'Breadcrumb';
export const Breadcrumb = Object.assign(BreadcrumbComponent, {
    Item: BreadcrumbItem,
});
