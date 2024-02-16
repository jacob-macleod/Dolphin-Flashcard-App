import { not } from "../../Function/index.mjs";
import { filter_ } from "./filter.mjs";
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */

export function filterNot_(self, pred) {
  return filter_(self, not(pred));
}
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */

export function filterNot(pred) {
  return self => filterNot_(self, pred);
}
//# sourceMappingURL=filterNot.mjs.map