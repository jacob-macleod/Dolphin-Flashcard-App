import type { _E, _R, EnforceNonEmptyRecord } from "../Utils/index.js";
import type { Effect } from "./effect.js";
/**
 * Bind a record of effects in a do
 *
 * @ets_data_first bindAll_
 */
export declare function bindAll<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): <R, E>(s: Effect<R, E, K>) => Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects in a do
 */
export declare function bindAll_<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Effect<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel, in a do
 *
 * @ets_data_first bindAllPar_
 */
export declare function bindAllPar<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): <R, E>(s: Effect<R, E, K>) => Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel, in a do
 */
export declare function bindAllPar_<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Effect<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel (up to N fibers), in a do
 *
 * @ets_data_first bindAllParN_
 */
export declare function bindAllParN<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(n: number, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): <R, E>(s: Effect<R, E, K>) => Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
/**
 * Bind a record of effects, in parallel (up to N fibers), in a do
 */
export declare function bindAllParN_<K, NER extends Record<string, Effect<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Effect<R, E, K>, n: number, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>, __trace?: string): Effect<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>] ? A : never;
}>;
//# sourceMappingURL=bindAll.d.ts.map