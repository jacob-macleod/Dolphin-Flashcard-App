'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { TabItem } from './TabItem';
const TabsComponent = forwardRef(({ children, className, onActiveTabChange, style = 'default', theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(getTheme().tabs, customTheme);
    const id = useId();
    const tabs = useMemo(() => Children.map(Children.toArray(children), ({ props }) => props), [children]);
    const tabRefs = useRef([]);
    const [activeTab, setActiveTab] = useState(Math.max(0, tabs.findIndex((tab) => tab.active)));
    const [focusedTab, setFocusedTab] = useState(-1);
    const setActiveTabWithCallback = (activeTab) => {
        setActiveTab(activeTab);
        if (onActiveTabChange)
            onActiveTabChange(activeTab);
    };
    const handleClick = ({ target }) => {
        setActiveTabWithCallback(target);
        setFocusedTab(target);
    };
    const handleKeyboard = ({ event, target }) => {
        if (event.key === 'ArrowLeft') {
            setFocusedTab(Math.max(0, focusedTab - 1));
        }
        if (event.key === 'ArrowRight') {
            setFocusedTab(Math.min(tabs.length - 1, focusedTab + 1));
        }
        if (event.key === 'Enter') {
            setActiveTabWithCallback(target);
            setFocusedTab(target);
        }
    };
    const tabItemStyle = theme.tablist.tabitem.styles[style];
    const tabItemContainerStyle = theme.tabitemcontainer.styles[style];
    useEffect(() => {
        tabRefs.current[focusedTab]?.focus();
    }, [focusedTab]);
    useImperativeHandle(ref, () => ({
        setActiveTab: setActiveTabWithCallback,
    }));
    return (_jsxs("div", { className: twMerge(theme.base, className), children: [_jsx("div", { "aria-label": "Tabs", role: "tablist", className: twMerge(theme.tablist.base, theme.tablist.styles[style], className), ...props, children: tabs.map((tab, index) => (_jsxs("button", { type: "button", "aria-controls": `${id}-tabpanel-${index}`, "aria-selected": index === activeTab, className: twMerge(theme.tablist.tabitem.base, tabItemStyle.base, index === activeTab && tabItemStyle.active.on, index !== activeTab && !tab.disabled && tabItemStyle.active.off), disabled: tab.disabled, id: `${id}-tab-${index}`, onClick: () => handleClick({ target: index }), onKeyDown: (event) => handleKeyboard({ event, target: index }), ref: (element) => (tabRefs.current[index] = element), role: "tab", tabIndex: index === focusedTab ? 0 : -1, style: { zIndex: index === focusedTab ? 2 : 1 }, children: [tab.icon && _jsx(tab.icon, { className: theme.tablist.tabitem.icon }), tab.title] }, index))) }), _jsx("div", { className: twMerge(theme.tabitemcontainer.base, tabItemContainerStyle), children: tabs.map((tab, index) => (_jsx("div", { "aria-labelledby": `${id}-tab-${index}`, className: theme.tabpanel, hidden: index !== activeTab, id: `${id}-tabpanel-${index}`, role: "tabpanel", tabIndex: 0, children: tab.children }, index))) })] }));
});
TabsComponent.displayName = 'Tabs';
export const Tabs = Object.assign(TabsComponent, {
    Item: TabItem,
});
