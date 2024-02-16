"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = exports.FooterComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const FooterBrand_1 = require("./FooterBrand");
const FooterCopyright_1 = require("./FooterCopyright");
const FooterDivider_1 = require("./FooterDivider");
const FooterIcon_1 = require("./FooterIcon");
const FooterLink_1 = require("./FooterLink");
const FooterLinkGroup_1 = require("./FooterLinkGroup");
const FooterTitle_1 = require("./FooterTitle");
const FooterComponent = ({ bgDark = false, children, className, container = false, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().footer, customTheme);
    return ((0, jsx_runtime_1.jsx)("footer", { "data-testid": "flowbite-footer", className: (0, tailwind_merge_1.twMerge)(theme.root.base, bgDark && theme.root.bgDark, container && theme.root.container, className), ...props, children: children }));
};
exports.FooterComponent = FooterComponent;
exports.FooterComponent.displayName = 'Footer';
FooterCopyright_1.FooterCopyright.displayName = 'Footer.Copyright';
FooterLink_1.FooterLink.displayName = 'Footer.Link';
FooterBrand_1.FooterBrand.displayName = 'Footer.Brand';
FooterLinkGroup_1.FooterLinkGroup.displayName = 'Footer.LinkGroup';
FooterIcon_1.FooterIcon.displayName = 'Footer.Icon';
FooterTitle_1.FooterTitle.displayName = 'Footer.Title';
FooterDivider_1.FooterDivider.displayName = 'Footer.Divider';
exports.Footer = Object.assign(exports.FooterComponent, {
    Copyright: FooterCopyright_1.FooterCopyright,
    Link: FooterLink_1.FooterLink,
    LinkGroup: FooterLinkGroup_1.FooterLinkGroup,
    Brand: FooterBrand_1.FooterBrand,
    Icon: FooterIcon_1.FooterIcon,
    Title: FooterTitle_1.FooterTitle,
    Divider: FooterDivider_1.FooterDivider,
});
