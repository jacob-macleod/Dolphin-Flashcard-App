import type { NonEmptyArray } from "../Collections/Immutable/NonEmptyArray/index.js";
import type { _E, _R, ForcedTuple } from "../Utils/index.js";
import type { Async } from "./core.js";
export declare type TupleA<T extends NonEmptyArray<Async<any, any, any>>> = {
    [K in keyof T]: [T[K]] extends [Async<any, any, infer A>] ? A : never;
};
/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */
export declare function tuple<T extends NonEmptyArray<Async<any, any, any>>>(...t: T): Async<_R<T[number]>, _E<T[number]>, ForcedTuple<TupleA<T>>>;
/**
 * Like sequenceT but parallel, same as `forEachPar` + `identity` with a tuple type
 *
 * @ets_trace call
 */
export declare function tuplePar<T extends NonEmptyArray<Async<any, any, any>>>(...t: T): Async<_R<T[number]>, _E<T[number]>, ForcedTuple<TupleA<T>>>;
//# sourceMappingURL=tuple.d.ts.map