import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const Blockquote = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().blockquote, customTheme);
    return (_jsx("blockquote", { className: twMerge(theme.root.base, className), "data-testid": "flowbite-blockquote", ...props, children: children }));
};
Blockquote.displayName = 'Blockquote';
