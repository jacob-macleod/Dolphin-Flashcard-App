import { jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const AvatarGroupCounter = ({ className, href, theme: customTheme = {}, total, ...props }) => {
    const theme = mergeDeep(getTheme().avatar.groupCounter, customTheme);
    return (_jsxs("a", { href: href, className: twMerge(theme.base, className), ...props, children: ["+", total] }));
};
AvatarGroupCounter.displayName = 'Avatar.GroupCounter';
