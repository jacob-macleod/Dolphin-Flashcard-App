import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const HelperText = ({ children, className, color = 'default', theme: customTheme = {}, value, ...props }) => {
    const theme = mergeDeep(getTheme().helperText, customTheme);
    return (_jsx("p", { className: twMerge(theme.root.base, theme.root.colors[color], className), ...props, children: value ?? children ?? '' }));
};
HelperText.displayName = 'HelperText';
