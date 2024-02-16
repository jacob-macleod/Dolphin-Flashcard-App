import * as Map from "./map.mjs";
/**
 * Maps the success values of this stream to the specified constant value.
 */

export function as_(self, a2) {
  return Map.map_(self, _ => a2);
}
/**
 * Maps the success values of this stream to the specified constant value.
 *
 * @ets_data_first as_
 */

export function as(a2) {
  return self => as_(self, a2);
}
//# sourceMappingURL=as.mjs.map