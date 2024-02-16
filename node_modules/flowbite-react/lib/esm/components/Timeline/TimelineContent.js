'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { TimelineContentContext } from './TimelineContentContext';
import { useTimelineContext } from './TimelineContext';
import { useTimelineItemContext } from './TimelineItemContext';
export const TimelineContent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { horizontal } = useTimelineContext();
    const { theme: itemTheme } = useTimelineItemContext();
    const theme = mergeDeep(itemTheme.content, customTheme);
    return (_jsx(TimelineContentContext.Provider, { value: { theme }, children: _jsx("div", { "data-testid": "timeline-content", className: twMerge(horizontal && theme.root.base, className), ...props, children: children }) }));
};
