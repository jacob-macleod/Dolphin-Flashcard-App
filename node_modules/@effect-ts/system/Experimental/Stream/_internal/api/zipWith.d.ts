import type * as C from "../core.js";
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipWith_<R, E, A, R1, E1, A1, B>(self: C.Stream<R, E, A>, that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => B): C.Stream<R1 & R, E | E1, B>;
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, R1, E1, A1, B>(that: C.Stream<R1, E1, A1>, f: (a: A, a1: A1) => B): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E | E1, B>;
//# sourceMappingURL=zipWith.d.ts.map