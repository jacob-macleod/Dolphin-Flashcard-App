'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { TimelineBody } from './TimelineBody';
import { TimelineContent } from './TimelineContent';
import { TimelineContext } from './TimelineContext';
import { TimelineItem } from './TimelineItem';
import { TimelinePoint } from './TimelinePoint';
import { TimelineTime } from './TimelineTime';
import { TimelineTitle } from './TimelineTitle';
const TimelineComponent = ({ children, className, horizontal, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().timeline, customTheme);
    return (_jsx(TimelineContext.Provider, { value: { theme, horizontal }, children: _jsx("ol", { "data-testid": "timeline-component", className: twMerge(horizontal && theme.root.direction.horizontal, !horizontal && theme.root.direction.vertical, className), ...props, children: children }) }));
};
TimelineComponent.displayName = 'Timeline';
TimelineItem.displayName = 'Timeline.Item';
TimelinePoint.displayName = 'Timeline.Point';
TimelineContent.displayName = 'Timeline.Content';
TimelineTime.displayName = 'Timeline.Time';
TimelineTitle.displayName = 'Timeline.Title';
TimelineBody.displayName = 'Timeline.Body';
export const Timeline = Object.assign(TimelineComponent, {
    Item: TimelineItem,
    Point: TimelinePoint,
    Content: TimelineContent,
    Time: TimelineTime,
    Title: TimelineTitle,
    Body: TimelineBody,
});
