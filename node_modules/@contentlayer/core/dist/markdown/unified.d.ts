import type * as unified from 'unified';
import type { RawDocumentData } from '../data-types.js';
/**
 * Unified plugin that adds the raw document data to the vfile under `vfile.data.rawDocumentData`
 *
 * Contentlayer uses this plugin by default.
 */
export declare const addRawDocumentToVFile: (rawDocumentData: RawDocumentData) => () => unified.Transformer;
//# sourceMappingURL=unified.d.ts.map