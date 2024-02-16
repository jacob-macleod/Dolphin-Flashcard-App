import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
import type { FlowbiteTableCellTheme } from './TableCell';
export interface FlowbiteTableBodyTheme {
    base: string;
    cell: FlowbiteTableCellTheme;
}
export interface TableBodyProps extends ComponentProps<'tbody'> {
    theme?: DeepPartial<FlowbiteTableBodyTheme>;
}
export declare const TableBody: FC<TableBodyProps>;
