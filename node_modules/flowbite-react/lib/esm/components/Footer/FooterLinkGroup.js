import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterLinkGroup = ({ children, className, col = false, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer.groupLink, customTheme);
    return (_jsx("ul", { "data-testid": "footer-groupLink", className: twMerge(theme.base, col && theme.col, className), ...props, children: children }));
};
