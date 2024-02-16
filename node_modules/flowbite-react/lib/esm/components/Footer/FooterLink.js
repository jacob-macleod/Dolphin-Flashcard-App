import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterLink = ({ as: Component = 'a', children, className, href, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer.groupLink.link, customTheme);
    return (_jsx("li", { className: twMerge(theme.base, className), children: _jsx(Component, { href: href, className: theme.href, ...props, children: children }) }));
};
