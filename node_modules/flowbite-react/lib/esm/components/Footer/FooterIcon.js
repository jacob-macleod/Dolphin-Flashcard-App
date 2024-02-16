import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterIcon = ({ ariaLabel, className, href, icon: Icon, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer.icon, customTheme);
    return (_jsx("div", { children: href ? (_jsx("a", { "aria-label": ariaLabel, "data-testid": "flowbite-footer-icon", href: href, className: twMerge(theme.base, className), ...props, children: _jsx(Icon, { className: theme.size }) })) : (_jsx(Icon, { "data-testid": "flowbite-footer-icon", className: theme.size, ...props })) }));
};
