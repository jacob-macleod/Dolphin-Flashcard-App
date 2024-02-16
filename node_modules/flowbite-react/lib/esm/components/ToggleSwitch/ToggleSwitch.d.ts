import type { ComponentProps, FC } from 'react';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean, FlowbiteColors } from '../Flowbite';
import type { FlowbiteTextInputSizes } from '../TextInput';
export interface FlowbiteToggleSwitchTheme {
    root: FlowbiteToggleSwitchRootTheme;
    toggle: FlowbiteToggleSwitchToggleTheme;
}
export interface FlowbiteToggleSwitchRootTheme {
    base: string;
    active: FlowbiteBoolean;
    label: string;
}
export interface FlowbiteToggleSwitchToggleTheme {
    base: string;
    sizes: FlowbiteTextInputSizes;
    checked: FlowbiteBoolean & {
        color: FlowbiteColors;
    };
}
export type ToggleSwitchProps = Omit<ComponentProps<'button'>, 'onChange'> & {
    checked: boolean;
    color?: keyof FlowbiteColors;
    sizing?: keyof FlowbiteTextInputSizes;
    label?: string;
    onChange: (checked: boolean) => void;
    theme?: DeepPartial<FlowbiteToggleSwitchTheme>;
};
export declare const ToggleSwitch: FC<ToggleSwitchProps>;
