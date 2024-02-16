import * as Chain from "./chain.mjs";
import * as Map from "./map.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 */

export function crossWith_(self, that, f) {
  return Chain.chain_(self, l => Map.map_(that, r => f(l, r)));
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * @ets_data_first crossWith_
 */

export function crossWith(that, f) {
  return self => crossWith_(self, that, f);
}
//# sourceMappingURL=crossWith.mjs.map