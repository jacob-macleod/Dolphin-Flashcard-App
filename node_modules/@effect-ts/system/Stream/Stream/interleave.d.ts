import type { Stream } from "./definitions.js";
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */
export declare function interleave_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, that: Stream<R1, E1, O1>): Stream<R & R1, E1 | E, O1 | O>;
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */
export declare function interleave<R1, E1, O1>(that: Stream<R1, E1, O1>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1 | O>;
//# sourceMappingURL=interleave.d.ts.map