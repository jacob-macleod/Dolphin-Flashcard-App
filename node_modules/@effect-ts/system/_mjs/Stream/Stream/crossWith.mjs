// ets_tracing: off
import { chain_ } from "./chain.mjs";
import { map_ } from "./map.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */

export function crossWith_(self, that, f) {
  return chain_(self, l => map_(that, r => f(l, r)));
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossWith_
 */

export function crossWith(that, f) {
  return self => crossWith_(self, that, f);
}
//# sourceMappingURL=crossWith.mjs.map