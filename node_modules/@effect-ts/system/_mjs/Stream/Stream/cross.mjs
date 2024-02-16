// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { crossWith_ } from "./crossWith.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */

export function cross_(self, that) {
  return crossWith_(self, that, Tp.tuple);
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first cross_
 */

export function cross(that) {
  return self => cross_(self, that);
}
//# sourceMappingURL=cross.mjs.map