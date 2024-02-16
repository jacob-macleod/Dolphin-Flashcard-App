"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const react_indiana_drag_scroll_1 = __importDefault(require("react-indiana-drag-scroll"));
const tailwind_merge_1 = require("tailwind-merge");
const is_client_1 = require("../../helpers/is-client");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Carousel = ({ children, indicators = true, leftControl, rightControl, slide = true, draggable = true, slideInterval, className, theme: customTheme = {}, onSlideChange = null, pauseOnHover = false, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().carousel, customTheme);
    const isDeviceMobile = (0, is_client_1.isClient)() && navigator.userAgent.indexOf('IEMobile') !== -1;
    const carouselContainer = (0, react_1.useRef)(null);
    const [activeItem, setActiveItem] = (0, react_1.useState)(0);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const didMountRef = (0, react_1.useRef)(false);
    const items = (0, react_1.useMemo)(() => react_1.Children.map(children, (child) => (0, react_1.cloneElement)(child, {
        className: (0, tailwind_merge_1.twMerge)(theme.item.base, child.props.className),
    })), [children, theme.item.base]);
    const navigateTo = (0, react_1.useCallback)((item) => () => {
        if (!items)
            return;
        item = (item + items.length) % items.length;
        if (carouselContainer.current) {
            carouselContainer.current.scrollLeft = carouselContainer.current.clientWidth * item;
        }
        setActiveItem(item);
    }, [items]);
    (0, react_1.useEffect)(() => {
        if (carouselContainer.current && !isDragging && carouselContainer.current.scrollLeft !== 0) {
            setActiveItem(Math.round(carouselContainer.current.scrollLeft / carouselContainer.current.clientWidth));
        }
    }, [isDragging]);
    (0, react_1.useEffect)(() => {
        if (slide && !(pauseOnHover && isHovering)) {
            const intervalId = setInterval(() => !isDragging && navigateTo(activeItem + 1)(), slideInterval ?? 3000);
            return () => clearInterval(intervalId);
        }
    }, [activeItem, isDragging, navigateTo, slide, slideInterval, pauseOnHover, isHovering]);
    (0, react_1.useEffect)(() => {
        if (didMountRef.current) {
            onSlideChange && onSlideChange(activeItem);
        }
        else {
            didMountRef.current = true;
        }
    }, [onSlideChange, activeItem]);
    const handleDragging = (dragging) => () => setIsDragging(dragging);
    const setHoveringTrue = (0, react_1.useCallback)(() => setIsHovering(true), [setIsHovering]);
    const setHoveringFalse = (0, react_1.useCallback)(() => setIsHovering(false), [setIsHovering]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), "data-testid": "carousel", onMouseEnter: setHoveringTrue, onMouseLeave: setHoveringFalse, onTouchStart: setHoveringTrue, onTouchEnd: setHoveringFalse, ...props, children: [(0, jsx_runtime_1.jsx)(react_indiana_drag_scroll_1.default, { className: (0, tailwind_merge_1.twMerge)(theme.scrollContainer.base, (isDeviceMobile || !isDragging) && theme.scrollContainer.snap), draggingClassName: "cursor-grab", innerRef: carouselContainer, onEndScroll: handleDragging(false), onStartScroll: handleDragging(draggable), vertical: false, horizontal: draggable, children: items?.map((item, index) => ((0, jsx_runtime_1.jsx)("div", { className: theme.item.wrapper[draggable ? 'on' : 'off'], "data-active": activeItem === index, "data-testid": "carousel-item", children: item }, index))) }), indicators && ((0, jsx_runtime_1.jsx)("div", { className: theme.indicators.wrapper, children: items?.map((_, index) => ((0, jsx_runtime_1.jsx)("button", { className: (0, tailwind_merge_1.twMerge)(theme.indicators.base, theme.indicators.active[index === activeItem ? 'on' : 'off']), onClick: navigateTo(index), "data-testid": "carousel-indicator", "aria-label": `Slide ${index + 1}` }, index))) })), items && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: theme.root.leftControl, children: (0, jsx_runtime_1.jsx)("button", { className: "group", "data-testid": "carousel-left-control", onClick: navigateTo(activeItem - 1), type: "button", "aria-label": "Previous slide", children: leftControl ? leftControl : (0, jsx_runtime_1.jsx)(DefaultLeftControl, { theme: customTheme }) }) }), (0, jsx_runtime_1.jsx)("div", { className: theme.root.rightControl, children: (0, jsx_runtime_1.jsx)("button", { className: "group", "data-testid": "carousel-right-control", onClick: navigateTo(activeItem + 1), type: "button", "aria-label": "Next slide", children: rightControl ? rightControl : (0, jsx_runtime_1.jsx)(DefaultRightControl, { theme: customTheme }) }) })] }))] }));
};
exports.Carousel = Carousel;
const DefaultLeftControl = ({ theme: customTheme = {} }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().carousel, customTheme);
    return ((0, jsx_runtime_1.jsx)("span", { className: theme.control.base, children: (0, jsx_runtime_1.jsx)(hi_1.HiOutlineChevronLeft, { className: theme.control.icon }) }));
};
const DefaultRightControl = ({ theme: customTheme = {} }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().carousel, customTheme);
    return ((0, jsx_runtime_1.jsx)("span", { className: theme.control.base, children: (0, jsx_runtime_1.jsx)(hi_1.HiOutlineChevronRight, { className: theme.control.icon }) }));
};
exports.Carousel.displayName = 'Carousel';
