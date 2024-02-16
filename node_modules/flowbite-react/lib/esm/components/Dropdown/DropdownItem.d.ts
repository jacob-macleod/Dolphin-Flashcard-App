import type { ComponentProps, ComponentPropsWithoutRef, ElementType, FC } from 'react';
import type { DeepPartial } from '../../types';
export interface FlowbiteDropdownItemTheme {
    container: string;
    base: string;
    icon: string;
}
export type DropdownItemProps<T extends ElementType = 'button'> = {
    as?: T;
    href?: string;
    icon?: FC<ComponentProps<'svg'>>;
    onClick?: () => void;
    theme?: DeepPartial<FlowbiteDropdownItemTheme>;
} & ComponentPropsWithoutRef<T>;
export declare const DropdownItem: <T extends ElementType = "button">({ children, className, icon: Icon, onClick, theme: customTheme, ...props }: DropdownItemProps<T>) => import("react/jsx-runtime").JSX.Element;
