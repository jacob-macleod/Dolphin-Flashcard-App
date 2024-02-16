'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTimelineContentContext } from './TimelineContentContext';
export const TimelineTime = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: contentTheme } = useTimelineContentContext();
    const theme = mergeDeep(contentTheme.time, customTheme);
    return (_jsx("time", { className: twMerge(theme.base, className), ...props, children: children }));
};
