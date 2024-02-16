import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipRight_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>): Stream<R & R1, E | E1, O2>;
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zipRight<R1, E1, O2>(that: Stream<R1, E1, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=zipRight.d.ts.map