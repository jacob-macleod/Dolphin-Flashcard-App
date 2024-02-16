import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { FooterBrand } from './FooterBrand';
import { FooterCopyright } from './FooterCopyright';
import { FooterDivider } from './FooterDivider';
import { FooterIcon } from './FooterIcon';
import { FooterLink } from './FooterLink';
import { FooterLinkGroup } from './FooterLinkGroup';
import { FooterTitle } from './FooterTitle';
export const FooterComponent = ({ bgDark = false, children, className, container = false, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().footer, customTheme);
    return (_jsx("footer", { "data-testid": "flowbite-footer", className: twMerge(theme.root.base, bgDark && theme.root.bgDark, container && theme.root.container, className), ...props, children: children }));
};
FooterComponent.displayName = 'Footer';
FooterCopyright.displayName = 'Footer.Copyright';
FooterLink.displayName = 'Footer.Link';
FooterBrand.displayName = 'Footer.Brand';
FooterLinkGroup.displayName = 'Footer.LinkGroup';
FooterIcon.displayName = 'Footer.Icon';
FooterTitle.displayName = 'Footer.Title';
FooterDivider.displayName = 'Footer.Divider';
export const Footer = Object.assign(FooterComponent, {
    Copyright: FooterCopyright,
    Link: FooterLink,
    LinkGroup: FooterLinkGroup,
    Brand: FooterBrand,
    Icon: FooterIcon,
    Title: FooterTitle,
    Divider: FooterDivider,
});
