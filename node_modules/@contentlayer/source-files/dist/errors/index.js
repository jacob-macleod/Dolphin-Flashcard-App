import { errorToString, pattern } from '@contentlayer/utils';
import { pipe, T, Tagged } from '@contentlayer/utils/effect';
import { getDocumentContext } from '../fetchData/DocumentContext.js';
import { handleFetchDataErrors } from './aggregate.js';
export var FetchDataError;
(function (FetchDataError) {
    FetchDataError.handleErrors = handleFetchDataErrors;
    class InvalidFrontmatterError extends Tagged('InvalidFrontmatterError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Invalid frontmatter data found for ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.InvalidFrontmatterError = InvalidFrontmatterError;
    class InvalidMarkdownFileError extends Tagged('InvalidMarkdownFileError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Invalid markdown in ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.InvalidMarkdownFileError = InvalidMarkdownFileError;
    class InvalidYamlFileError extends Tagged('InvalidYamlFileError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Invalid YAML data in ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.InvalidYamlFileError = InvalidYamlFileError;
    class InvalidJsonFileError extends Tagged('InvalidJsonFileError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Invalid JSON data in ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.InvalidJsonFileError = InvalidJsonFileError;
    class ImageError extends Tagged('ImageError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Error for ${errorCount} image fields.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" with field "${this.fieldDef.name}: ${this.imagePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.ImageError = ImageError;
    class ComputedValueError extends Tagged('ComputedValueError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Error during computed field exection for ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.documentFilePath}" failed with ${errorToString(this.error)}`;
        }
    }
    FetchDataError.ComputedValueError = ComputedValueError;
    class UnsupportedFileExtension extends Tagged('UnsupportedFileExtension') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Found unsupported file extensions for ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => `"${this.filePath}" uses "${this.extension}"`;
        }
    }
    FetchDataError.UnsupportedFileExtension = UnsupportedFileExtension;
    class FileExtensionMismatch extends Tagged('FileExtensionMismatch') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, skippingMessage }) => `File extension not compatible with \`contentType\` for ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => {
                const expectedFileExtensions = pattern
                    .match(this.contentType)
                    .with('markdown', () => ['md', 'mdx'])
                    .with('mdx', () => ['mdx', 'mdx'])
                    .with('data', () => ['json', 'yaml', 'yml'])
                    .exhaustive();
                return `"${this.filePath}" ends with "${this.extension}" but expected to be one of "${expectedFileExtensions.join(', ')}" as defined \`contentType\` is "${this.contentType}"`;
            };
        }
    }
    FetchDataError.FileExtensionMismatch = FileExtensionMismatch;
    class CouldNotDetermineDocumentTypeError extends Tagged('CouldNotDetermineDocumentTypeError') {
        constructor() {
            super(...arguments);
            this.category = 'UnknownDocument';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, options, schemaDef, skippingMessage }) => {
                const validTypeNames = Object.keys(schemaDef.documentTypeDefMap).join(', ');
                return `\
Couldn't determine the document type for ${errorCount} documents.${skippingMessage}

Please either define a filePathPattern for the given document type definition \
or provide a valid value for the type field (i.e. the field "${options.fieldOptions.typeFieldName}" needs to be \
one of the following document type names: ${validTypeNames}).`;
            };
            this.renderLine = () => `${this.documentFilePath}`;
        }
    }
    FetchDataError.CouldNotDetermineDocumentTypeError = CouldNotDetermineDocumentTypeError;
    class NoSuchDocumentTypeError extends Tagged('NoSuchDocumentTypeError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount, schemaDef, skippingMessage }) => {
                const validTypeNames = Object.keys(schemaDef.documentTypeDefMap).join(', ');
                return `\
Couldn't find document type definitions provided by name for ${errorCount} documents.${skippingMessage}

Please use one of the following document type names: ${validTypeNames}.\
`;
            };
            this.renderLine = () => `${this.documentFilePath} (Used type name: "${this.documentTypeName}")`;
        }
    }
    FetchDataError.NoSuchDocumentTypeError = NoSuchDocumentTypeError;
    class NoSuchNestedDocumentTypeError extends Tagged('NoSuchNestedDocumentTypeError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => {
                return `\
Couldn't find nested document type definitions provided by name for ${errorCount} documents.${skippingMessage}\
`;
            };
            this.renderLine = () => {
                const validTypeNames = this.validNestedTypeNames.join(', ');
                return `${this.documentFilePath} (Used type name "${this.nestedTypeName}" for field "${this.fieldName}". Please use one of the following nested document type names: ${validTypeNames}`;
            };
        }
    }
    FetchDataError.NoSuchNestedDocumentTypeError = NoSuchNestedDocumentTypeError;
    class MissingRequiredFieldsError extends Tagged('MissingRequiredFieldsError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => `Missing required fields for ${errorCount} documents.${skippingMessage}`;
            this.renderLine = () => {
                const misingRequiredFieldsStr = this.fieldDefsWithMissingData
                    .map((fieldDef) => `  • ${fieldDef.name}: ${fieldDef.type}`)
                    .join('\n');
                return `\
"${this.documentFilePath}" (of type "${this.documentTypeDef.name}") is missing the following required fields:
${misingRequiredFieldsStr}\
`;
            };
        }
    }
    FetchDataError.MissingRequiredFieldsError = MissingRequiredFieldsError;
    class ExtraFieldDataError extends Tagged('ExtraFieldDataError') {
        constructor() {
            super(...arguments);
            this.category = 'ExtraFieldData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => `\
  ${errorCount} documents contain field data which isn't defined in the document type definition.${skippingMessage}`;
            this.renderLine = () => {
                const extraFields = this.extraFieldEntries
                    .map(([key, value]) => `  • ${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                return `"${this.documentFilePath}" of type "${this.documentTypeDef.name}" has the following extra fields:
${extraFields} `;
            };
        }
    }
    FetchDataError.ExtraFieldDataError = ExtraFieldDataError;
    class ReferencedFileDoesNotExistError extends Tagged('ReferencedFileDoesNotExistError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, contentDirPath, skippingMessage }) => `\
${errorCount} documents contain file references which don't exist.${skippingMessage}

File paths have to be relative to \`contentDirPath\`: "${contentDirPath}")`;
            this.renderLine = () => {
                return `"${this.documentFilePath}" of type "${this.documentTypeDef.name}" with field "${this.fieldName}" references the file "${this.referencedFilePath}" which doesn't exist.`;
            };
        }
    }
    FetchDataError.ReferencedFileDoesNotExistError = ReferencedFileDoesNotExistError;
    class IncompatibleFieldDataError extends Tagged('IncompatibleFieldDataError') {
        constructor() {
            super(...arguments);
            this.category = 'MissingOrIncompatibleData';
            this.renderHeadline = ({ errorCount, skippingMessage }) => `\
${errorCount} documents contain field data which didn't match the structure defined in the document type definition.${skippingMessage}`;
            this.renderLine = () => {
                const incompatibleFields = this.incompatibleFieldData
                    .map(([key, value]) => `  • ${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                return `"${this.documentFilePath}" of type "${this.documentTypeDef.name}" has the following incompatible fields:
${incompatibleFields} `;
            };
        }
    }
    IncompatibleFieldDataError.fail = ({ incompatibleFieldData, }) => pipe(getDocumentContext, T.chain((documentContext) => T.fail(new FetchDataError.IncompatibleFieldDataError({
        documentFilePath: documentContext.relativeFilePath,
        documentTypeDef: documentContext.documentTypeDef,
        incompatibleFieldData,
    }))));
    FetchDataError.IncompatibleFieldDataError = IncompatibleFieldDataError;
    class SingletonDocumentNotFoundError extends Tagged('SingletonDocumentNotFoundError') {
        constructor() {
            super(...arguments);
            this.category = 'SingletonDocumentNotFound';
            this.renderHeadline = ({ errorCount }) => `\
Couldn't find a document for ${errorCount} singleton document types`;
            this.renderLine = () => {
                const filePathInfo = this.filePath ? ` at provided file path "${this.filePath}"` : ``;
                return `Couldn't find a document for document type "${this.documentTypeDef.name}"${filePathInfo}`;
            };
        }
    }
    FetchDataError.SingletonDocumentNotFoundError = SingletonDocumentNotFoundError;
    class UnexpectedError extends Tagged('UnexpectedError') {
        constructor() {
            super(...arguments);
            this.category = 'Unexpected';
            this.documentTypeDef = undefined;
            this.renderHeadline = ({ errorCount }) => `\
Encountered unexpected errors while processing of ${errorCount} documents. \
This is possibly a bug in Contentlayer. Please open an issue.`;
            this.renderLine = () => `"${this.documentFilePath}": ${errorToString(this.error)}`;
        }
    }
    FetchDataError.UnexpectedError = UnexpectedError;
})(FetchDataError || (FetchDataError = {}));
export class DuplicateBodyFieldError extends Tagged('DuplicateBodyFieldError') {
    constructor() {
        super(...arguments);
        this.toString = () => `You cannot override the "${this.bodyFieldName}" field in a document definition.`;
    }
}
//# sourceMappingURL=index.js.map