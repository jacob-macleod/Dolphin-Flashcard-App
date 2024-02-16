import type { Stream } from "./definitions.js";
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */
export declare function mapConcat_<R, E, O, O2>(self: Stream<R, E, O>, f: (_: O) => Iterable<O2>): Stream<R, E, O2>;
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */
export declare function mapConcat<O, O2>(f: (_: O) => Iterable<O2>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O2>;
//# sourceMappingURL=mapConcat.d.ts.map