import { type ComponentPropsWithoutRef, type ElementType } from 'react';
export type ButtonBaseProps<T extends ElementType = 'button'> = {
    as?: T;
    href?: string;
} & ComponentPropsWithoutRef<T>;
export declare const ButtonBase: <T extends ElementType = "button">(props: {
    as?: T | undefined;
    href?: string | undefined;
} & import("react").PropsWithoutRef<import("react").ComponentProps<T>> & import("react").RefAttributes<T>) => JSX.Element;
