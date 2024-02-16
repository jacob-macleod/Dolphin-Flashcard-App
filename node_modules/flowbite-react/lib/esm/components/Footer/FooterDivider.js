import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const FooterDivider = ({ className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer.divider, customTheme);
    return _jsx("hr", { "data-testid": "footer-divider", className: twMerge(theme.base, className), ...props });
};
