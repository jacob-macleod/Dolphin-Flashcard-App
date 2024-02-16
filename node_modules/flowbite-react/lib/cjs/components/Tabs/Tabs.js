"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const TabItem_1 = require("./TabItem");
const TabsComponent = (0, react_1.forwardRef)(({ children, className, onActiveTabChange, style = 'default', theme: customTheme = {}, ...props }, ref) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().tabs, customTheme);
    const id = (0, react_1.useId)();
    const tabs = (0, react_1.useMemo)(() => react_1.Children.map(react_1.Children.toArray(children), ({ props }) => props), [children]);
    const tabRefs = (0, react_1.useRef)([]);
    const [activeTab, setActiveTab] = (0, react_1.useState)(Math.max(0, tabs.findIndex((tab) => tab.active)));
    const [focusedTab, setFocusedTab] = (0, react_1.useState)(-1);
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
    (0, react_1.useEffect)(() => {
        tabRefs.current[focusedTab]?.focus();
    }, [focusedTab]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        setActiveTab: setActiveTabWithCallback,
    }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), children: [(0, jsx_runtime_1.jsx)("div", { "aria-label": "Tabs", role: "tablist", className: (0, tailwind_merge_1.twMerge)(theme.tablist.base, theme.tablist.styles[style], className), ...props, children: tabs.map((tab, index) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-controls": `${id}-tabpanel-${index}`, "aria-selected": index === activeTab, className: (0, tailwind_merge_1.twMerge)(theme.tablist.tabitem.base, tabItemStyle.base, index === activeTab && tabItemStyle.active.on, index !== activeTab && !tab.disabled && tabItemStyle.active.off), disabled: tab.disabled, id: `${id}-tab-${index}`, onClick: () => handleClick({ target: index }), onKeyDown: (event) => handleKeyboard({ event, target: index }), ref: (element) => (tabRefs.current[index] = element), role: "tab", tabIndex: index === focusedTab ? 0 : -1, style: { zIndex: index === focusedTab ? 2 : 1 }, children: [tab.icon && (0, jsx_runtime_1.jsx)(tab.icon, { className: theme.tablist.tabitem.icon }), tab.title] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.tabitemcontainer.base, tabItemContainerStyle), children: tabs.map((tab, index) => ((0, jsx_runtime_1.jsx)("div", { "aria-labelledby": `${id}-tab-${index}`, className: theme.tabpanel, hidden: index !== activeTab, id: `${id}-tabpanel-${index}`, role: "tabpanel", tabIndex: 0, children: tab.children }, index))) })] }));
});
TabsComponent.displayName = 'Tabs';
exports.Tabs = Object.assign(TabsComponent, {
    Item: TabItem_1.TabItem,
});
