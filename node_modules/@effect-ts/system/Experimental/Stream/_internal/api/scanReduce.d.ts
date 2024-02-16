import type * as C from "../core.js";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */
export declare function scanReduce_<R, E, A, A1 extends A>(self: C.Stream<R, E, A>, f: (a1: A1, a: A) => A1): C.Stream<R, E, A1>;
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 *
 * @ets_data_first scanReduce_
 */
export declare function scanReduce<A, A1 extends A>(f: (a1: A1, a: A) => A1): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=scanReduce.d.ts.map