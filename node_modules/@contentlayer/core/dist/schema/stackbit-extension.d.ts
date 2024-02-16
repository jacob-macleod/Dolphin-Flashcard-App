import type { GetFieldNamesForDefinitionGen } from '../gen.js';
type KnownFieldNames<DefName extends string> = GetFieldNamesForDefinitionGen<DefName>;
export declare namespace StackbitExtension {
    type Config = {
        pagesDir?: string;
        dataDir?: string;
        dirPath?: string;
    };
    /** Extends a document or object defintion with Stackbit specific properties */
    type TypeExtension<DefName extends string = string> = {
        fieldGroups?: FieldGroup[];
        fields?: Partial<Record<KnownFieldNames<DefName>, FieldExtension>> | Record<string, FieldExtension>;
        /** the name of the field that will be used as a title of an object */
        labelField?: string;
        label?: string;
        folder?: string;
        file?: string;
        match?: string | string[];
    };
    type FieldGroup = {
        name: string;
        label: string;
    };
    type FieldExtension = {
        label?: string;
        const?: any;
        /** Users will not be able to edit hidden fields, therefore when hiding a field you should specify the default or const properties to populate these fields when new objects are created. */
        hidden?: boolean;
        group?: string;
        /** @default "content" */
        control?: Control;
    };
    type Control = ControlImageGallery | ControlColorPallete;
    type ControlImageGallery = {
        type: 'image-gallery';
        options: ControlImageGalleryOption;
    };
    type ControlImageGalleryOption = {};
    type ControlColorPallete = {
        type: 'color-pallete';
        options: ControlColorPalleteOption[];
    };
    type ControlColorPalleteOption = {
        value: string;
        backgroundColor: string;
        textColor?: string;
        borderColor?: string;
        borderRadius?: number;
    };
    type ControlType = Control['type'];
}
export {};
//# sourceMappingURL=stackbit-extension.d.ts.map