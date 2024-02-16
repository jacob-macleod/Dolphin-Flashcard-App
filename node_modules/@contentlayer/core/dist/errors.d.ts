declare const NoConfigFoundError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"NoConfigFoundError", "_tag">;
export declare class NoConfigFoundError extends NoConfigFoundError_base<{
    readonly configPath?: string;
    readonly cwd: string;
}> {
    toString: () => string;
}
declare const ConfigReadError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"ConfigReadError", "_tag">;
export declare class ConfigReadError extends ConfigReadError_base<{
    readonly configPath: string;
    readonly error: unknown;
}> {
    toString: () => string;
}
declare const ConfigNoDefaultExportError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"ConfigNoDefaultExportError", "_tag">;
export declare class ConfigNoDefaultExportError extends ConfigNoDefaultExportError_base<{
    readonly configPath: string;
    readonly availableExports: string[];
}> {
}
declare const SourceFetchDataError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"SourceFetchDataError", "_tag">;
export declare class SourceFetchDataError extends SourceFetchDataError_base<{
    readonly error: any;
    alreadyHandled: boolean;
}> {
    toString: () => string;
    toJSON: () => {
        _tag: "SourceFetchDataError";
        error: string;
        alreadyHandled: boolean;
    };
    static fromJSON: (json: any) => SourceFetchDataError;
}
export type SourceFetchDataErrorJSON = ReturnType<SourceFetchDataError['toJSON']>;
export declare const isSourceFetchDataError: (_: any) => _ is SourceFetchDataError;
declare const SourceProvideSchemaError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"SourceProvideSchemaError", "_tag">;
export declare class SourceProvideSchemaError extends SourceProvideSchemaError_base<{
    readonly error: any;
}> {
    toString: () => string;
    toJSON: () => {
        _tag: "SourceProvideSchemaError";
        error: string;
    };
    static fromJSON: (json: any) => SourceProvideSchemaError;
}
export type SourceProvideSchemaErrorJSON = ReturnType<SourceProvideSchemaError['toJSON']>;
declare const HandledFetchDataError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"HandledFetchDataError", "_tag">;
/**
 * This error is triggered for inconsistent data according to the provided error flags by the user.
 * The error was already handled (i.e. logged to the console) so it can be ignored in the application entry points.
 *
 * NOTE the modeling of this error handling should probably still be improved further.
 */
export declare class HandledFetchDataError extends HandledFetchDataError_base<{}> {
}
declare const EsbuildBinNotFoundError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"EsbuildBinNotFoundError", "_tag">;
export declare class EsbuildBinNotFoundError extends EsbuildBinNotFoundError_base<{}> {
}
declare const SuccessCallbackError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"SuccessCallbackError", "_tag">;
export declare class SuccessCallbackError extends SuccessCallbackError_base<{
    readonly error: any;
}> {
    toString: () => string;
}
export {};
//# sourceMappingURL=errors.d.ts.map