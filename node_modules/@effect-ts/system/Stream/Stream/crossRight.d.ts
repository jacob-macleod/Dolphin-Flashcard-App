import type { Stream } from "./definitions.js";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */
export declare function crossRight_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>): Stream<R & R1, E | E1, O2>;
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossRight_
 */
export declare function crossRight<R1, E1, O2>(that: Stream<R1, E1, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=crossRight.d.ts.map