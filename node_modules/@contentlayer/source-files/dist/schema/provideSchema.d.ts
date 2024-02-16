import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import type { SchemaError } from '../errors/index.js';
import * as LocalSchema from './defs/index.js';
export declare const makeCoreSchema: ({ documentTypeDefs, options, esbuildHash, }: {
    documentTypeDefs: LocalSchema.DocumentTypeDef[];
    options: core.PluginOptions;
    esbuildHash: string;
}) => T.Effect<unknown, SchemaError | utils.HashError, core.SchemaDef>;
//# sourceMappingURL=provideSchema.d.ts.map