import * as C from "../core.js";
/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 */
export declare function dropRight_<R, E, A>(self: C.Stream<R, E, A>, n: number): C.Stream<R, E, A>;
/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 *
 * @ets_data_first dropRight_
 */
export declare function dropRight(n: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=dropRight.d.ts.map