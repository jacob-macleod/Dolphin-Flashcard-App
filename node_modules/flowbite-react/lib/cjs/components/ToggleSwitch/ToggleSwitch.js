"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleSwitch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const ToggleSwitch = ({ checked, className, color = 'blue', sizing = 'md', disabled, label, name, onChange, theme: customTheme = {}, ...props }) => {
    const id = (0, react_1.useId)();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().toggleSwitch, customTheme);
    const toggle = () => onChange(!checked);
    const handleClick = () => {
        toggle();
    };
    const handleOnKeyDown = (event) => {
        if (event.code == 'Enter') {
            event.preventDefault();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [name && checked ? ((0, jsx_runtime_1.jsx)("input", { checked: checked, hidden: true, name: name, readOnly: true, type: "checkbox", className: "sr-only" })) : null, (0, jsx_runtime_1.jsxs)("button", { "aria-checked": checked, "aria-labelledby": `${id}-flowbite-toggleswitch-label`, disabled: disabled, id: `${id}-flowbite-toggleswitch`, onClick: handleClick, onKeyDown: handleOnKeyDown, role: "switch", tabIndex: 0, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.root.base, theme.root.active[disabled ? 'off' : 'on'], className), ...props, children: [(0, jsx_runtime_1.jsx)("div", { "data-testid": "flowbite-toggleswitch-toggle", className: (0, tailwind_merge_1.twMerge)(theme.toggle.base, theme.toggle.checked[checked ? 'on' : 'off'], checked && theme.toggle.checked.color[color], theme.toggle.sizes[sizing]) }), label?.length ? ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-toggleswitch-label", id: `${id}-flowbite-toggleswitch-label`, className: theme.root.label, children: label })) : null] })] }));
};
exports.ToggleSwitch = ToggleSwitch;
exports.ToggleSwitch.displayName = 'ToggleSwitch';
