import type { _E, _R, EnforceNonEmptyRecord } from "../Utils/index.js";
import type { Async } from "./core.js";
/**
 * Bind a record of effects in a do
 *
 * @ets_data_first bindAll_
 */
export declare function bindAll<K, NER extends Record<string, Async<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>): <R, E>(s: Async<R, E, K>) => Async<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects in a do
 */
export declare function bindAll_<K, NER extends Record<string, Async<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Async<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>): Async<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel, in a do
 *
 * @ets_data_first bindAllPar_
 */
export declare function bindAllPar<K, NER extends Record<string, Async<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>): <R, E>(s: Async<R, E, K>) => Async<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel, in a do
 */
export declare function bindAllPar_<K, NER extends Record<string, Async<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Async<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Async<any, any, any>>): Async<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Async<any, any, infer A>] ? A : never;
}>;
//# sourceMappingURL=bindAll.d.ts.map