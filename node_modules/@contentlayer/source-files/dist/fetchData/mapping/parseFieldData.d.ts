import type * as core from '@contentlayer/core';
import { T } from '@contentlayer/utils/effect';
import * as zod from 'zod';
import { FetchDataError } from '../../errors/index.js';
import type { HasDocumentContext } from '../DocumentContext.js';
declare const codecMap: {
    boolean: zod.ZodBoolean;
    number: zod.ZodNumber;
    string: zod.ZodString;
    date: zod.ZodString;
    enum: zod.ZodString;
    image: zod.ZodEffects<zod.ZodUnion<[zod.ZodString, zod.ZodObject<{
        src: zod.ZodString;
        alt: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
        src: string;
        alt?: string | undefined;
    }, {
        src: string;
        alt?: string | undefined;
    }>]>, {
        src: string;
        alt?: string | undefined;
    }, string | {
        src: string;
        alt?: string | undefined;
    }>;
    json: zod.ZodAny;
    list: zod.ZodArray<zod.ZodAny, "many">;
    list_polymorphic: zod.ZodArray<zod.ZodAny, "many">;
    markdown: zod.ZodString;
    mdx: zod.ZodString;
    nested: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    nested_polymorphic: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    nested_unnamed: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    reference: zod.ZodString;
    reference_polymorphic: zod.ZodString;
};
export type ParsedFieldData<TFieldType extends core.FieldDefType> = zod.infer<(typeof codecMap)[TFieldType]>;
export declare const parseFieldData: <TFieldType extends "string" | "number" | "boolean" | "markdown" | "mdx" | "list" | "json" | "date" | "image" | "enum" | "nested" | "reference" | "list_polymorphic" | "nested_polymorphic" | "nested_unnamed" | "reference_polymorphic">({ rawData, fieldType, fieldName, }: {
    rawData: unknown;
    fieldType: TFieldType;
    /** Only needed for error handling */
    fieldName: string;
}) => T.Effect<HasDocumentContext, FetchDataError.IncompatibleFieldDataError, ParsedFieldData<TFieldType>>;
export {};
//# sourceMappingURL=parseFieldData.d.ts.map