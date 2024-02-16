'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTimelineContext } from './TimelineContext';
import { useTimelineItemContext } from './TimelineItemContext';
export const TimelinePoint = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
    const { horizontal } = useTimelineContext();
    const { theme: itemTheme } = useTimelineItemContext();
    const theme = mergeDeep(itemTheme.point, customTheme);
    return (_jsxs("div", { "data-testid": "timeline-point", className: twMerge(horizontal && theme.horizontal, !horizontal && theme.vertical, className), ...props, children: [children, Icon ? (_jsx("span", { className: twMerge(theme.marker.icon.wrapper), children: _jsx(Icon, { "aria-hidden": true, className: twMerge(theme.marker.icon.base) }) })) : (_jsx("div", { className: twMerge(horizontal && theme.marker.base.horizontal, !horizontal && theme.marker.base.vertical) })), horizontal && _jsx("div", { className: twMerge(theme.line) })] }));
};
