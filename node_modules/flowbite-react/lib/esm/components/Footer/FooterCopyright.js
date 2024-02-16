import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterCopyright = ({ by, className, href, theme: customTheme = {}, year, ...props }) => {
    const theme = mergeDeep(getTheme().footer.copyright, customTheme);
    return (_jsxs("div", { "data-testid": "flowbite-footer-copyright", className: twMerge(theme.base, className), ...props, children: ["\u00A9 ", year, href ? (_jsx("a", { href: href, className: theme.href, children: by })) : (_jsx("span", { "data-testid": "flowbite-footer-copyright-span", className: theme.span, children: by }))] }));
};
