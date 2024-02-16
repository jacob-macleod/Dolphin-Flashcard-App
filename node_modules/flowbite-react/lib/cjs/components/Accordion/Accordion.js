"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accordion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const AccordionContent_1 = require("./AccordionContent");
const AccordionPanel_1 = require("./AccordionPanel");
const AccordionTitle_1 = require("./AccordionTitle");
const AccordionComponent = ({ alwaysOpen = false, arrowIcon = hi_1.HiChevronDown, children, flush = false, collapseAll = false, className, theme: customTheme = {}, ...props }) => {
    const [isOpen, setOpen] = (0, react_1.useState)(collapseAll ? -1 : 0);
    const panels = (0, react_1.useMemo)(() => react_1.Children.map(children, (child, i) => (0, react_1.cloneElement)(child, {
        alwaysOpen,
        arrowIcon,
        flush,
        isOpen: isOpen === i,
        setOpen: () => setOpen(isOpen === i ? -1 : i),
    })), [alwaysOpen, arrowIcon, children, flush, isOpen]);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().accordion.root, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, theme.flush[flush ? 'on' : 'off'], className), "data-testid": "flowbite-accordion", ...props, children: panels }));
};
AccordionComponent.displayName = 'Accordion';
AccordionPanel_1.AccordionPanel.displayName = 'Accordion.Panel';
AccordionTitle_1.AccordionTitle.displayName = 'Accordion.Title';
AccordionContent_1.AccordionContent.displayName = 'Accordion.Content';
exports.Accordion = Object.assign(AccordionComponent, {
    Panel: AccordionPanel_1.AccordionPanel,
    Title: AccordionTitle_1.AccordionTitle,
    Content: AccordionContent_1.AccordionContent,
});
