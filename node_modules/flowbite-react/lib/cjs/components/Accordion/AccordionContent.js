"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const AccordionPanelContext_1 = require("./AccordionPanelContext");
const AccordionContent = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { isOpen } = (0, AccordionPanelContext_1.useAccordionContext)();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().accordion.content, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), "data-testid": "flowbite-accordion-content", hidden: !isOpen, ...props, children: children }));
};
exports.AccordionContent = AccordionContent;
