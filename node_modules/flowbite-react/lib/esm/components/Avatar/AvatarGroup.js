import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const AvatarGroup = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().avatar.group, customTheme);
    return (_jsx("div", { "data-testid": "avatar-group-element", className: twMerge(theme.base, className), ...props, children: children }));
};
AvatarGroup.displayName = 'Avatar.Group';
