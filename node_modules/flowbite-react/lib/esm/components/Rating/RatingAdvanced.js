import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const RatingAdvanced = ({ children, className, percentFilled = 0, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().ratingAdvanced, customTheme);
    return (_jsxs("div", { className: twMerge(theme.base, className), ...props, children: [_jsx("span", { className: theme.label, children: children }), _jsx("div", { className: theme.progress.base, children: _jsx("div", { className: theme.progress.fill, "data-testid": "flowbite-rating-fill", style: { width: `${percentFilled}%` } }) }), _jsx("span", { className: theme.progress.label, children: `${percentFilled}%` })] }));
};
