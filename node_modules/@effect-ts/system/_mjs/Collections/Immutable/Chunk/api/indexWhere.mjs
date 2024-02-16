import { indexWhereFrom_ } from "./indexWhereFrom.mjs";
/**
 * Returns the first index for which the given predicate is satisfied.
 */

export function indexWhere_(self, f) {
  return indexWhereFrom_(self, 0, f);
}
/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @ets_data_first indexWhere_
 */

export function indexWhere(f) {
  return self => indexWhere_(self, f);
}
//# sourceMappingURL=indexWhere.mjs.map