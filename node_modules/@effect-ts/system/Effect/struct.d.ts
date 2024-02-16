import type { _E, _R, EnforceNonEmptyRecord } from "../Utils/index.js";
import type { Effect } from "./effect.js";
/**
 * Applicative structure
 */
export declare function struct<NER extends Record<string, Effect<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): Effect<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Applicative structure processed in parallel
 */
export declare function structPar<NER extends Record<string, Effect<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): Effect<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Applicative structure processed in parallel with up to N fibers
 *
 * @ets_data_first structParN_
 */
export declare function structParN(n: number, __trace?: string): <NER extends Record<string, Effect<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>) => Effect<_R<NER[keyof NER]>, _E<NER[keyof NER]>, { [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never; }>;
/**
 * Applicative structure processed in parallel with up to N fibers
 */
export declare function structParN_<NER extends Record<string, Effect<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, n: number, __trace?: string): Effect<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
//# sourceMappingURL=struct.d.ts.map