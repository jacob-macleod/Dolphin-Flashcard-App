"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const generic_forward_ref_1 = __importDefault(require("../../helpers/generic-forward-ref"));
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Spinner_1 = require("../Spinner");
const ButtonBase_1 = require("./ButtonBase");
const ButtonGroup_1 = require("./ButtonGroup");
const ButtonComponentFn = ({ children, className, color = 'info', disabled, fullSized, isProcessing = false, processingLabel = 'Loading...', processingSpinner, gradientDuoTone, gradientMonochrome, label, outline = false, pill = false, positionInGroup = 'none', size = 'md', theme: customTheme = {}, ...props }, ref) => {
    const { buttonGroup: groupTheme, button: buttonTheme } = (0, theme_store_1.getTheme)();
    const theme = (0, merge_deep_1.mergeDeep)(buttonTheme, customTheme);
    const theirProps = props;
    return ((0, jsx_runtime_1.jsx)(ButtonBase_1.ButtonBase, { ref: ref, disabled: disabled, className: (0, tailwind_merge_1.twMerge)(theme.base, disabled && theme.disabled, !gradientDuoTone && !gradientMonochrome && theme.color[color], gradientDuoTone && !gradientMonochrome && theme.gradientDuoTone[gradientDuoTone], !gradientDuoTone && gradientMonochrome && theme.gradient[gradientMonochrome], outline && (theme.outline.color[color] ?? theme.outline.color.default), theme.pill[pill ? 'on' : 'off'], fullSized && theme.fullSized, groupTheme.position[positionInGroup], className), ...theirProps, children: (0, jsx_runtime_1.jsx)("span", { className: (0, tailwind_merge_1.twMerge)(theme.inner.base, theme.outline[outline ? 'on' : 'off'], theme.outline.pill[outline && pill ? 'on' : 'off'], theme.size[size], outline && !theme.outline.color[color] && theme.inner.outline, isProcessing && theme.isProcessing, isProcessing && theme.inner.isProcessingPadding[size], theme.inner.position[positionInGroup]), children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isProcessing && ((0, jsx_runtime_1.jsx)("span", { className: (0, tailwind_merge_1.twMerge)(theme.spinnerSlot, theme.spinnerLeftPosition[size]), children: processingSpinner || (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: size }) })), typeof children !== 'undefined' ? (children) : ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-button-label", className: (0, tailwind_merge_1.twMerge)(theme.label), children: isProcessing ? processingLabel : label }))] }) }) }));
};
ButtonComponentFn.displayName = 'Button';
const ButtonComponent = (0, generic_forward_ref_1.default)(ButtonComponentFn);
exports.Button = Object.assign(ButtonComponent, {
    Group: ButtonGroup_1.ButtonGroup,
});
