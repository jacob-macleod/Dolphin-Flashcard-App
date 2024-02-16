import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Progress = ({ className, color = 'cyan', labelProgress = false, labelText = false, progress, progressLabelPosition = 'inside', size = 'md', textLabel = 'progressbar', textLabelPosition = 'inside', theme: customTheme = {}, ...props }) => {
    const id = useId();
    const theme = mergeDeep(getTheme().progress, customTheme);
    return (_jsx(_Fragment, { children: _jsxs("div", { id: id, "aria-label": textLabel, "aria-valuenow": progress, role: "progressbar", ...props, children: [((textLabel && labelText && textLabelPosition === 'outside') ||
                    (progress > 0 && labelProgress && progressLabelPosition === 'outside')) && (_jsxs("div", { className: theme.label, "data-testid": "flowbite-progress-outer-label-container", children: [textLabel && labelText && textLabelPosition === 'outside' && (_jsx("span", { "data-testid": "flowbite-progress-outer-text-label", children: textLabel })), labelProgress && progressLabelPosition === 'outside' && (_jsxs("span", { "data-testid": "flowbite-progress-outer-progress-label", children: [progress, "%"] }))] })), _jsx("div", { className: twMerge(theme.base, theme.size[size], className), children: _jsxs("div", { style: { width: `${progress}%` }, className: twMerge(theme.bar, theme.color[color], theme.size[size]), children: [textLabel && labelText && textLabelPosition === 'inside' && (_jsx("span", { "data-testid": "flowbite-progress-inner-text-label", children: textLabel })), progress > 0 && labelProgress && progressLabelPosition === 'inside' && (_jsxs("span", { "data-testid": "flowbite-progress-inner-progress-label", children: [progress, "%"] }))] }) })] }) }));
};
Progress.displayName = 'Progress';
