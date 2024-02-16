"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TimelineContext_1 = require("./TimelineContext");
const TimelineItemContext_1 = require("./TimelineItemContext");
const TimelineItem = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, horizontal } = (0, TimelineContext_1.useTimelineContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.item, customTheme);
    return ((0, jsx_runtime_1.jsx)(TimelineItemContext_1.TimelineItemContext.Provider, { value: { theme }, children: (0, jsx_runtime_1.jsx)("li", { "data-testid": "timeline-item", className: (0, tailwind_merge_1.twMerge)(horizontal && theme.root.horizontal, !horizontal && theme.root.vertical, className), ...props, children: children }) }));
};
exports.TimelineItem = TimelineItem;
