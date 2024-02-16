"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const TimelineBody_1 = require("./TimelineBody");
const TimelineContent_1 = require("./TimelineContent");
const TimelineContext_1 = require("./TimelineContext");
const TimelineItem_1 = require("./TimelineItem");
const TimelinePoint_1 = require("./TimelinePoint");
const TimelineTime_1 = require("./TimelineTime");
const TimelineTitle_1 = require("./TimelineTitle");
const TimelineComponent = ({ children, className, horizontal, theme: customTheme = {}, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().timeline, customTheme);
    return ((0, jsx_runtime_1.jsx)(TimelineContext_1.TimelineContext.Provider, { value: { theme, horizontal }, children: (0, jsx_runtime_1.jsx)("ol", { "data-testid": "timeline-component", className: (0, tailwind_merge_1.twMerge)(horizontal && theme.root.direction.horizontal, !horizontal && theme.root.direction.vertical, className), ...props, children: children }) }));
};
TimelineComponent.displayName = 'Timeline';
TimelineItem_1.TimelineItem.displayName = 'Timeline.Item';
TimelinePoint_1.TimelinePoint.displayName = 'Timeline.Point';
TimelineContent_1.TimelineContent.displayName = 'Timeline.Content';
TimelineTime_1.TimelineTime.displayName = 'Timeline.Time';
TimelineTitle_1.TimelineTitle.displayName = 'Timeline.Title';
TimelineBody_1.TimelineBody.displayName = 'Timeline.Body';
exports.Timeline = Object.assign(TimelineComponent, {
    Item: TimelineItem_1.TimelineItem,
    Point: TimelinePoint_1.TimelinePoint,
    Content: TimelineContent_1.TimelineContent,
    Time: TimelineTime_1.TimelineTime,
    Title: TimelineTitle_1.TimelineTitle,
    Body: TimelineBody_1.TimelineBody,
});
