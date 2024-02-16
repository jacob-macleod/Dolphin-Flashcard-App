import * as C from "../core.js";
/**
 * Drops the specified number of elements from this stream.
 */
export declare function drop_<R, E, A>(self: C.Stream<R, E, A>, n: number): C.Stream<R, E, A>;
/**
 * Drops the specified number of elements from this stream.
 *
 * @ets_data_first drop_
 */
export declare function drop(n: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=drop.d.ts.map