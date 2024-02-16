import * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath } from '@contentlayer/utils';
import type { OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { HasDocumentContext } from '../DocumentContext.js';
export declare const makeMdxField: ({ mdxString, options, contentDirPath, isDocumentBodyField, }: {
    mdxString: string;
    options: core.PluginOptions;
    contentDirPath: AbsolutePosixFilePath;
    isDocumentBodyField: boolean;
}) => T.Effect<HasDocumentContext & OT.HasTracer, core.UnexpectedMDXError, core.MDX>;
//# sourceMappingURL=field-mdx.d.ts.map