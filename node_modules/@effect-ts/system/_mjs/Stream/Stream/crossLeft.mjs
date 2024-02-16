// ets_tracing: off
import { crossWith_ } from "./crossWith.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from this stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */

export function crossLeft_(self, that) {
  return crossWith_(self, that, o => o);
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from this stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossLeft_
 */

export function crossLeft(that) {
  return self => crossLeft_(self, that);
}
//# sourceMappingURL=crossLeft.mjs.map