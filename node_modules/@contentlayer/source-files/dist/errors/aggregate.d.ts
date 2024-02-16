import * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath } from '@contentlayer/utils';
import type { HasConsole } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { Flags } from '../types.js';
import type { FetchDataError } from './index.js';
export declare const handleFetchDataErrors: ({ errors, documentCount, options, flags, schemaDef, contentDirPath, verbose, }: {
    errors: readonly FetchDataError.FetchDataError[];
    documentCount: number;
    options: core.PluginOptions;
    flags: Flags;
    schemaDef: core.SchemaDef;
    contentDirPath: AbsolutePosixFilePath;
    verbose?: boolean | undefined;
}) => T.Effect<HasConsole, core.HandledFetchDataError, void>;
export declare const testOnly_aggregateFetchDataErrors: ({ errors, documentCount, options, flags, schemaDef, contentDirPath, verbose, }: {
    errors: readonly FetchDataError.FetchDataError[];
    documentCount: number;
    options: core.PluginOptions;
    flags: Flags;
    schemaDef: core.SchemaDef;
    contentDirPath: AbsolutePosixFilePath;
    verbose?: boolean | undefined;
}) => string | null;
//# sourceMappingURL=aggregate.d.ts.map