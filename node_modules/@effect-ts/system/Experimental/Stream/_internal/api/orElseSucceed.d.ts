import type * as C from "../core.js";
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
export declare function orElseSucceed_<R, E, A, A1>(self: C.Stream<R, E, A>, a1: A1): C.Stream<R, E, A | A1>;
/**
 * Succeeds with the specified value if this one fails with a typed error.
 *
 * @ets_data_first orElseSucceed_
 */
export declare function orElseSucceed<A1>(a1: A1): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1 | A>;
//# sourceMappingURL=orElseSucceed.d.ts.map