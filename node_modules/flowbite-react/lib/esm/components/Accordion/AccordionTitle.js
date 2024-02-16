'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { useAccordionContext } from './AccordionPanelContext';
export const AccordionTitle = ({ as: Heading = 'h2', children, className, theme: customTheme = {}, ...props }) => {
    const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
    const onClick = () => typeof setOpen !== 'undefined' && setOpen();
    const theme = mergeDeep(getTheme().accordion.title, customTheme);
    return (_jsxs("button", { className: twMerge(theme.base, theme.flush[flush ? 'on' : 'off'], theme.open[isOpen ? 'on' : 'off'], className), onClick: onClick, type: "button", ...props, children: [_jsx(Heading, { className: theme.heading, "data-testid": "flowbite-accordion-heading", children: children }), ArrowIcon && (_jsx(ArrowIcon, { "aria-hidden": true, className: twMerge(theme.arrow.base, theme.arrow.open[isOpen ? 'on' : 'off']), "data-testid": "flowbite-accordion-arrow" }))] }));
};
