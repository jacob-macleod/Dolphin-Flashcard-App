'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FloatingFocusManager, FloatingList, useListNavigation, useTypeahead } from '@floating-ui/react';
import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronUp } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useBaseFLoating, useFloatingInteractions } from '../../hooks/use-floating';
import { getTheme } from '../../theme-store';
import { Button } from '../Button';
import { DropdownContext } from './DropdownContext';
import { DropdownDivider } from './DropdownDivider';
import { DropdownHeader } from './DropdownHeader';
import { DropdownItem } from './DropdownItem';
const icons = {
    top: HiOutlineChevronUp,
    right: HiOutlineChevronRight,
    bottom: HiOutlineChevronDown,
    left: HiOutlineChevronLeft,
};
const Trigger = ({ refs, children, inline, theme, disabled, setButtonWidth, getReferenceProps, renderTrigger, ...buttonProps }) => {
    const ref = refs.reference;
    const a11yProps = getReferenceProps();
    useEffect(() => {
        if (ref.current) {
            setButtonWidth?.(ref.current.clientWidth);
        }
    }, [ref, setButtonWidth]);
    if (renderTrigger) {
        const triggerElement = renderTrigger(theme);
        return cloneElement(triggerElement, { ref: refs.setReference, disabled, ...a11yProps, ...triggerElement.props });
    }
    return inline ? (_jsx("button", { type: "button", ref: refs.setReference, className: theme?.inlineWrapper, disabled: disabled, ...a11yProps, children: children })) : (_jsx(Button, { ...buttonProps, disabled: disabled, type: "button", ref: refs.setReference, ...a11yProps, children: children }));
};
const DropdownComponent = ({ children, className, dismissOnClick = true, theme: customTheme = {}, renderTrigger, ...props }) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [buttonWidth, setButtonWidth] = useState(undefined);
    const elementsRef = useRef([]);
    const labelsRef = useRef([]);
    const theme = mergeDeep(getTheme().dropdown, customTheme);
    const theirProps = props;
    const dataTestId = props['data-testid'] || 'flowbite-dropdown-target';
    const { placement = props.inline ? 'bottom-start' : 'bottom', trigger = 'click', label, inline, arrowIcon = true, ...buttonProps } = theirProps;
    const handleSelect = useCallback((index) => {
        setSelectedIndex(index);
        setOpen(false);
    }, []);
    const handleTypeaheadMatch = useCallback((index) => {
        if (open) {
            setActiveIndex(index);
        }
        else {
            handleSelect(index);
        }
    }, [open, handleSelect]);
    const { context, floatingStyles, refs } = useBaseFLoating({
        open,
        setOpen,
        placement,
    });
    const listNav = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        onMatch: handleTypeaheadMatch,
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = useFloatingInteractions({
        context,
        role: 'menu',
        trigger,
        interactions: [listNav, typeahead],
    });
    const Icon = useMemo(() => {
        const [p] = placement.split('-');
        return icons[p] ?? HiOutlineChevronDown;
    }, [placement]);
    return (_jsxs(DropdownContext.Provider, { value: { theme, activeIndex, dismissOnClick, getItemProps, handleSelect }, children: [_jsxs(Trigger, { ...buttonProps, refs: refs, inline: inline, theme: theme, "data-testid": dataTestId, className: twMerge(theme.floating.target, buttonProps.className), setButtonWidth: setButtonWidth, getReferenceProps: getReferenceProps, renderTrigger: renderTrigger, children: [label, arrowIcon && _jsx(Icon, { className: theme.arrowIcon })] }), open && (_jsx(FloatingFocusManager, { context: context, modal: false, children: _jsx("div", { ref: refs.setFloating, style: { ...floatingStyles, minWidth: buttonWidth }, "data-testid": "flowbite-dropdown", "aria-expanded": open, ...getFloatingProps({
                        className: twMerge(theme.floating.base, theme.floating.animation, 'duration-100', !open && theme.floating.hidden, theme.floating.style.auto, className),
                    }), children: _jsx(FloatingList, { elementsRef: elementsRef, labelsRef: labelsRef, children: _jsx("ul", { className: theme.content, tabIndex: -1, children: children }) }) }) }))] }));
};
DropdownComponent.displayName = 'Dropdown';
DropdownHeader.displayName = 'Dropdown.Header';
DropdownDivider.displayName = 'Dropdown.Divider';
export const Dropdown = Object.assign(DropdownComponent, {
    Item: DropdownItem,
    Header: DropdownHeader,
    Divider: DropdownDivider,
});
