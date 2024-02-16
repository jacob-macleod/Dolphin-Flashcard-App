'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { autoUpdate, useFocus } from '@floating-ui/react';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBaseFLoating, useFloatingInteractions } from '../../hooks/use-floating';
import { getArrowPlacement } from './helpers';
/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Floating = ({ animation = 'duration-300', arrow = true, children, className, content, placement = 'top', style = 'dark', theme, trigger = 'hover', minWidth, ...props }) => {
    const arrowRef = useRef(null);
    const [open, setOpen] = useState(false);
    const floatingProperties = useBaseFLoating({
        open,
        placement,
        arrowRef,
        setOpen,
    });
    const { context, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, refs, strategy, update, x, y, } = floatingProperties;
    const focus = useFocus(context);
    const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
        context,
        role: 'tooltip',
        trigger,
        interactions: [focus],
    });
    useEffect(() => {
        if (refs.reference.current && refs.floating.current && open) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [open, refs.floating, refs.reference, update]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: refs.setReference, className: theme.target, "data-testid": "flowbite-tooltip-target", ...getReferenceProps(), children: children }), _jsxs("div", { ref: refs.setFloating, "data-testid": "flowbite-tooltip", ...getFloatingProps({
                    className: twMerge(theme.base, animation && `${theme.animation} ${animation}`, !open && theme.hidden, theme.style[style], className),
                    style: {
                        position: strategy,
                        top: y ?? ' ',
                        left: x ?? ' ',
                        minWidth,
                    },
                    ...props,
                }), children: [_jsx("div", { className: theme.content, children: content }), arrow && (_jsx("div", { className: twMerge(theme.arrow.base, style === 'dark' && theme.arrow.style.dark, style === 'light' && theme.arrow.style.light, style === 'auto' && theme.arrow.style.auto), "data-testid": "flowbite-tooltip-arrow", ref: arrowRef, style: {
                            top: arrowY ?? ' ',
                            left: arrowX ?? ' ',
                            right: ' ',
                            bottom: ' ',
                            [getArrowPlacement({ placement: floatingProperties.placement })]: theme.arrow.placement,
                        }, children: "\u00A0" }))] })] }));
};
