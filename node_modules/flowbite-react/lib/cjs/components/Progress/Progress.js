"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const Progress = ({ className, color = 'cyan', labelProgress = false, labelText = false, progress, progressLabelPosition = 'inside', size = 'md', textLabel = 'progressbar', textLabelPosition = 'inside', theme: customTheme = {}, ...props }) => {
    const id = (0, react_1.useId)();
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().progress, customTheme);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { id: id, "aria-label": textLabel, "aria-valuenow": progress, role: "progressbar", ...props, children: [((textLabel && labelText && textLabelPosition === 'outside') ||
                    (progress > 0 && labelProgress && progressLabelPosition === 'outside')) && ((0, jsx_runtime_1.jsxs)("div", { className: theme.label, "data-testid": "flowbite-progress-outer-label-container", children: [textLabel && labelText && textLabelPosition === 'outside' && ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-progress-outer-text-label", children: textLabel })), labelProgress && progressLabelPosition === 'outside' && ((0, jsx_runtime_1.jsxs)("span", { "data-testid": "flowbite-progress-outer-progress-label", children: [progress, "%"] }))] })), (0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, theme.size[size], className), children: (0, jsx_runtime_1.jsxs)("div", { style: { width: `${progress}%` }, className: (0, tailwind_merge_1.twMerge)(theme.bar, theme.color[color], theme.size[size]), children: [textLabel && labelText && textLabelPosition === 'inside' && ((0, jsx_runtime_1.jsx)("span", { "data-testid": "flowbite-progress-inner-text-label", children: textLabel })), progress > 0 && labelProgress && progressLabelPosition === 'inside' && ((0, jsx_runtime_1.jsxs)("span", { "data-testid": "flowbite-progress-inner-progress-label", children: [progress, "%"] }))] }) })] }) }));
};
exports.Progress = Progress;
exports.Progress.displayName = 'Progress';
