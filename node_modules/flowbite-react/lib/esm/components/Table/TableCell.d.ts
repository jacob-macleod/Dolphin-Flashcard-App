import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
export interface FlowbiteTableCellTheme {
    base: string;
}
export interface TableCellProps extends ComponentProps<'td'> {
    theme?: DeepPartial<FlowbiteTableCellTheme>;
}
export declare const TableCell: FC<TableCellProps>;
