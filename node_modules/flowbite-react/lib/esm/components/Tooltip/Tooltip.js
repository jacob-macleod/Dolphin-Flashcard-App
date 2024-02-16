import { jsx as _jsx } from "react/jsx-runtime";
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { Floating } from '../Floating';
/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Tooltip = ({ animation = 'duration-300', arrow = true, children, className, content, placement = 'top', style = 'dark', theme: customTheme = {}, trigger = 'hover', ...props }) => {
    const theme = mergeDeep(getTheme().tooltip, customTheme);
    return (_jsx(Floating, { animation: animation, arrow: arrow, content: content, placement: placement, style: style, theme: theme, trigger: trigger, className: className, ...props, children: children }));
};
Tooltip.displayName = 'Tooltip';
