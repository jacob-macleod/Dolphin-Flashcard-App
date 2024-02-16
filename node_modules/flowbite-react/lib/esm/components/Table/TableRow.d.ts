import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
export interface FlowbiteTableRowTheme {
    base: string;
    hovered: string;
    striped: string;
}
export interface TableRowProps extends ComponentProps<'tr'> {
    theme?: DeepPartial<FlowbiteTableRowTheme>;
}
export declare const TableRow: FC<TableRowProps>;
