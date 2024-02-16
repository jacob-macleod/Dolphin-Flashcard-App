// ets_tracing: off
import { crossWith_ } from "./crossWith.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */

export function crossRight_(self, that) {
  return crossWith_(self, that, (_, o2) => o2);
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossRight_
 */

export function crossRight(that) {
  return self => crossRight_(self, that);
}
//# sourceMappingURL=crossRight.mjs.map