import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const ToggleSwitch = ({ checked, className, color = 'blue', sizing = 'md', disabled, label, name, onChange, theme: customTheme = {}, ...props }) => {
    const id = useId();
    const theme = mergeDeep(getTheme().toggleSwitch, customTheme);
    const toggle = () => onChange(!checked);
    const handleClick = () => {
        toggle();
    };
    const handleOnKeyDown = (event) => {
        if (event.code == 'Enter') {
            event.preventDefault();
        }
    };
    return (_jsxs(_Fragment, { children: [name && checked ? (_jsx("input", { checked: checked, hidden: true, name: name, readOnly: true, type: "checkbox", className: "sr-only" })) : null, _jsxs("button", { "aria-checked": checked, "aria-labelledby": `${id}-flowbite-toggleswitch-label`, disabled: disabled, id: `${id}-flowbite-toggleswitch`, onClick: handleClick, onKeyDown: handleOnKeyDown, role: "switch", tabIndex: 0, type: "button", className: twMerge(theme.root.base, theme.root.active[disabled ? 'off' : 'on'], className), ...props, children: [_jsx("div", { "data-testid": "flowbite-toggleswitch-toggle", className: twMerge(theme.toggle.base, theme.toggle.checked[checked ? 'on' : 'off'], checked && theme.toggle.checked.color[color], theme.toggle.sizes[sizing]) }), label?.length ? (_jsx("span", { "data-testid": "flowbite-toggleswitch-label", id: `${id}-flowbite-toggleswitch-label`, className: theme.root.label, children: label })) : null] })] }));
};
ToggleSwitch.displayName = 'ToggleSwitch';
