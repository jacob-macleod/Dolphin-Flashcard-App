import type * as core from '@contentlayer/core';
import { T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
export declare const makeDateField: ({ dateString, fieldName, options, }: {
    dateString: string;
    fieldName: string;
    options: core.PluginOptions;
}) => T.Effect<import("@contentlayer/utils/effect").Has<import("../DocumentContext.js").DocumentContext>, FetchDataError.IncompatibleFieldDataError, string>;
//# sourceMappingURL=field-date.d.ts.map