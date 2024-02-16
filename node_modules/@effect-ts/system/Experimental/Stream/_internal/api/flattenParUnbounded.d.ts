import type * as C from "../core.js";
/**
 * Like `flattenPar`, but executes all streams concurrently.
 */
export declare function flattenParUnbounded_<R, R1, E, E1, A>(self: C.Stream<R, E, C.Stream<R1, E1, A>>, outputBuffer?: number): C.Stream<R & R1, E | E1, A>;
/**
 * Like `flattenPar`, but executes all streams concurrently.
 *
 * @ets_data_first flattenParUnbounded_
 */
export declare function flattenParUnbounded(outputBuffer?: number): <R, R1, E, E1, A>(self: C.Stream<R, E, C.Stream<R1, E1, A>>) => C.Stream<R & R1, E | E1, A>;
//# sourceMappingURL=flattenParUnbounded.d.ts.map