import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
import { type FlowbiteTableBodyTheme } from './TableBody';
import { type FlowbiteTableHeadTheme } from './TableHead';
import { type FlowbiteTableRowTheme } from './TableRow';
export interface FlowbiteTableTheme {
    root: FlowbiteTableRootTheme;
    head: FlowbiteTableHeadTheme;
    row: FlowbiteTableRowTheme;
    body: FlowbiteTableBodyTheme;
}
export interface FlowbiteTableRootTheme {
    base: string;
    shadow: string;
    wrapper: string;
}
export interface TableProps extends ComponentProps<'table'> {
    striped?: boolean;
    hoverable?: boolean;
    theme?: DeepPartial<FlowbiteTableTheme>;
}
export declare const Table: FC<TableProps> & {
    Head: FC<import("./TableHead").TableHeadProps>;
    Body: FC<import("./TableBody").TableBodyProps>;
    Row: FC<import("./TableRow").TableRowProps>;
    Cell: FC<import("./TableCell").TableCellProps>;
    HeadCell: FC<import("./TableHeadCell").TableHeadCellProps>;
};
