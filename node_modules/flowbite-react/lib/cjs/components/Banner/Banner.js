"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BannerCollapseButton_1 = require("./BannerCollapseButton");
const BannerComponent = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "flowbite-banner", role: "banner", tabIndex: -1, ...props, children: children }));
};
BannerComponent.displayName = 'Banner';
exports.Banner = Object.assign(BannerComponent, {
    CollapseButton: BannerCollapseButton_1.BannerCollapseButton,
});
