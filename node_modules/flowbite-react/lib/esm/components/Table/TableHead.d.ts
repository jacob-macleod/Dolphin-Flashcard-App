import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
import type { FlowbiteTableHeadCellTheme } from './TableHeadCell';
export interface FlowbiteTableHeadTheme {
    base: string;
    cell: FlowbiteTableHeadCellTheme;
}
export interface TableHeadProps extends ComponentProps<'thead'> {
    theme?: DeepPartial<FlowbiteTableHeadTheme>;
}
export declare const TableHead: FC<TableHeadProps>;
