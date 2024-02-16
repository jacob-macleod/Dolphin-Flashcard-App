import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { ListItem } from './ListItem';
const ListComponent = ({ children, className, unstyled, nested, ordered, horizontal, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(getTheme().list, customTheme);
    const Component = ordered ? 'ol' : 'ul';
    return (_jsx(Component, { className: twMerge(theme.root.base, theme.root.ordered[ordered ? 'on' : 'off'], unstyled && theme.root.unstyled, nested && theme.root.nested, horizontal && theme.root.horizontal, className), ...props, children: children }));
};
ListComponent.displayName = 'List';
ListItem.displayName = 'List.Item';
export const List = Object.assign(ListComponent, { Item: ListItem });
