import type * as C from "../core.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */
export declare function catchAll_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (e: E) => C.Stream<R1, E1, A1>): C.Stream<R & R1, E1, A | A1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 *
 * @ets_data_first catchAll_
 */
export declare function catchAll<R1, E, E1, A1>(f: (e: E) => C.Stream<R1, E1, A1>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1, A1 | A>;
//# sourceMappingURL=catchAll.d.ts.map