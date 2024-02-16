import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { omit } from '../../helpers/omit';
import { getTheme } from '../../theme-store';
export const Card = (props) => {
    const { children, className, horizontal, href, theme: customTheme = {} } = props;
    const Component = typeof href === 'undefined' ? 'div' : 'a';
    const theirProps = removeCustomProps(props);
    const theme = mergeDeep(getTheme().card, customTheme);
    return (_jsxs(Component, { "data-testid": "flowbite-card", href: href, className: twMerge(theme.root.base, theme.root.horizontal[horizontal ? 'on' : 'off'], href && theme.root.href, className), ...theirProps, children: [_jsx(Image, { ...props }), _jsx("div", { className: theme.root.children, children: children })] }));
};
const Image = ({ theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().card, customTheme);
    if (props.renderImage) {
        return props.renderImage(theme, props.horizontal ?? false);
    }
    if (props.imgSrc) {
        return (_jsx("img", { "data-testid": "flowbite-card-image", alt: props.imgAlt ?? '', src: props.imgSrc, className: twMerge(theme.img.base, theme.img.horizontal[props.horizontal ? 'on' : 'off']) }));
    }
    return null;
};
const removeCustomProps = omit([
    'renderImage',
    'imgSrc',
    'imgAlt',
    'children',
    'className',
    'horizontal',
    'href',
    'theme',
]);
