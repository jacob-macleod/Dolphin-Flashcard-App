// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Cross from "./cross.mjs";
import * as Map from "./map.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 */

export function crossRight_(self, that) {
  return Map.map_(Cross.cross_(self, that), Tp.get(1));
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from the other stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * @ets_data_first crossRight_
 */

export function crossRight(that) {
  return self => crossRight_(self, that);
}
//# sourceMappingURL=crossRight.mjs.map