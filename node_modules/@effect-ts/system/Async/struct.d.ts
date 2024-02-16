import type { _E, _R, EnforceNonEmptyRecord } from "../Utils/index.js";
import type { Async } from "./core.js";
/**
 * Applicative structure
 */
export declare function struct<NER extends Record<string, Async<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>): Async<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
/**
 * Applicative structure processed in parallel
 */
export declare function structPar<NER extends Record<string, Async<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>, __trace?: string): Async<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
//# sourceMappingURL=struct.d.ts.map