import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterBrand = ({ alt, className, children, href, name, src, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer.brand, customTheme);
    return (_jsx("div", { children: href ? (_jsxs("a", { "data-testid": "flowbite-footer-brand", href: href, className: twMerge(theme.base, className), ...props, children: [_jsx("img", { alt: alt, src: src, className: theme.img }), _jsx("span", { "data-testid": "flowbite-footer-brand-span", className: theme.span, children: name }), children] })) : (_jsx("img", { alt: alt, "data-testid": "flowbite-footer-brand", src: src, className: twMerge(theme.img, className), ...props })) }));
};
