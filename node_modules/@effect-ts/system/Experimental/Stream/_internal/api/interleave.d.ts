import type * as C from "../core.js";
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */
export declare function interleave_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R & R1, E | E1, A | A1>;
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 *
 * @ets_data_first interleave_
 */
export declare function interleave<R1, E1, A1>(that: C.Stream<R1, E1, A1>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1 | A>;
//# sourceMappingURL=interleave.d.ts.map