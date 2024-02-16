import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import genericForwardRef from '../../helpers/generic-forward-ref';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { Spinner } from '../Spinner';
import { ButtonBase } from './ButtonBase';
import { ButtonGroup } from './ButtonGroup';
const ButtonComponentFn = ({ children, className, color = 'info', disabled, fullSized, isProcessing = false, processingLabel = 'Loading...', processingSpinner, gradientDuoTone, gradientMonochrome, label, outline = false, pill = false, positionInGroup = 'none', size = 'md', theme: customTheme = {}, ...props }, ref) => {
    const { buttonGroup: groupTheme, button: buttonTheme } = getTheme();
    const theme = mergeDeep(buttonTheme, customTheme);
    const theirProps = props;
    return (_jsx(ButtonBase, { ref: ref, disabled: disabled, className: twMerge(theme.base, disabled && theme.disabled, !gradientDuoTone && !gradientMonochrome && theme.color[color], gradientDuoTone && !gradientMonochrome && theme.gradientDuoTone[gradientDuoTone], !gradientDuoTone && gradientMonochrome && theme.gradient[gradientMonochrome], outline && (theme.outline.color[color] ?? theme.outline.color.default), theme.pill[pill ? 'on' : 'off'], fullSized && theme.fullSized, groupTheme.position[positionInGroup], className), ...theirProps, children: _jsx("span", { className: twMerge(theme.inner.base, theme.outline[outline ? 'on' : 'off'], theme.outline.pill[outline && pill ? 'on' : 'off'], theme.size[size], outline && !theme.outline.color[color] && theme.inner.outline, isProcessing && theme.isProcessing, isProcessing && theme.inner.isProcessingPadding[size], theme.inner.position[positionInGroup]), children: _jsxs(_Fragment, { children: [isProcessing && (_jsx("span", { className: twMerge(theme.spinnerSlot, theme.spinnerLeftPosition[size]), children: processingSpinner || _jsx(Spinner, { size: size }) })), typeof children !== 'undefined' ? (children) : (_jsx("span", { "data-testid": "flowbite-button-label", className: twMerge(theme.label), children: isProcessing ? processingLabel : label }))] }) }) }));
};
ButtonComponentFn.displayName = 'Button';
const ButtonComponent = genericForwardRef(ButtonComponentFn);
export const Button = Object.assign(ButtonComponent, {
    Group: ButtonGroup,
});
