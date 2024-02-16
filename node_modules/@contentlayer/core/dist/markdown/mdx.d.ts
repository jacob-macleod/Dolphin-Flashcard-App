import { OT, T } from '@contentlayer/utils/effect';
import type { RawDocumentData } from '../data-types.js';
import type { MDXOptions } from '../plugin.js';
export declare const bundleMDX: ({ mdxString, options, contentDirPath, rawDocumentData, }: {
    mdxString: string;
    options?: MDXOptions | undefined;
    contentDirPath: string;
    rawDocumentData: RawDocumentData;
}) => T.Effect<OT.HasTracer, UnexpectedMDXError, string>;
declare const UnexpectedMDXError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"UnexpectedMDXError", "_tag">;
export declare class UnexpectedMDXError extends UnexpectedMDXError_base<{
    readonly error: unknown;
}> {
    toString: () => string;
}
export {};
//# sourceMappingURL=mdx.d.ts.map