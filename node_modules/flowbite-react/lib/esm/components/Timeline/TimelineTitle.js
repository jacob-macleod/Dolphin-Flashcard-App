'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTimelineContentContext } from './TimelineContentContext';
export const TimelineTitle = ({ as: Tag = 'h3', children, className, theme: customTheme = {}, ...props }) => {
    const { theme: contentTheme } = useTimelineContentContext();
    const theme = mergeDeep(contentTheme.title, customTheme);
    return (_jsx(Tag, { className: twMerge(theme.base, className), ...props, children: children }));
};
