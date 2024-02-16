import type * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import { fs } from '@contentlayer/utils';
import { OT, T, These } from '@contentlayer/utils/effect';
import { FetchDataError } from '../errors/index.js';
import type { FilePathPatternMap } from '../index.js';
import type { ContentTypeMap } from '../types.js';
import type { HasDocumentTypeMapState } from './DocumentTypeMap.js';
import type { RawContent } from './types.js';
type ValidateDocumentDataError = FetchDataError.CouldNotDetermineDocumentTypeError | FetchDataError.NoSuchDocumentTypeError | FetchDataError.MissingRequiredFieldsError | FetchDataError.ExtraFieldDataError | FetchDataError.ReferencedFileDoesNotExistError | FetchDataError.IncompatibleFieldDataError | FetchDataError.FileExtensionMismatch;
export declare const validateDocumentData: ({ coreSchemaDef, rawContent, relativeFilePath, filePathPatternMap, options, contentDirPath, contentTypeMap, }: {
    coreSchemaDef: core.SchemaDef;
    rawContent: RawContent;
    /** relativeFilePath just needed for better error handling */
    relativeFilePath: RelativePosixFilePath;
    filePathPatternMap: FilePathPatternMap;
    options: core.PluginOptions;
    contentDirPath: AbsolutePosixFilePath;
    contentTypeMap: ContentTypeMap;
}) => T.Effect<HasDocumentTypeMapState & OT.HasTracer & fs.HasFs, never, These.These<ValidateDocumentDataError, {
    documentTypeDef: core.DocumentTypeDef;
}>>;
export {};
//# sourceMappingURL=validateDocumentData.d.ts.map