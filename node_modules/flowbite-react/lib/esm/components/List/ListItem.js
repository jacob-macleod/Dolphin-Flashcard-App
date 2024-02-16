import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const ListItem = ({ children, className, theme: customTheme = {} }) => {
    const theme = mergeDeep(getTheme().listGroup.item, customTheme);
    return _jsx("li", { className: twMerge(theme.base, className), children: children });
};
