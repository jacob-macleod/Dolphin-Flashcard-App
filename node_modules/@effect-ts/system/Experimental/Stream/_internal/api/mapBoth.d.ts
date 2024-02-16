import type * as C from "../core.js";
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function mapBoth_<R, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (e: E) => E1, g: (a: A) => A1): C.Stream<R, E1, A1>;
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first mapBoth_
 */
export declare function mapBoth<E, E1, A, A1>(f: (e: E) => E1, g: (a: A) => A1): <R>(self: C.Stream<R, E, A>) => C.Stream<R, E1, A1>;
//# sourceMappingURL=mapBoth.d.ts.map