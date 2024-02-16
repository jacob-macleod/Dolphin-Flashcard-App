import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipRight_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>): C.Stream<R1 & R, E | E1, A1>;
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<R, R1, E, E1, A, A1>(that: C.Stream<R1, E1, A1>): (self: C.Stream<R, E, A>) => C.Stream<R1 & R, E | E1, A1>;
//# sourceMappingURL=zipRight.d.ts.map