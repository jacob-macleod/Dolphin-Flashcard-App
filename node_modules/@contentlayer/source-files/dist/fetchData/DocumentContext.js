import * as path from 'node:path';
import * as utils from '@contentlayer/utils';
import { T, tag } from '@contentlayer/utils/effect';
import { getFlattenedPath } from './mapping/index.js';
export const DocumentContext = tag(Symbol.for('@contentlayer/source-files/DocumentContext'));
export const provideDocumentContext = (_) => T.provideService(DocumentContext)(_);
export const makeAndProvideDocumentContext = ({ rawContent, relativeFilePath, documentTypeDef, }) => {
    const contentType = utils.pattern
        .match(rawContent.kind)
        .with('markdown', () => 'markdown')
        .with('mdx', () => 'mdx')
        .otherwise(() => 'data');
    const rawDocumentData = {
        sourceFilePath: relativeFilePath,
        sourceFileName: path.basename(relativeFilePath),
        sourceFileDir: path.dirname(relativeFilePath),
        contentType,
        flattenedPath: getFlattenedPath(relativeFilePath),
    };
    return provideDocumentContext({ rawContent, rawDocumentData, relativeFilePath, documentTypeDef });
};
export const getFromDocumentContext = (key) => T.accessService(DocumentContext)((_) => _[key]);
export const getDocumentContext = T.accessService(DocumentContext)((_) => _);
//# sourceMappingURL=DocumentContext.js.map