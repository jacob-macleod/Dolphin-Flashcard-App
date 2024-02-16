import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
export interface FlowbiteTableHeadCellTheme {
    base: string;
}
export interface TableHeadCellProps extends ComponentProps<'th'> {
    theme?: DeepPartial<FlowbiteTableHeadCellTheme>;
}
export declare const TableHeadCell: FC<TableHeadCellProps>;
