import type { Stream } from "./definitions.js";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */
export declare function scanReduce_<R, E, O, O1 extends O>(self: Stream<R, E, O>, f: (o1: O1, o: O) => O1): Stream<R, E, O1>;
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */
export declare function scanReduce<O, O1 extends O>(f: (o1: O1, o: O) => O1): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O1>;
//# sourceMappingURL=scanReduce.d.ts.map