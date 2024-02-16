import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { type ReactNode } from 'react';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteGradientColors, FlowbiteGradientDuoToneColors, FlowbiteSizes } from '../Flowbite';
import type { PositionInButtonGroup } from './ButtonGroup';
export interface FlowbiteButtonTheme {
    base: string;
    fullSized: string;
    color: FlowbiteColors;
    disabled: string;
    isProcessing: string;
    spinnerSlot: string;
    spinnerLeftPosition: ButtonSizes;
    gradient: ButtonGradientColors;
    gradientDuoTone: ButtonGradientDuoToneColors;
    inner: FlowbiteButtonInnerTheme;
    label: string;
    outline: FlowbiteButtonOutlineTheme;
    pill: FlowbiteBoolean;
    size: ButtonSizes;
}
export interface FlowbiteButtonInnerTheme {
    base: string;
    position: PositionInButtonGroup;
    outline: string;
    isProcessingPadding: ButtonSizes;
}
export interface FlowbiteButtonOutlineTheme extends FlowbiteBoolean {
    color: ButtonOutlineColors;
    pill: FlowbiteBoolean;
}
export interface ButtonColors extends Pick<FlowbiteColors, 'dark' | 'failure' | 'gray' | 'info' | 'light' | 'purple' | 'success' | 'warning'> {
    [key: string]: string;
}
export interface ButtonGradientColors extends FlowbiteGradientColors {
    [key: string]: string;
}
export interface ButtonGradientDuoToneColors extends FlowbiteGradientDuoToneColors {
    [key: string]: string;
}
export interface ButtonOutlineColors extends Pick<FlowbiteColors, 'gray'> {
    [key: string]: string;
}
export interface ButtonSizes extends Pick<FlowbiteSizes, 'xs' | 'sm' | 'lg' | 'xl'> {
    [key: string]: string;
}
export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T | null;
    href?: string;
    color?: keyof FlowbiteColors;
    fullSized?: boolean;
    gradientDuoTone?: keyof ButtonGradientDuoToneColors;
    gradientMonochrome?: keyof ButtonGradientColors;
    target?: string;
    isProcessing?: boolean;
    processingLabel?: string;
    processingSpinner?: ReactNode;
    label?: ReactNode;
    outline?: boolean;
    pill?: boolean;
    positionInGroup?: keyof PositionInButtonGroup;
    size?: keyof ButtonSizes;
    theme?: DeepPartial<FlowbiteButtonTheme>;
} & ComponentPropsWithoutRef<T>;
export declare const Button: (<T extends ElementType = "button">(props: {
    as?: T | null | undefined;
    href?: string | undefined;
    color?: keyof FlowbiteColors | undefined;
    fullSized?: boolean | undefined;
    gradientDuoTone?: keyof ButtonGradientDuoToneColors | undefined;
    gradientMonochrome?: keyof ButtonGradientColors | undefined;
    target?: string | undefined;
    isProcessing?: boolean | undefined;
    processingLabel?: string | undefined;
    processingSpinner?: ReactNode;
    label?: ReactNode;
    outline?: boolean | undefined;
    pill?: boolean | undefined;
    positionInGroup?: keyof PositionInButtonGroup | undefined;
    size?: keyof ButtonSizes | undefined;
    theme?: {
        base?: string | undefined;
        fullSized?: string | undefined;
        color?: {
            [x: string]: string | undefined;
            blue?: string | undefined;
            cyan?: string | undefined;
            dark?: string | undefined;
            gray?: string | undefined;
            green?: string | undefined;
            indigo?: string | undefined;
            light?: string | undefined;
            lime?: string | undefined;
            pink?: string | undefined;
            purple?: string | undefined;
            red?: string | undefined;
            teal?: string | undefined;
            yellow?: string | undefined;
            info?: string | undefined;
            failure?: string | undefined;
            success?: string | undefined;
            warning?: string | undefined;
        } | undefined;
        disabled?: string | undefined;
        isProcessing?: string | undefined;
        spinnerSlot?: string | undefined;
        spinnerLeftPosition?: {
            [x: string]: string | undefined;
            xs?: string | undefined;
            sm?: string | undefined;
            lg?: string | undefined;
            xl?: string | undefined;
        } | undefined;
        gradient?: {
            [x: string]: string | undefined;
            cyan?: string | undefined;
            lime?: string | undefined;
            pink?: string | undefined;
            purple?: string | undefined;
            teal?: string | undefined;
            info?: string | undefined;
            failure?: string | undefined;
            success?: string | undefined;
        } | undefined;
        gradientDuoTone?: {
            [x: string]: string | undefined;
            cyanToBlue?: string | undefined;
            greenToBlue?: string | undefined;
            pinkToOrange?: string | undefined;
            purpleToBlue?: string | undefined;
            purpleToPink?: string | undefined;
            redToYellow?: string | undefined;
            tealToLime?: string | undefined;
        } | undefined;
        inner?: {
            base?: string | undefined;
            position?: {
                none?: string | undefined;
                start?: string | undefined;
                middle?: string | undefined;
                end?: string | undefined;
            } | undefined;
            outline?: string | undefined;
            isProcessingPadding?: {
                [x: string]: string | undefined;
                xs?: string | undefined;
                sm?: string | undefined;
                lg?: string | undefined;
                xl?: string | undefined;
            } | undefined;
        } | undefined;
        label?: string | undefined;
        outline?: {
            color?: {
                [x: string]: string | undefined;
                gray?: string | undefined;
            } | undefined;
            pill?: {
                off?: string | undefined;
                on?: string | undefined;
            } | undefined;
            off?: string | undefined;
            on?: string | undefined;
        } | undefined;
        pill?: {
            off?: string | undefined;
            on?: string | undefined;
        } | undefined;
        size?: {
            [x: string]: string | undefined;
            xs?: string | undefined;
            sm?: string | undefined;
            lg?: string | undefined;
            xl?: string | undefined;
        } | undefined;
    } | undefined;
} & import("react").PropsWithoutRef<import("react").ComponentProps<T>> & import("react").RefAttributes<T>) => JSX.Element) & {
    Group: import("react").FC<import("./ButtonGroup").ButtonGroupProps>;
};
