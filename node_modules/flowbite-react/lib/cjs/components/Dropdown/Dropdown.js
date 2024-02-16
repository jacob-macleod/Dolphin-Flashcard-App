"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@floating-ui/react");
const react_2 = require("react");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const use_floating_1 = require("../../hooks/use-floating");
const theme_store_1 = require("../../theme-store");
const Button_1 = require("../Button");
const DropdownContext_1 = require("./DropdownContext");
const DropdownDivider_1 = require("./DropdownDivider");
const DropdownHeader_1 = require("./DropdownHeader");
const DropdownItem_1 = require("./DropdownItem");
const icons = {
    top: hi_1.HiOutlineChevronUp,
    right: hi_1.HiOutlineChevronRight,
    bottom: hi_1.HiOutlineChevronDown,
    left: hi_1.HiOutlineChevronLeft,
};
const Trigger = ({ refs, children, inline, theme, disabled, setButtonWidth, getReferenceProps, renderTrigger, ...buttonProps }) => {
    const ref = refs.reference;
    const a11yProps = getReferenceProps();
    (0, react_2.useEffect)(() => {
        if (ref.current) {
            setButtonWidth?.(ref.current.clientWidth);
        }
    }, [ref, setButtonWidth]);
    if (renderTrigger) {
        const triggerElement = renderTrigger(theme);
        return (0, react_2.cloneElement)(triggerElement, { ref: refs.setReference, disabled, ...a11yProps, ...triggerElement.props });
    }
    return inline ? ((0, jsx_runtime_1.jsx)("button", { type: "button", ref: refs.setReference, className: theme?.inlineWrapper, disabled: disabled, ...a11yProps, children: children })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { ...buttonProps, disabled: disabled, type: "button", ref: refs.setReference, ...a11yProps, children: children }));
};
const DropdownComponent = ({ children, className, dismissOnClick = true, theme: customTheme = {}, renderTrigger, ...props }) => {
    const [open, setOpen] = (0, react_2.useState)(false);
    const [activeIndex, setActiveIndex] = (0, react_2.useState)(null);
    const [selectedIndex, setSelectedIndex] = (0, react_2.useState)(null);
    const [buttonWidth, setButtonWidth] = (0, react_2.useState)(undefined);
    const elementsRef = (0, react_2.useRef)([]);
    const labelsRef = (0, react_2.useRef)([]);
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().dropdown, customTheme);
    const theirProps = props;
    const dataTestId = props['data-testid'] || 'flowbite-dropdown-target';
    const { placement = props.inline ? 'bottom-start' : 'bottom', trigger = 'click', label, inline, arrowIcon = true, ...buttonProps } = theirProps;
    const handleSelect = (0, react_2.useCallback)((index) => {
        setSelectedIndex(index);
        setOpen(false);
    }, []);
    const handleTypeaheadMatch = (0, react_2.useCallback)((index) => {
        if (open) {
            setActiveIndex(index);
        }
        else {
            handleSelect(index);
        }
    }, [open, handleSelect]);
    const { context, floatingStyles, refs } = (0, use_floating_1.useBaseFLoating)({
        open,
        setOpen,
        placement,
    });
    const listNav = (0, react_1.useListNavigation)(context, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
    });
    const typeahead = (0, react_1.useTypeahead)(context, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        onMatch: handleTypeaheadMatch,
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = (0, use_floating_1.useFloatingInteractions)({
        context,
        role: 'menu',
        trigger,
        interactions: [listNav, typeahead],
    });
    const Icon = (0, react_2.useMemo)(() => {
        const [p] = placement.split('-');
        return icons[p] ?? hi_1.HiOutlineChevronDown;
    }, [placement]);
    return ((0, jsx_runtime_1.jsxs)(DropdownContext_1.DropdownContext.Provider, { value: { theme, activeIndex, dismissOnClick, getItemProps, handleSelect }, children: [(0, jsx_runtime_1.jsxs)(Trigger, { ...buttonProps, refs: refs, inline: inline, theme: theme, "data-testid": dataTestId, className: (0, tailwind_merge_1.twMerge)(theme.floating.target, buttonProps.className), setButtonWidth: setButtonWidth, getReferenceProps: getReferenceProps, renderTrigger: renderTrigger, children: [label, arrowIcon && (0, jsx_runtime_1.jsx)(Icon, { className: theme.arrowIcon })] }), open && ((0, jsx_runtime_1.jsx)(react_1.FloatingFocusManager, { context: context, modal: false, children: (0, jsx_runtime_1.jsx)("div", { ref: refs.setFloating, style: { ...floatingStyles, minWidth: buttonWidth }, "data-testid": "flowbite-dropdown", "aria-expanded": open, ...getFloatingProps({
                        className: (0, tailwind_merge_1.twMerge)(theme.floating.base, theme.floating.animation, 'duration-100', !open && theme.floating.hidden, theme.floating.style.auto, className),
                    }), children: (0, jsx_runtime_1.jsx)(react_1.FloatingList, { elementsRef: elementsRef, labelsRef: labelsRef, children: (0, jsx_runtime_1.jsx)("ul", { className: theme.content, tabIndex: -1, children: children }) }) }) }))] }));
};
DropdownComponent.displayName = 'Dropdown';
DropdownHeader_1.DropdownHeader.displayName = 'Dropdown.Header';
DropdownDivider_1.DropdownDivider.displayName = 'Dropdown.Divider';
exports.Dropdown = Object.assign(DropdownComponent, {
    Item: DropdownItem_1.DropdownItem,
    Header: DropdownHeader_1.DropdownHeader,
    Divider: DropdownDivider_1.DropdownDivider,
});
