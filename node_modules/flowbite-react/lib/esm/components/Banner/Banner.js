import { jsx as _jsx } from "react/jsx-runtime";
import { BannerCollapseButton } from './BannerCollapseButton';
const BannerComponent = ({ children, ...props }) => {
    return (_jsx("div", { "data-testid": "flowbite-banner", role: "banner", tabIndex: -1, ...props, children: children }));
};
BannerComponent.displayName = 'Banner';
export const Banner = Object.assign(BannerComponent, {
    CollapseButton: BannerCollapseButton,
});
