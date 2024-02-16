import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipLeft_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>): Stream<R & R1, E | E1, O>;
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipLeft<R1, E1, O2>(that: Stream<R1, E1, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O>;
//# sourceMappingURL=zipLeft.d.ts.map