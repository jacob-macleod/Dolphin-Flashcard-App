"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const omit_1 = require("../../helpers/omit");
const theme_store_1 = require("../../theme-store");
const Card = (props) => {
    const { children, className, horizontal, href, theme: customTheme = {} } = props;
    const Component = typeof href === 'undefined' ? 'div' : 'a';
    const theirProps = removeCustomProps(props);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().card, customTheme);
    return ((0, jsx_runtime_1.jsxs)(Component, { "data-testid": "flowbite-card", href: href, className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.horizontal[horizontal ? 'on' : 'off'], href && theme.root.href, className), ...theirProps, children: [(0, jsx_runtime_1.jsx)(Image, { ...props }), (0, jsx_runtime_1.jsx)("div", { className: theme.root.children, children: children })] }));
};
exports.Card = Card;
const Image = ({ theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().card, customTheme);
    if (props.renderImage) {
        return props.renderImage(theme, props.horizontal ?? false);
    }
    if (props.imgSrc) {
        return ((0, jsx_runtime_1.jsx)("img", { "data-testid": "flowbite-card-image", alt: props.imgAlt ?? '', src: props.imgSrc, className: (0, tailwind_merge_1.twMerge)(theme.img.base, theme.img.horizontal[props.horizontal ? 'on' : 'off']) }));
    }
    return null;
};
const removeCustomProps = (0, omit_1.omit)([
    'renderImage',
    'imgSrc',
    'imgAlt',
    'children',
    'className',
    'horizontal',
    'href',
    'theme',
]);
