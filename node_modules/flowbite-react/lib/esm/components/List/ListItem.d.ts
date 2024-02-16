import type { FC, PropsWithChildren } from 'react';
import type { DeepPartial } from '../../types';
export interface FlowbiteListItemTheme {
    base: string;
}
export interface ListItemProps extends PropsWithChildren {
    theme?: DeepPartial<FlowbiteListItemTheme>;
    className?: string;
}
export declare const ListItem: FC<ListItemProps>;
