"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const TimelineContentContext_1 = require("./TimelineContentContext");
const TimelineTitle = ({ as: Tag = 'h3', children, className, theme: customTheme = {}, ...props }) => {
    const { theme: contentTheme } = (0, TimelineContentContext_1.useTimelineContentContext)();
    const theme = (0, merge_deep_1.mergeDeep)(contentTheme.title, customTheme);
    return ((0, jsx_runtime_1.jsx)(Tag, { className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: children }));
};
exports.TimelineTitle = TimelineTitle;
