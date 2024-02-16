'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../Button';
export const BannerCollapseButton = ({ children, ...props }) => {
    const onClick = (event) => {
        const collapseButton = event.target;
        const parentBanner = collapseButton.closest('[role="banner"]');
        parentBanner?.remove();
    };
    return (_jsx(Button, { onClick: onClick, ...props, children: children }));
};
BannerCollapseButton.displayName = 'Banner.CollapseButton';
