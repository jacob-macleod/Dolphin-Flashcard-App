'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { useAccordionContext } from './AccordionPanelContext';
export const AccordionContent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { isOpen } = useAccordionContext();
    const theme = mergeDeep(getTheme().accordion.content, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, className), "data-testid": "flowbite-accordion-content", hidden: !isOpen, ...props, children: children }));
};
