'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTimelineContentContext } from './TimelineContentContext';
export const TimelineBody = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: contentTheme } = useTimelineContentContext();
    const theme = mergeDeep(contentTheme.body, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, className), ...props, children: children }));
};
