"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TimelineContentContext_1 = require("./TimelineContentContext");
const TimelineContext_1 = require("./TimelineContext");
const TimelineItemContext_1 = require("./TimelineItemContext");
const TimelineContent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { horizontal } = (0, TimelineContext_1.useTimelineContext)();
    const { theme: itemTheme } = (0, TimelineItemContext_1.useTimelineItemContext)();
    const theme = (0, merge_deep_1.mergeDeep)(itemTheme.content, customTheme);
    return ((0, jsx_runtime_1.jsx)(TimelineContentContext_1.TimelineContentContext.Provider, { value: { theme }, children: (0, jsx_runtime_1.jsx)("div", { "data-testid": "timeline-content", className: (0, tailwind_merge_1.twMerge)(horizontal && theme.root.base, className), ...props, children: children }) }));
};
exports.TimelineContent = TimelineContent;
