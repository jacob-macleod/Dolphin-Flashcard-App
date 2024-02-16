import type { HasConsole } from '@contentlayer/utils/effect';
import { OT, T } from '@contentlayer/utils/effect';
import type { RawDocumentData } from '../data-types.js';
import type { MarkdownOptions, MarkdownUnifiedBuilderCallback } from '../plugin.js';
export declare const markdownToHtml: ({ mdString, options, rawDocumentData, }: {
    mdString: string;
    options?: MarkdownOptions | MarkdownUnifiedBuilderCallback | undefined;
    rawDocumentData: RawDocumentData;
}) => T.Effect<OT.HasTracer & HasConsole, UnexpectedMarkdownError, string>;
declare const UnexpectedMarkdownError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"UnexpectedMarkdownError", "_tag">;
export declare class UnexpectedMarkdownError extends UnexpectedMarkdownError_base<{
    readonly error: unknown;
}> {
    toString: () => string;
}
export {};
//# sourceMappingURL=markdown.d.ts.map