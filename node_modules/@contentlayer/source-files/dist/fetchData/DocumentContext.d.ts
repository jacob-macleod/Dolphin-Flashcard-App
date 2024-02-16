import type * as core from '@contentlayer/core';
import type { RelativePosixFilePath } from '@contentlayer/utils';
import type { Has } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { RawDocumentData } from '../types.js';
import type { RawContent } from './types.js';
/** `DocumentContext` is meant as a "container object" that provides useful information when processing a document */
export interface DocumentContext {
    readonly rawContent: RawContent;
    readonly relativeFilePath: RelativePosixFilePath;
    readonly rawDocumentData: RawDocumentData;
    readonly documentTypeDef: core.DocumentTypeDef;
}
export declare const DocumentContext: import("@effect-ts/system/Has/index.js").Tag<DocumentContext>;
export declare const provideDocumentContext: (_: DocumentContext) => <R1, E1, A1>(ma: T.Effect<R1 & Has<DocumentContext>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const makeAndProvideDocumentContext: ({ rawContent, relativeFilePath, documentTypeDef, }: Omit<DocumentContext, 'rawDocumentData'>) => <R1, E1, A1>(ma: T.Effect<R1 & Has<DocumentContext>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const getFromDocumentContext: <K extends keyof DocumentContext>(key: K) => T.Effect<Has<DocumentContext>, never, DocumentContext[K]>;
export declare const getDocumentContext: T.Effect<Has<DocumentContext>, never, DocumentContext>;
export type HasDocumentContext = Has<DocumentContext>;
//# sourceMappingURL=DocumentContext.d.ts.map