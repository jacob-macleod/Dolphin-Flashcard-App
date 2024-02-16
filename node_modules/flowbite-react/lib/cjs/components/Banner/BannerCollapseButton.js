"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerCollapseButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../Button");
const BannerCollapseButton = ({ children, ...props }) => {
    const onClick = (event) => {
        const collapseButton = event.target;
        const parentBanner = collapseButton.closest('[role="banner"]');
        parentBanner?.remove();
    };
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: onClick, ...props, children: children }));
};
exports.BannerCollapseButton = BannerCollapseButton;
exports.BannerCollapseButton.displayName = 'Banner.CollapseButton';
