import { jsx as _jsx } from "react/jsx-runtime";
import { Children, cloneElement, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
export const ButtonGroup = ({ children, className, outline, pill, theme: customTheme = {}, ...props }) => {
    const items = useMemo(() => Children.map(children, (child, index) => cloneElement(child, {
        outline,
        pill,
        positionInGroup: index === 0 ? 'start' : index === children.length - 1 ? 'end' : 'middle',
    })), [children, outline, pill]);
    const theme = mergeDeep(getTheme().buttonGroup, customTheme);
    return (_jsx("div", { className: twMerge(theme.base, className), role: "group", ...props, children: items }));
};
ButtonGroup.displayName = 'Button.Group';
