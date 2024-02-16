"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinePoint = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TimelineContext_1 = require("./TimelineContext");
const TimelineItemContext_1 = require("./TimelineItemContext");
const TimelinePoint = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
    const { horizontal } = (0, TimelineContext_1.useTimelineContext)();
    const { theme: itemTheme } = (0, TimelineItemContext_1.useTimelineItemContext)();
    const theme = (0, merge_deep_1.mergeDeep)(itemTheme.point, customTheme);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "timeline-point", className: (0, tailwind_merge_1.twMerge)(horizontal && theme.horizontal, !horizontal && theme.vertical, className), ...props, children: [children, Icon ? ((0, jsx_runtime_1.jsx)("span", { className: (0, tailwind_merge_1.twMerge)(theme.marker.icon.wrapper), children: (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": true, className: (0, tailwind_merge_1.twMerge)(theme.marker.icon.base) }) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(horizontal && theme.marker.base.horizontal, !horizontal && theme.marker.base.vertical) })), horizontal && (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.line) })] }));
};
exports.TimelinePoint = TimelinePoint;
