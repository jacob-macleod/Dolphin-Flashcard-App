'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import ScrollContainer from 'react-indiana-drag-scroll';
import { twMerge } from 'tailwind-merge';
import { isClient } from '../../helpers/is-client';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Carousel = ({ children, indicators = true, leftControl, rightControl, slide = true, draggable = true, slideInterval, className, theme: customTheme = {}, onSlideChange = null, pauseOnHover = false, ...props }) => {
    const theme = mergeDeep(getTheme().carousel, customTheme);
    const isDeviceMobile = isClient() && navigator.userAgent.indexOf('IEMobile') !== -1;
    const carouselContainer = useRef(null);
    const [activeItem, setActiveItem] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const didMountRef = useRef(false);
    const items = useMemo(() => Children.map(children, (child) => cloneElement(child, {
        className: twMerge(theme.item.base, child.props.className),
    })), [children, theme.item.base]);
    const navigateTo = useCallback((item) => () => {
        if (!items)
            return;
        item = (item + items.length) % items.length;
        if (carouselContainer.current) {
            carouselContainer.current.scrollLeft = carouselContainer.current.clientWidth * item;
        }
        setActiveItem(item);
    }, [items]);
    useEffect(() => {
        if (carouselContainer.current && !isDragging && carouselContainer.current.scrollLeft !== 0) {
            setActiveItem(Math.round(carouselContainer.current.scrollLeft / carouselContainer.current.clientWidth));
        }
    }, [isDragging]);
    useEffect(() => {
        if (slide && !(pauseOnHover && isHovering)) {
            const intervalId = setInterval(() => !isDragging && navigateTo(activeItem + 1)(), slideInterval ?? 3000);
            return () => clearInterval(intervalId);
        }
    }, [activeItem, isDragging, navigateTo, slide, slideInterval, pauseOnHover, isHovering]);
    useEffect(() => {
        if (didMountRef.current) {
            onSlideChange && onSlideChange(activeItem);
        }
        else {
            didMountRef.current = true;
        }
    }, [onSlideChange, activeItem]);
    const handleDragging = (dragging) => () => setIsDragging(dragging);
    const setHoveringTrue = useCallback(() => setIsHovering(true), [setIsHovering]);
    const setHoveringFalse = useCallback(() => setIsHovering(false), [setIsHovering]);
    return (_jsxs("div", { className: twMerge(theme.root.base, className), "data-testid": "carousel", onMouseEnter: setHoveringTrue, onMouseLeave: setHoveringFalse, onTouchStart: setHoveringTrue, onTouchEnd: setHoveringFalse, ...props, children: [_jsx(ScrollContainer, { className: twMerge(theme.scrollContainer.base, (isDeviceMobile || !isDragging) && theme.scrollContainer.snap), draggingClassName: "cursor-grab", innerRef: carouselContainer, onEndScroll: handleDragging(false), onStartScroll: handleDragging(draggable), vertical: false, horizontal: draggable, children: items?.map((item, index) => (_jsx("div", { className: theme.item.wrapper[draggable ? 'on' : 'off'], "data-active": activeItem === index, "data-testid": "carousel-item", children: item }, index))) }), indicators && (_jsx("div", { className: theme.indicators.wrapper, children: items?.map((_, index) => (_jsx("button", { className: twMerge(theme.indicators.base, theme.indicators.active[index === activeItem ? 'on' : 'off']), onClick: navigateTo(index), "data-testid": "carousel-indicator", "aria-label": `Slide ${index + 1}` }, index))) })), items && (_jsxs(_Fragment, { children: [_jsx("div", { className: theme.root.leftControl, children: _jsx("button", { className: "group", "data-testid": "carousel-left-control", onClick: navigateTo(activeItem - 1), type: "button", "aria-label": "Previous slide", children: leftControl ? leftControl : _jsx(DefaultLeftControl, { theme: customTheme }) }) }), _jsx("div", { className: theme.root.rightControl, children: _jsx("button", { className: "group", "data-testid": "carousel-right-control", onClick: navigateTo(activeItem + 1), type: "button", "aria-label": "Next slide", children: rightControl ? rightControl : _jsx(DefaultRightControl, { theme: customTheme }) }) })] }))] }));
};
const DefaultLeftControl = ({ theme: customTheme = {} }) => {
    const theme = mergeDeep(getTheme().carousel, customTheme);
    return (_jsx("span", { className: theme.control.base, children: _jsx(HiOutlineChevronLeft, { className: theme.control.icon }) }));
};
const DefaultRightControl = ({ theme: customTheme = {} }) => {
    const theme = mergeDeep(getTheme().carousel, customTheme);
    return (_jsx("span", { className: theme.control.base, children: _jsx(HiOutlineChevronRight, { className: theme.control.icon }) }));
};
Carousel.displayName = 'Carousel';
