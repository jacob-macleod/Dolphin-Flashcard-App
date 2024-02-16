import * as C from "../core.js";
/**
 * Takes the specified number of elements from this stream.
 */
export declare function take_<R, E, A>(self: C.Stream<R, E, A>, n: number): C.Stream<R, E, A>;
/**
 * Takes the specified number of elements from this stream.
 *
 * @ets_data_first take_
 */
export declare function take(n: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=take.d.ts.map