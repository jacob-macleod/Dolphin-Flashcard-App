import * as C from "../core.js";
/**
 * Takes the last specified number of elements from this stream.
 */
export declare function takeRight_<R, E, A>(self: C.Stream<R, E, A>, n: number): C.Stream<R, E, A>;
/**
 * Takes the last specified number of elements from this stream.
 *
 * @ets_data_first takeRight_
 */
export declare function takeRight(n: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=takeRight.d.ts.map