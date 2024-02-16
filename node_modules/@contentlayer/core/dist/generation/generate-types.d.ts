import type { DocumentTypeDef, NestedTypeDef, SchemaDef } from '../schema/index.js';
import type { GenerationOptions } from './generate-dotpkg.js';
export declare const renderTypes: ({ schemaDef, generationOptions, }: {
    schemaDef: SchemaDef;
    generationOptions: GenerationOptions;
}) => string;
export declare const renderDocumentTypeDefOrNestedTypeDef: ({ def, generationOptions: { options, sourcePluginType }, }: {
    def: DocumentTypeDef | NestedTypeDef;
    generationOptions: GenerationOptions;
}) => string;
//# sourceMappingURL=generate-types.d.ts.map