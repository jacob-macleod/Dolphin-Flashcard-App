import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Stream } from "./definitions.js";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */
export declare function cross_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>): Stream<R & R1, E | E1, Tp.Tuple<[O, O2]>>;
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first cross_
 */
export declare function cross<R1, E1, O2>(that: Stream<R1, E1, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, Tp.Tuple<[O, O2]>>;
//# sourceMappingURL=cross.d.ts.map