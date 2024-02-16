'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTimelineContext } from './TimelineContext';
import { TimelineItemContext } from './TimelineItemContext';
export const TimelineItem = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, horizontal } = useTimelineContext();
    const theme = mergeDeep(rootTheme.item, customTheme);
    return (_jsx(TimelineItemContext.Provider, { value: { theme }, children: _jsx("li", { "data-testid": "timeline-item", className: twMerge(horizontal && theme.root.horizontal, !horizontal && theme.root.vertical, className), ...props, children: children }) }));
};
