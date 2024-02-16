"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const AccordionPanelContext_1 = require("./AccordionPanelContext");
const AccordionTitle = ({ as: Heading = 'h2', children, className, theme: customTheme = {}, ...props }) => {
    const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = (0, AccordionPanelContext_1.useAccordionContext)();
    const onClick = () => typeof setOpen !== 'undefined' && setOpen();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().accordion.title, customTheme);
    return ((0, jsx_runtime_1.jsxs)("button", { className: (0, tailwind_merge_1.twMerge)(theme.base, theme.flush[flush ? 'on' : 'off'], theme.open[isOpen ? 'on' : 'off'], className), onClick: onClick, type: "button", ...props, children: [(0, jsx_runtime_1.jsx)(Heading, { className: theme.heading, "data-testid": "flowbite-accordion-heading", children: children }), ArrowIcon && ((0, jsx_runtime_1.jsx)(ArrowIcon, { "aria-hidden": true, className: (0, tailwind_merge_1.twMerge)(theme.arrow.base, theme.arrow.open[isOpen ? 'on' : 'off']), "data-testid": "flowbite-accordion-arrow" }))] }));
};
exports.AccordionTitle = AccordionTitle;
