"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Floating_1 = require("../Floating");
/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
const Tooltip = ({ animation = 'duration-300', arrow = true, children, className, content, placement = 'top', style = 'dark', theme: customTheme = {}, trigger = 'hover', ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().tooltip, customTheme);
    return ((0, jsx_runtime_1.jsx)(Floating_1.Floating, { animation: animation, arrow: arrow, content: content, placement: placement, style: style, theme: theme, trigger: trigger, className: className, ...props, children: children }));
};
exports.Tooltip = Tooltip;
exports.Tooltip.displayName = 'Tooltip';
