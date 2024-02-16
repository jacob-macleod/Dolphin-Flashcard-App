import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupCounter } from './AvatarGroupCounter';
const AvatarComponent = ({ alt = '', bordered = false, children, className, color = 'light', img, placeholderInitials = '', rounded = false, size = 'md', stacked = false, status, statusPosition = 'top-left', theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().avatar, customTheme);
    const imgClassName = twMerge(theme.root.img.base, bordered && theme.root.bordered, bordered && theme.root.color[color], rounded && theme.root.rounded, stacked && theme.root.stacked, theme.root.img.on, theme.root.size[size]);
    const imgProps = {
        className: twMerge(imgClassName, theme.root.img.on),
        'data-testid': 'flowbite-avatar-img',
    };
    return (_jsxs("div", { className: twMerge(theme.root.base, className), "data-testid": "flowbite-avatar", ...props, children: [_jsxs("div", { className: "relative", children: [img ? (typeof img === 'string' ? (_jsx("img", { alt: alt, src: img, ...imgProps })) : (img({ alt, ...imgProps }))) : placeholderInitials ? (_jsx("div", { className: twMerge(theme.root.img.off, theme.root.initials.base, stacked && theme.root.stacked, bordered && theme.root.bordered, bordered && theme.root.color[color], theme.root.size[size], rounded && theme.root.rounded), "data-testid": "flowbite-avatar-initials-placeholder", children: _jsx("span", { className: twMerge(theme.root.initials.text), "data-testid": "flowbite-avatar-initials-placeholder-text", children: placeholderInitials }) })) : (_jsx("div", { className: twMerge(imgClassName, theme.root.img.off), "data-testid": "flowbite-avatar-img", children: _jsx("svg", { className: theme.root.img.placeholder, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) })), status && (_jsx("span", { "data-testid": "flowbite-avatar-status", className: twMerge(theme.root.status.base, theme.root.status[status], theme.root.statusPosition[statusPosition]) }))] }), children && _jsx("div", { children: children })] }));
};
AvatarComponent.displayName = 'Avatar';
export const Avatar = Object.assign(AvatarComponent, {
    Group: AvatarGroup,
    Counter: AvatarGroupCounter,
});
