// ets_tracing: off
import * as O from "@effect-ts/system/Option";
/**
 * Filter using predicate/refinement
 *
 * @ets_data_first filter_
 */

export function filter(predicate) {
  return fa => filter_(fa, predicate);
}
/**
 * Filter using predicate/refinement
 */

export function filter_(fa, predicate) {
  return O.isNone(fa) ? O.none : predicate(fa.value) ? fa : O.none;
}
//# sourceMappingURL=filter.mjs.map