import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */
export declare function zipWith_<R, R1, E, E1, O, O2, O3>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, f: (a: O, a1: O2) => O3): Stream<R & R1, E1 | E, O3>;
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */
export declare function zipWith<R1, E1, O, O2, O3>(that: Stream<R1, E1, O2>, f: (a: O, a1: O2) => O3): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O3>;
//# sourceMappingURL=zipWith.d.ts.map