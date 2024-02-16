import type { NonEmptyArray } from "../Collections/Immutable/NonEmptyArray/index.js";
import type { _E, _R, ForcedTuple } from "../Utils/index.js";
import type { Managed } from "./managed.js";
export declare type TupleA<T extends NonEmptyArray<Managed<any, any, any>>> = {
    [K in keyof T]: [T[K]] extends [Managed<any, any, infer A>] ? A : never;
};
/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */
export declare function tuple<T extends NonEmptyArray<Managed<any, any, any>>>(...t: T & {
    0: Managed<any, any, any>;
}): Managed<_R<T[number]>, _E<T[number]>, ForcedTuple<TupleA<T>>>;
/**
 * Like tuple but parallel, same as `forEachPar` + `identity` with a tuple type
 */
export declare function tuplePar<T extends NonEmptyArray<Managed<any, any, any>>>(...t: T & {
    0: Managed<any, any, any>;
}): Managed<_R<T[number]>, _E<T[number]>, ForcedTuple<TupleA<T>>>;
/**
 * Like tuplePar but uses at most n fibers concurrently,
 * same as `forEachParN` + `identity` with a tuple type
 */
export declare function tupleParN(n: number): {
    /**
     * @ets_trace call
     */
    <T extends NonEmptyArray<Managed<any, any, any>>>(...t: T & {
        0: Managed<any, any, any>;
    }): Managed<_R<T[number]>, _E<T[number]>, ForcedTuple<TupleA<T>>>;
};
//# sourceMappingURL=tuple.d.ts.map