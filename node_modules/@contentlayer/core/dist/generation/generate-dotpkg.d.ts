import { fs } from '@contentlayer/utils';
import type { E, HasClock, HasConsole } from '@contentlayer/utils/effect';
import { Either, OT, S, T } from '@contentlayer/utils/effect';
import type { GetContentlayerVersionError } from '@contentlayer/utils/node';
import type { HasCwd } from '../cwd.js';
import type { SourceProvideSchemaError } from '../errors.js';
import { SuccessCallbackError } from '../errors.js';
import * as esbuild from '../getConfig/esbuild.js';
import type { Config } from '../getConfig/index.js';
import type { SourceFetchDataError } from '../index.js';
import type { PluginOptions, SourcePluginType } from '../plugin.js';
import type { SchemaDef } from '../schema/index.js';
export type GenerationOptions = {
    sourcePluginType: SourcePluginType;
    options: PluginOptions;
};
type GenerateDotpkgError = fs.WriteFileError | fs.JsonStringifyError | fs.MkdirError | fs.RmError | SourceProvideSchemaError | SourceFetchDataError | esbuild.EsbuildError | GetContentlayerVersionError | SuccessCallbackError;
export type GenerateInfo = {
    documentCount: number;
};
export declare const logGenerateInfo: (info: GenerateInfo) => T.Effect<HasConsole, never, void>;
export declare const generateDotpkg: ({ config, verbose, }: {
    config: Config;
    verbose: boolean;
}) => T.Effect<OT.HasTracer & HasClock & HasCwd & HasConsole & fs.HasFs, GenerateDotpkgError, GenerateInfo>;
export declare const generateDotpkgStream: ({ config, verbose, isDev, }: {
    config: Config;
    verbose: boolean;
    isDev: boolean;
}) => S.Stream<OT.HasTracer & HasClock & HasCwd & HasConsole & fs.HasFs, never, E.Either<GenerateDotpkgError, GenerateInfo>>;
export declare const makeDataTypes: ({ schemaDef, options }: {
    schemaDef: SchemaDef;
    options: PluginOptions;
}) => string;
export {};
//# sourceMappingURL=generate-dotpkg.d.ts.map