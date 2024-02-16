import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Label = ({ children, className, color = 'default', disabled = false, theme: customTheme = {}, value, ...props }) => {
    const theme = mergeDeep(getTheme().label, customTheme);
    return (_jsx("label", { className: twMerge(theme.root.base, theme.root.colors[color], disabled && theme.root.disabled, className), "data-testid": "flowbite-label", ...props, children: value ?? children ?? '' }));
};
Label.displayName = 'Label';
