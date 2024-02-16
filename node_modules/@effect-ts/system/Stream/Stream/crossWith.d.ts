import type { Stream } from "./definitions.js";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */
export declare function crossWith_<R, R1, E, E1, O, O2, C>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>, f: (o: O, o2: O2) => C): Stream<R & R1, E | E1, C>;
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossWith_
 */
export declare function crossWith<O, C, R1, E1, O2>(that: Stream<R1, E1, O2>, f: (o: O, o2: O2) => C): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, C>;
//# sourceMappingURL=crossWith.d.ts.map