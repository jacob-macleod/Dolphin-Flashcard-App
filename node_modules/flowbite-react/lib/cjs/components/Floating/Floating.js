"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floating = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@floating-ui/react");
const react_2 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const use_floating_1 = require("../../hooks/use-floating");
const helpers_1 = require("./helpers");
/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
const Floating = ({ animation = 'duration-300', arrow = true, children, className, content, placement = 'top', style = 'dark', theme, trigger = 'hover', minWidth, ...props }) => {
    const arrowRef = (0, react_2.useRef)(null);
    const [open, setOpen] = (0, react_2.useState)(false);
    const floatingProperties = (0, use_floating_1.useBaseFLoating)({
        open,
        placement,
        arrowRef,
        setOpen,
    });
    const { context, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, refs, strategy, update, x, y, } = floatingProperties;
    const focus = (0, react_1.useFocus)(context);
    const { getFloatingProps, getReferenceProps } = (0, use_floating_1.useFloatingInteractions)({
        context,
        role: 'tooltip',
        trigger,
        interactions: [focus],
    });
    (0, react_2.useEffect)(() => {
        if (refs.reference.current && refs.floating.current && open) {
            return (0, react_1.autoUpdate)(refs.reference.current, refs.floating.current, update);
        }
    }, [open, refs.floating, refs.reference, update]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: refs.setReference, className: theme.target, "data-testid": "flowbite-tooltip-target", ...getReferenceProps(), children: children }), (0, jsx_runtime_1.jsxs)("div", { ref: refs.setFloating, "data-testid": "flowbite-tooltip", ...getFloatingProps({
                    className: (0, tailwind_merge_1.twMerge)(theme.base, animation && `${theme.animation} ${animation}`, !open && theme.hidden, theme.style[style], className),
                    style: {
                        position: strategy,
                        top: y ?? ' ',
                        left: x ?? ' ',
                        minWidth,
                    },
                    ...props,
                }), children: [(0, jsx_runtime_1.jsx)("div", { className: theme.content, children: content }), arrow && ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.arrow.base, style === 'dark' && theme.arrow.style.dark, style === 'light' && theme.arrow.style.light, style === 'auto' && theme.arrow.style.auto), "data-testid": "flowbite-tooltip-arrow", ref: arrowRef, style: {
                            top: arrowY ?? ' ',
                            left: arrowX ?? ' ',
                            right: ' ',
                            bottom: ' ',
                            [(0, helpers_1.getArrowPlacement)({ placement: floatingProperties.placement })]: theme.arrow.placement,
                        }, children: "\u00A0" }))] })] }));
};
exports.Floating = Floating;
