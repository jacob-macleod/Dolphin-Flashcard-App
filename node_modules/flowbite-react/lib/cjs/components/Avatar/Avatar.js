"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const AvatarGroup_1 = require("./AvatarGroup");
const AvatarGroupCounter_1 = require("./AvatarGroupCounter");
const AvatarComponent = ({ alt = '', bordered = false, children, className, color = 'light', img, placeholderInitials = '', rounded = false, size = 'md', stacked = false, status, statusPosition = 'top-left', theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().avatar, customTheme);
    const imgClassName = (0, tailwind_merge_1.twMerge)(theme.root.img.base, bordered && theme.root.bordered, bordered && theme.root.color[color], rounded && theme.root.rounded, stacked && theme.root.stacked, theme.root.img.on, theme.root.size[size]);
    const imgProps = {
        className: (0, tailwind_merge_1.twMerge)(imgClassName, theme.root.img.on),
        'data-testid': 'flowbite-avatar-img',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), "data-testid": "flowbite-avatar", ...props, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [img ? (typeof img === 'string' ? ((0, jsx_runtime_1.jsx)("img", { alt: alt, src: img, ...imgProps })) : (img({ alt, ...imgProps }))) : placeholderInitials ? ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.img.off, theme.root.initials.base, stacked && theme.root.stacked, bordered && theme.root.bordered, bordered && theme.root.color[color], theme.root.size[size], rounded && theme.root.rounded), "data-testid": "flowbite-avatar-initials-placeholder", children: (0, jsx_runtime_1.jsx)("span", { className: (0, tailwind_merge_1.twMerge)(theme.root.initials.text), "data-testid": "flowbite-avatar-initials-placeholder-text", children: placeholderInitials }) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(imgClassName, theme.root.img.off), "data-testid": "flowbite-avatar-img", children: (0, jsx_runtime_1.jsx)("svg", { className: theme.root.img.placeholder, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) })), status && ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-avatar-status", className: (0, tailwind_merge_1.twMerge)(theme.root.status.base, theme.root.status[status], theme.root.statusPosition[statusPosition]) }))] }), children && (0, jsx_runtime_1.jsx)("div", { children: children })] }));
};
AvatarComponent.displayName = 'Avatar';
exports.Avatar = Object.assign(AvatarComponent, {
    Group: AvatarGroup_1.AvatarGroup,
    Counter: AvatarGroupCounter_1.AvatarGroupCounter,
});
